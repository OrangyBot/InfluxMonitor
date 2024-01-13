import { Point, InfluxDBClient } from "@influxdata/influxdb3-client";
import { currentLoad, networkStats } from "systeminformation";
import { Client } from "discord.js";
import DiscordHelper from "./DiscordHelper";

export default async function AutoMonitor(
  InfluxClient: InfluxDBClient,
  Bucket: string,
  Org: string,
  Service: string,
  Interval: number,
  Client: Client
): Promise<void> {
  setInterval(async () => {
    await DiscordHelper(Service, Client);

    await currentLoad().then(async (Data: any) => {
      const CPUUsagePoint = Point.measurement("CPUUsage").setFloatField(
        "Value",
        Math.round(Data.currentLoad)
      );
      await InfluxClient.write(CPUUsagePoint, Service);
    });

    await networkStats().then(async (Data: any) => {
      const NetworkInUsagePoint = Point.measurement("NetworkInUsage").setFloatField(
        "Value",
        Math.round(Data[0].rx_bytes ? Data[0].rx_bytes / 1024 / 1024 / 1024 : 0)
      );
      const NetworkOutUsagePoint = Point.measurement("NetworkOutUsage").setFloatField(
        "Value",
        Math.round(Data[0].tx_bytes ? Data[0].tx_bytes / 1024 / 1024 / 1024 : 0)
      );
      const NetworkInSecUsagePoint = Point.measurement("NetworkInSecUsage").setFloatField(
        "Value",
        Math.round(Data[0].rx_sec ? Data[0].rx_sec / 1024 : 0)
      );
      const NetworkOutSecUsagePoint = Point.measurement(
        "NetworkOutSecUsage"
      ).setFloatField(
        "Value",
        Math.round(Data[0].tx_sec ? Data[0].tx_sec / 1024 : 0)
      );
      await InfluxClient.write(NetworkInUsagePoint, Service);
      await InfluxClient.write(NetworkOutUsagePoint, Service);
      await InfluxClient.write(NetworkInSecUsagePoint, Service);
      await InfluxClient.write(NetworkOutSecUsagePoint, Service);
    });

    const TotalRamPoint = Point.measurement("TotalRam").setFloatField(
      "Value",
      process.memoryUsage().heapTotal
    );
    const UsedRamPoint = Point.measurement("UsedRam").setFloatField(
      "Value",
      process.memoryUsage().heapUsed
    );
    const UptimePoint = Point.measurement("Uptime").setFloatField(
      "Value",
      process.uptime()
    );

    await InfluxClient.write(TotalRamPoint, Service);
    await InfluxClient.write(UsedRamPoint, Service);
    await InfluxClient.write(UptimePoint, Service);
  }, Interval);
}
