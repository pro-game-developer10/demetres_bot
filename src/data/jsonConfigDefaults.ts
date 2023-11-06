import BotConfig from "../types/config/bot-config";
import ChannelConfig from "../types/config/channels";
import OverridesConfig from "../types/config/overrides";
import PluginsConfig from "../types/config/plugins";
import RolesConfig from "../types/config/roles";

export namespace JSONConfigDefaults {
    export const BOT: Required<BotConfig> = {
        root: ".",
        dotenvOverride: {
            path: ".env",
        },
    };
    export const CHANNELS: Required<ChannelConfig> = {
        channels: [],
    };
    export const OVERRIDES: Required<OverridesConfig> = {
        root: "./",
        configPaths: [
            {
                type: "bot-config",
                fileType: "json",
                path: "./config/bot-config.json",
            },
            {
                type: "channels",
                fileType: "json",
                path: "./config/channels.json",
            },
            {
                type: "roles",
                fileType: "json",
                path: "./config/roles.json",
            },
            {
                type: "plugins",
                fileType: "json",
                path: "./config/plugins.json",
            },
        ],
    };
    export const PLUGINS: Required<PluginsConfig> = {
        root: "./plugins",
        experimentalSupport: false,
        plugins: [],
    };
    export const ROLES: Required<RolesConfig> = {
        roles: [],
    };
};
