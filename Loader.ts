import { Client } from "discord.js";
import Loader from "./Src/Loader";

export class OrangyMonitor {
  public constructor(
    Url: string,
    Token: string,
    Bucket: string,
    Org: string,
    Service: string,
    Client: Client
  ) {
    if (!Url || !Token || !Bucket || !Org || !Service || !Client) {
      console.log("[IM] One or more arguments are missing!");
      process.exit(1);
    }
    Loader.Start(Url, Token, Bucket, Org, Service, Client);
  }
}
