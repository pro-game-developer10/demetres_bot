import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({ intents: [GatewayIntentBits.MessageContent ,GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates], loadMessageCommandListeners: true });

client.login('MTE0NzYyNTMzODU3NTI3NDAwNA.GpjCID._8y2DzG60Quc1PZqPT3WoI-rsY2S70C2OtAhc0');