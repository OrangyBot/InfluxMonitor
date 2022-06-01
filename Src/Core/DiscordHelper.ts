import { Point, WriteApi } from "@influxdata/influxdb-client";
import { Client } from "discord.js";

export default async function DiscordHelper(
	WriteApi: WriteApi,
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

	const TotalUsers = new Point("Users").floatField(
		"Value",
		Client.users.cache.size
	);
	const TotalGuilds = new Point("Guilds").floatField(
		"Value",
		Client.guilds.cache.size
	);
	const TotalPing = new Point("Ping").floatField("Value", Client.ws.ping);
	const TotalShards = new Point("Shards").floatField("Value", Shards);

	WriteApi.writePoint(TotalUsers);
	WriteApi.writePoint(TotalGuilds);
	WriteApi.writePoint(TotalPing);
	WriteApi.writePoint(TotalShards);
}
