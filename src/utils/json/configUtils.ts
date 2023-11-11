import { JSONConfig } from "./parseConfig";
import path from 'node:path';
export namespace ConfigUtils {
    export function getDotenvPath() {
        const config = JSONConfig.parseConfigs()
        const filename = config.bot.dotenvOverride?.path!
        const root = config.bot.root
        return path.join(JSONConfig.ROOT_PATH,root,filename)
    }
}
