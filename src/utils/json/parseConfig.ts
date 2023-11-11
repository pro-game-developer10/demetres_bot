import fs from "node:fs";
import path from "node:path";
import BotConfig, { botConfigSchema } from "../../types/config/bot-config";
import ChannelConfig, { channelsConfigSchema } from "../../types/config/channels";
import OverridesConfig, { overridesConfigSchema } from "../../types/config/overrides";
import PluginsConfig, { pluginsConfigSchema } from "../../types/config/plugins";
import RolesConfig, { rolesConfigSchema } from "../../types/config/roles";
import { JSONConfigDefaults } from "../../data/jsonConfigDefaults";

export namespace JSONConfig {
    export const ROOT_PATH = path.join(__dirname, "../../../");
    export const OVERRIDES_CONFIG_FILE_PATH = path.join(
        ROOT_PATH,
        "./config/overrides.json"
    );

    export enum ConfigType {
        BOT_CONFIG = "bot-config",
        CHANNELS = "channels",
        OVERRIDES = "overrides",
        PLGUINS = "plugins",
        ROLES = "roles",
    }

    export type ConfigJSON<C extends ConfigType> =
        | C extends ConfigType.BOT_CONFIG
        ? BotConfig
        : C extends ConfigType.CHANNELS
        ? ChannelConfig
        : C extends ConfigType.OVERRIDES
        ? OverridesConfig
        : C extends ConfigType.PLGUINS
        ? PluginsConfig
        : C extends ConfigType.ROLES
        ? RolesConfig
        : never;

    export interface ConfigsAll extends ConfigsAllLimited {
        [configType: string]: Partial<ConfigJSON<ConfigType>>;
    }
    export interface ConfigsAllLimited {
        bot: ConfigJSON<ConfigType.BOT_CONFIG>;
        channels: ConfigJSON<ConfigType.CHANNELS>;
        overrides: ConfigJSON<ConfigType.OVERRIDES>;
        plugins: ConfigJSON<ConfigType.PLGUINS>;
        roles: ConfigJSON<ConfigType.ROLES>;
    }
    export type ConfigPathsAll = {
        [P in keyof ConfigsAll]: string
    }
    export function configPaths() {
        const fileBuffer = fs.readFileSync(OVERRIDES_CONFIG_FILE_PATH)
        const contents = JSON.parse(fileBuffer.toString()) as OverridesConfig
        const fallbacks = {
            botPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(path => path.type === "bot-config")[0].path,
            channelsPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(path => path.type === "channels")[0].path,
            rolesPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(path => path.type === "roles")[0].path,
            pluginsPath: JSONConfigDefaults.OVERRIDES.configPaths.filter(path => path.type === "plugins")[0].path
        }
        const botPath = contents.configPaths?.filter(path => path.type === "bot-config")[0].path ?? fallbacks.botPath
        const channelsPath = contents.configPaths?.filter(path => path.type === "channels")[0].path ?? fallbacks.channelsPath
        const rolesPath = contents.configPaths?.filter(path => path.type === "roles")[0].path ?? fallbacks.rolesPath
        const pluginsPath = contents.configPaths?.filter(path => path.type === "plugins")[0].path ?? fallbacks.pluginsPath
        const paths: ConfigPathsAll = {
            bot: path.join(ROOT_PATH, contents.root, botPath),
            channels: path.join(ROOT_PATH, contents.root, channelsPath),
            overrides: OVERRIDES_CONFIG_FILE_PATH,
            plugins: path.join(ROOT_PATH, contents.root, rolesPath),
            roles: path.join(ROOT_PATH, contents.root, pluginsPath),
        };
        return paths
    }
    export function parseConfigs() {
        const paths = configPaths()
        const fileConfigs = {
            bot: JSON.parse(fs.readFileSync(paths.bot).toString()) as ConfigJSON<ConfigType.BOT_CONFIG>,
            channels: JSON.parse(fs.readFileSync(paths.channels).toString()) as ConfigJSON<ConfigType.CHANNELS>,
            overrides: JSON.parse(fs.readFileSync(paths.overrides).toString()) as ConfigJSON<ConfigType.OVERRIDES>,
            plugins: JSON.parse(fs.readFileSync(paths.plugins).toString()) as ConfigJSON<ConfigType.PLGUINS>,
            roles: JSON.parse(fs.readFileSync(paths.roles).toString()) as ConfigJSON<ConfigType.ROLES>,
        }
        botConfigSchema().parse(fileConfigs.bot)
        channelsConfigSchema().parse(fileConfigs.channels)
        overridesConfigSchema().parse(fileConfigs.overrides)
        pluginsConfigSchema().parse(fileConfigs.plugins)
        rolesConfigSchema().parse(fileConfigs.roles)
        return fileConfigs
    }
}
