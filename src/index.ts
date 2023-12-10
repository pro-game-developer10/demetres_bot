import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { dotenv, dotenvInit } from "./utils/dotenv";
import { ConfigUtils } from "./utils/json/configUtils";

process.env = dotenvInit();

const { prefix } = ConfigUtils.getPrefixInfo()

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
    loadMessageCommandListeners: true,
    defaultPrefix: prefix,
});
client.login(dotenv("TOKEN") satisfies string);
