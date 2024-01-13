import { Client } from "discord.js";
import Loader from "./Src/Loader";

export class OrangyMonitor {
  public constructor(
    Url: string,
    Token: string,
    Bucket: string,
    Org: string,
    Service: string,
    Interval: number,
    Client: Client
  ) {
    if (!Url || !Token || !Bucket || !Org || !Service || (!Interval || isNaN(Interval)) || !Client) {
      console.log("[IM] One or more arguments are missing!");
      process.exit(1);
    } else if(Interval < 1000) Interval = 1000;
    Loader.Start(Url, Token, Bucket, Org, Service, Interval, Client);
  }
}
