import { InfluxDB } from "@influxdata/influxdb-client";

export let InfluxClient: InfluxDB;

export default async function Data(Url: string, Token: string): Promise<void> {
	InfluxClient = new InfluxDB({ url: Url, token: Token });
}
