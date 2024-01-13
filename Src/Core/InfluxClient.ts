import { InfluxDBClient } from "@influxdata/influxdb3-client";

export let InfluxClient: InfluxDBClient;

export default async function Data(Url: string, Token: string): Promise<void> {
  InfluxClient = new InfluxDBClient({ host: Url, token: Token });
}
