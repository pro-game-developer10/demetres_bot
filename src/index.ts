import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { configDotenv } from 'dotenv';

const env = configDotenv()
const processEnv = env.parsed
if (env.error) throw env.error

const client = new SapphireClient({ intents: [GatewayIntentBits.MessageContent ,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates], loadMessageCommandListeners: true, defaultPrefix: "!" });

console.log(processEnv!.TOKEN)

client.login(processEnv!.TOKEN);