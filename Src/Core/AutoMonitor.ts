import { Point, InfluxDB } from "@influxdata/influxdb-client";
import { currentLoad, networkStats } from "systeminformation";
import { Client } from "discord.js";
import DiscordHelper from "./DiscordHelper";

export default async function AutoMonitor(
	InfluxClient: InfluxDB,
	Org: string,
	Bucket: string,
	Service: string,
	Client: Client
): Promise<void> {
	setInterval(async () => {
		const WriteApi = InfluxClient.getWriteApi(Org, Bucket);
		WriteApi.useDefaultTags({ Service: Service });
		if (Client) await DiscordHelper(WriteApi, Client);

		await currentLoad().then(async (Data: any) => {
			const CPUUsagePoint = new Point("CPUUsage").floatField(
				"Value",
				Math.round(Data.currentLoad)
			);
			WriteApi.writePoint(CPUUsagePoint);
		});

		await networkStats().then(async (Data: any) => {
			const NetworkInUsagePoint = new Point("NetworkInUsage").floatField(
				"Value",
				Math.round(Data[0].rx_bytes ? Data[0].rx_bytes / 1024 / 1024 / 1024 : 0)
			);
			const NetworkOutUsagePoint = new Point("NetworkOutUsage").floatField(
				"Value",
				Math.round(Data[0].tx_bytes ? Data[0].tx_bytes / 1024 / 1024 / 1024 : 0)
			);
			const NetworkInSecUsagePoint = new Point("NetworkInSecUsage").floatField(
				"Value",
				Math.round(Data[0].rx_sec ? Data[0].rx_sec / 1024 : 0)
			);
			const NetworkOutSecUsagePoint = new Point(
				"NetworkOutSecUsage"
			).floatField(
				"Value",
				Math.round(Data[0].tx_sec ? Data[0].tx_sec / 1024 : 0)
			);
			WriteApi.writePoint(NetworkInUsagePoint);
			WriteApi.writePoint(NetworkOutUsagePoint);
			WriteApi.writePoint(NetworkInSecUsagePoint);
			WriteApi.writePoint(NetworkOutSecUsagePoint);
		});

		const TotalRamPoint = new Point("TotalRam").floatField(
			"Value",
			process.memoryUsage().heapTotal
		);
		const UsedRamPoint = new Point("UsedRam").floatField(
			"Value",
			process.memoryUsage().heapUsed
		);
		const UptimePoint = new Point("Uptime").floatField(
			"Value",
			process.uptime()
		);

		WriteApi.writePoint(TotalRamPoint);
		WriteApi.writePoint(UsedRamPoint);
		WriteApi.writePoint(UptimePoint);

		WriteApi.close();
	}, 60000);
}
