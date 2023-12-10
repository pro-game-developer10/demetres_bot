import { JSONConfig } from "./parseConfig";
import path from "node:path";
import { JSONConfigDefaults } from "../../data/jsonConfigDefaults";
import { ConfigFile } from "../../types/config/bot-config";
export namespace ConfigUtils {
    export function getDotenvPath() {
        const config = JSONConfig.parseConfigs();
        const filename = config.bot.dotenvOverride?.path;
        const { root } = config.bot;
        return path.join(JSONConfig.ROOT_PATH, root, filename!);
    }
    interface PrefixInfo {
        prefix: string,
        slashEnabled: boolean
    }
    export function getPrefixInfo(): PrefixInfo {
        const config = JSONConfig.parseConfigs();
        const { prefix } = config.bot;
        return typeof prefix === "string" ? {
            prefix,
            slashEnabled: true
        } : {
            prefix: prefix.nonSlash,
            slashEnabled: prefix.slashEnabled ?? true
        }
    }
    export function parseConfigFileInfo(configObj: ConfigFile): ConfigFile {
        let { fileType } = configObj;
        const { path, type } = configObj
        const validFileExtensions = ["env", "yml", "json"] as const;
        if (!fileType)
            fileType = path
                .split(".")
                .at(-1) as (typeof validFileExtensions)[number];
        if (!validFileExtensions.includes(fileType))
            throw new Error(`Invalid filetype: ${fileType}`);
        return { path, fileType, type };
    }
    export function populateConfig(
        configType: JSONConfig.ConfigType,
        configObj: JSONConfig.ConfigJSON<typeof configType>
    ): JSONConfig.ConfigJSON<typeof configType> {
        let configDefaults = {};
        switch (configType) {
        case JSONConfig.ConfigType.BOT_CONFIG:
            configDefaults = JSONConfigDefaults.BOT;
            break;
        case JSONConfig.ConfigType.MENTIONABLES:
            configDefaults = JSONConfigDefaults.MENTIONABLES;
            break;
        case JSONConfig.ConfigType.OVERRIDES:
            configDefaults = JSONConfigDefaults.OVERRIDES;
            break;
        case JSONConfig.ConfigType.PLUGINS:
            configDefaults = JSONConfigDefaults.PLUGINS;
            break;
        default:
            throw new Error("Invalid Config Type") as never;
        }
        return Object.assign(configDefaults, configObj);
    }
}
