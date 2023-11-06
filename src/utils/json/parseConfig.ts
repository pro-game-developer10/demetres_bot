import fs from "node:fs/promises";
import path from "node:path";
import BotConfig from "../../types/config/bot-config";
import ChannelConfig from "../../types/config/channels";
import OverridesConfig from "../../types/config/overrides";
import PluginsConfig from "../../types/config/plugins";
import RolesConfig from "../../types/config/roles";
import { JSONConfigDefaults } from "../../data/jsonConfigDefaults";

export namespace JSONConfig {
    export const ROOT_PATH = path.join(__dirname, "../../../");
    export const OVERRIDES_CONFIG_FILE_PATH = path.join(
        ROOT_PATH,
        "./config/overrides.json"
    );

    enum ConfigType {
        BOT_CONFIG = "bot-config",
        CHANNELS = "channels",
        OVERRIDES = "overrides",
        PLGUINS = "plugins",
        ROLES = "roles",
    }

    type ConfigJSON<C extends ConfigType> =
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

    interface ConfigsAll {
        [configType: string]: Partial<ConfigJSON<ConfigType>>;
        bot: ConfigJSON<ConfigType.BOT_CONFIG>;
        channels: ConfigJSON<ConfigType.BOT_CONFIG>;
        overrides: ConfigJSON<ConfigType.BOT_CONFIG>;
        plugins: ConfigJSON<ConfigType.BOT_CONFIG>;
        roles: ConfigJSON<ConfigType.BOT_CONFIG>;
    }
    type ConfigPathsAll = {
        [P in keyof ConfigsAll]: string
    }
    export async function configPaths() {
        const fileBuffer = await fs.readFile(OVERRIDES_CONFIG_FILE_PATH)
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
    export async function parseConfigs() {
        const paths = await configPaths()
        const fileConfigs = {
            bot: JSON.parse((await fs.readFile(paths.bot)).toString()) as ConfigJSON<ConfigType.BOT_CONFIG>,
            channels: JSON.parse((await fs.readFile(paths.channels)).toString()) as ConfigJSON<ConfigType.CHANNELS>,
            overrides: JSON.parse((await fs.readFile(paths.overrides)).toString()) as ConfigJSON<ConfigType.OVERRIDES>,
            plugins: JSON.parse((await fs.readFile(paths.plugins)).toString()) as ConfigJSON<ConfigType.PLGUINS>,
            roles: JSON.parse((await fs.readFile(paths.roles)).toString()) as ConfigJSON<ConfigType.ROLES>,
        };
        return fileConfigs
    }
}
