import { JSONConfig } from "./parseConfig";
import path from 'node:path';
import { JSONConfigDefaults } from "../../data/jsonConfigDefaults";
import { getMissingProps, propsOf } from "../propsOf";
export namespace ConfigUtils {
    export function getDotenvPath() {
        const config = JSONConfig.parseConfigs()
        const filename = config.bot.dotenvOverride?.path!
        const root = config.bot.root
        return path.join(JSONConfig.ROOT_PATH,root,filename)
    }
    export function populateConfig(configType: JSONConfig.ConfigType, configObj: JSONConfig.ConfigJSON<typeof configType>): JSONConfig.ConfigJSON<typeof configType> {
        const missingProps: string[] = []
        let configDefaults = {}
        const configPairsWithLeader: [{}, ...[string,unknown][]] = [configObj]
        switch (configType) {
            case JSONConfig.ConfigType.BOT_CONFIG:
                missingProps.push(...getMissingProps(propsOf(JSONConfigDefaults.BOT),configObj as Record<string, unknown>))
                configDefaults = JSONConfigDefaults.BOT
                break
            case JSONConfig.ConfigType.CHANNELS:
                missingProps.push(...getMissingProps(propsOf(JSONConfigDefaults.CHANNELS),configObj as Record<string, unknown>))
                configDefaults = JSONConfigDefaults.CHANNELS
                break
            case JSONConfig.ConfigType.OVERRIDES:
                missingProps.push(...getMissingProps(propsOf(JSONConfigDefaults.OVERRIDES), configObj as Record<string, unknown>))
                configDefaults = JSONConfigDefaults.OVERRIDES
                break
            case JSONConfig.ConfigType.PLGUINS:
                missingProps.push(...getMissingProps(propsOf(JSONConfigDefaults.PLUGINS),configObj as Record<string, unknown>))
                configDefaults = JSONConfigDefaults.PLUGINS
                break
            case JSONConfig.ConfigType.ROLES:
                missingProps.push(...getMissingProps(propsOf(JSONConfigDefaults.ROLES), configObj as Record<string, unknown>))
                configDefaults = JSONConfigDefaults.ROLES
                break
            default:
                throw new Error("Invalid Config Type") as never
        }
        missingProps.forEach(prop => {
            const propSet: [{}, ...string[]] = [configDefaults,...prop.split(",")]
            const value = propSet.reduce((prev, val) => (
                prev as Record<string,
                    string | number |
                    Record<string, unknown>
                >
            )[val as string])
            configPairsWithLeader.push([prop,value])
        })
        let configFinal = configObj
        const configPairs = configPairsWithLeader.slice(1) as [string, unknown][]
        
    }
}
