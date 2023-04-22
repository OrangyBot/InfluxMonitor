declare module "@orangybot/influxmonitor" {
  export class OrangyMonitor {
    constructor(
      Type: string,
      Url: string,
      Token: string,
      Bucket: string,
      Org: string,
      Service: string,
      Client: Client
    ): void;
  }
}
