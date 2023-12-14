import BotConfig from "../schemas/config/bot-config";
import MentionablesConfig from "../schemas/config/mentionables";
import OverridesConfig from "../schemas/config/overrides";
import PluginsConfig from "../schemas/config/plugins";

export namespace JSONConfigDefaults {
    export const BOT: Required<BotConfig> = {
        root: ".",
        prefix: "!",
        dotenvOverride: {
            fileType: "env",
            path: ".env",
        },
    };
    export const MENTIONABLES: Required<MentionablesConfig> = {
        items: [],
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
                type: "mentionables",
                fileType: "json",
                path: "./config/mentionables.json",
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
}
