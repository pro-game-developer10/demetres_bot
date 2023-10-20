import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { dotenv } from './utils/dotenv';

const client = new SapphireClient({ intents: [GatewayIntentBits.MessageContent ,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates], loadMessageCommandListeners: true, defaultPrefix: "!" });

client.login(dotenv("TOKEN"));