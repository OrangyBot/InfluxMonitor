# Orangy's InfluxMonitor package.

This is Orangy's official package to forward the bot's stats to an InfluxDB instance.

:white_check_mark: Easy to use
:white_check_mark: Fast
:white_check_mark: Open source

# Available monitoring modes

:white_check_mark: AutoMonitor (sends stats every minute)

## How to use

```javascript
//ES6:
import Discord from "discord.js";
import OrangyMonitor from "@orangybot/influxmonitor";

//Create the Discord client
const Client = new Discord.Client({ intents: ["GUILDS"] });

//Start the monitor
new OrangyMonitor(
    "your InfluxDB URL",
    "your InfluxDB token",
    "your InfluxDB bucket",
    "your InfluxDB org",
    "This service's name (could be anything, like your bot's name)",
    Client //Discord client object
);

//Log into Discord with a bot token
Client.login(your-discord-bot-token);

//CommonJS:
const Discord = require("discord.js");
const OrangyMonitor = require("../OrangyMonitor/Index.js");

//Create the Discord client
const Client = new Discord.Client({ intents: ["GUILDS"] });

//Start the monitor
new OrangyMonitor(
    "your InfluxDB URL",
    "your InfluxDB token",
    "your InfluxDB bucket",
    "your InfluxDB org",
    "This service's name (could be anything, like your bot's name)",
    Client //Discord client object
);

//Log into Discord with a bot token
Client.login(your-discord-bot-token);
```
