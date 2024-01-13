import { Point } from "@influxdata/influxdb3-client";
import { InfluxClient } from "./InfluxClient";
import { Client } from "discord.js";

export default async function DiscordHelper(
  Service: string,
  Client: Client
): Promise<void> {
  let Shards: number = 1;

  switch (Client.shard) {
    case null:
      break;
    default:
      Shards = Client.shard.count;
      break;
  }

  const TotalUsers = Point.measurement("Users").setFloatField(
    "Value",
    Client.users.cache.size
  );
  const TotalGuilds = Point.measurement("Guilds").setFloatField(
    "Value",
    Client.guilds.cache.size
  );
  const TotalPing = Point.measurement("Ping").setFloatField("Value", Client.ws.ping);
  const TotalShards = Point.measurement("Shards").setFloatField("Value", Shards);

  await InfluxClient.write(TotalUsers, Service);
  await InfluxClient.write(TotalGuilds, Service);
  await InfluxClient.write(TotalPing, Service);
  await InfluxClient.write(TotalShards, Service);
}
