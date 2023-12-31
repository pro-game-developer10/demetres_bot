import fs from "node:fs";
import path from "node:path";
import BotConfig, { botConfigSchema } from "../../schemas/config/bot-config";
import MentionablesConfig, {
    mentionablesConfigSchema,
} from "../../schemas/config/mentionables";
import OverridesConfig, {
    overridesConfigSchema,
} from "../../schemas/config/overrides";
import PluginsConfig, {
    pluginsConfigSchema,
} from "../../schemas/config/plugins";
import EmojisConfig, {
    emojiConfigSchema
} from "../../schemas/config/emojis"
import { JSONConfigDefaults } from "../../data/jsonConfigDefaults";
import { ConfigUtils } from "./configUtils";
// FIXME: Refactor Needed
export namespace JSONConfig {
    export const ROOT_PATH = path.join(__dirname, "../../../");
    export const OVERRIDES_CONFIG_FILE_PATH = path.join(
        ROOT_PATH,
        "./config/overrides.json"
    );

    export enum ConfigType {
        BOT_CONFIG = "bot-config",
        MENTIONABLES = "mentionables",
        OVERRIDES = "overrides",
        PLUGINS = "plugins",
        EMOJIS = "emojis"
    }

    export type ConfigJSON<C extends ConfigType> =
        C extends ConfigType.BOT_CONFIG
            ? BotConfig
            : C extends ConfigType.MENTIONABLES
            ? MentionablesConfig
            : C extends ConfigType.OVERRIDES
            ? OverridesConfig
            : C extends ConfigType.PLUGINS
            ? PluginsConfig
            : C extends ConfigType.EMOJIS
            ? EmojisConfig
            : never;

    export interface ConfigsAll extends ConfigsAllLimited {
        [configType: string]: Partial<ConfigJSON<ConfigType>>;
    }
    export interface ConfigsAllLimited {
        bot: ConfigJSON<ConfigType.BOT_CONFIG>;
        mentionables: ConfigJSON<ConfigType.MENTIONABLES>;
        overrides: ConfigJSON<ConfigType.OVERRIDES>;
        plugins: ConfigJSON<ConfigType.PLUGINS>;
        emojis: ConfigJSON<ConfigType.EMOJIS>;
    }
    export type ConfigPathsAll = {
        [P in keyof ConfigsAll]: string;
    };
    export function configPaths() {
        const fileBuffer = fs.readFileSync(OVERRIDES_CONFIG_FILE_PATH);
        const contents = JSON.parse(fileBuffer.toString()) as OverridesConfig;
        const fallbacks = {
            botPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(
                (path) => path.type === "bot-config"
            )[0].path,
            mentionablesPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(
                (path) => path.type === "mentionables"
            )[0].path,
            pluginsPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(
                (path) => path.type === "plugins"
            )[0].path,
            emojisPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(
                (path) => path.type === "emojis"
            )[0].path
        };
        const botPath =
            contents.configPaths?.filter(
                (path) => path.type === "bot-config"
            )[0].path ?? fallbacks.botPath;
        const mentionablesPath =
            contents.configPaths?.filter((path) => path.type === "mentionables")[0]
                .path ?? fallbacks.mentionablesPath;
        const pluginsPath =
            contents.configPaths?.filter((path) => path.type === "plugins")[0]
                .path ?? fallbacks.pluginsPath;
        const emojisPath =
            contents.configPaths?.filter((path) => path.type === "emojis")[0]
                .path ?? fallbacks.emojisPath
        const paths: ConfigPathsAll = {
            bot: path.join(ROOT_PATH, contents.root, botPath),
            mentionables: path.join(ROOT_PATH, contents.root, mentionablesPath),
            overrides: OVERRIDES_CONFIG_FILE_PATH,
            plugins: path.join(ROOT_PATH, contents.root, pluginsPath),
            emojis: path.join(ROOT_PATH, contents.root, emojisPath)
        };
        return paths;
    }
    export function parseConfigs() {
        const paths = configPaths();
        const fileConfigs = {
            bot: JSON.parse(
                fs.readFileSync(paths.bot).toString()
            ) as ConfigJSON<ConfigType.BOT_CONFIG>,
            mentionables: JSON.parse(
                fs.readFileSync(paths.mentionables).toString()
            ) as ConfigJSON<ConfigType.MENTIONABLES>,
            overrides: JSON.parse(
                fs.readFileSync(paths.overrides).toString()
            ) as ConfigJSON<ConfigType.OVERRIDES>,
            plugins: JSON.parse(
                fs.readFileSync(paths.plugins).toString()
            ) as ConfigJSON<ConfigType.PLUGINS>,
            emojis: JSON.parse(
                fs.readFileSync(paths.emojis).toString()
            ) as ConfigJSON<ConfigType.EMOJIS>
        };
        fileConfigs.bot = ConfigUtils.populateConfig(
            ConfigType.BOT_CONFIG,
            fileConfigs.bot
        ) as ConfigJSON<ConfigType.BOT_CONFIG>;
        fileConfigs.mentionables = ConfigUtils.populateConfig(
            ConfigType.MENTIONABLES,
            fileConfigs.mentionables
        ) as ConfigJSON<ConfigType.MENTIONABLES>;
        fileConfigs.overrides = ConfigUtils.populateConfig(
            ConfigType.OVERRIDES,
            fileConfigs.overrides
        ) as ConfigJSON<ConfigType.OVERRIDES>;
        fileConfigs.plugins = ConfigUtils.populateConfig(
            ConfigType.PLUGINS,
            fileConfigs.plugins
        ) as ConfigJSON<ConfigType.PLUGINS>;
        fileConfigs.emojis = ConfigUtils.populateConfig(
            ConfigType.EMOJIS,
            fileConfigs.emojis
        ) as ConfigJSON<ConfigType.EMOJIS>
        botConfigSchema().parse(fileConfigs.bot);
        mentionablesConfigSchema().parse(fileConfigs.mentionables);
        overridesConfigSchema().parse(fileConfigs.overrides);
        pluginsConfigSchema().parse(fileConfigs.plugins);
        emojiConfigSchema().parse(fileConfigs.emojis)
        return fileConfigs;
    }
}
