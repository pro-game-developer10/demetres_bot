import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { dotenv, dotenvInit } from './utils/dotenv';

process.env = dotenvInit()

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    loadMessageCommandListeners: true,
    defaultPrefix: "!"
});
client.login(dotenv("TOKEN") satisfies string);

// ====================================================
// TODO: 1) Add support for configuration files
// COMPLETED: 1.1) Add utilities for .json files
// COMPLETED: 1.2) Add wrapper functions
// TODO: 1.3) Add schema safety (zod)
// REVISE: 1.4) yml file support
// REVISE: 1.5) .env file support
// TODO: 2) Add support for plugins
// TODO: 2.1) File Structure of a plugin
// TODO: 2.2) Add support for repo fetching
// TODO: 3) Convert existing features to plugins
// TODO: 4) Implement Tests
// TODO: 4.1) Write the tests
// TODO: 4.2) Add CI/CD support
// TODO: 5) Implement CLI Tools
// TODO: 5.1) Commands
// TODO: 5.2) Package management (Github Repos)
// TODO: 5.3) Generational Commands
// TODO: 5.4) Config Generation
// TODO: 6) Organise Github Repo
// TODO: 6.1) README.md file
// TODO: 6.2) Other markdown files
// TODO: 6.3) Make documentations
// TODO: 6.4) Make proper Github profile
// TODO: 6.5) Add comments to code
// TODO: 7) Discord server
// TODO: 7.1) Channels And Roles
// TODO: 7.2) Make custom bot using existing tools
// TODO: 7.3) Partnerships
// TODO: 7.4) Find staff and Github contributors
// TODO: 8) Setup donation account
// TODO: 9) Start promoting (on infinite loop)
// ====================================================
