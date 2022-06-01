import Data, { InfluxClient } from "./Core/InfluxClient";
import { Client } from "discord.js";
import AutoMonitor from "./Core/AutoMonitor";

export default class OrangyMonitor {
	static async Start(
		Url: string,
		Token: string,
		Bucket: string,
		Org: string,
		Service: string,
		Client: Client
	) {
		await Data(Url, Token);
		AutoMonitor(InfluxClient, Bucket, Org, Service, Client);
	}
}
