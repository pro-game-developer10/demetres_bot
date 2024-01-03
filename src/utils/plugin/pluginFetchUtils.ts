import download from "download-git-repo"
import path from "node:path"
import { JSONConfig } from "../json"
import fs from "node:fs"

export namespace PluginUtils {
    interface PluginDownloadResult {
        repo: string,
        dest: string,
        pluginName: string,
        restart: boolean,
        err?: Error 
    }
    export const PLUGINS_FOLDER = path.join(JSONConfig.ROOT_PATH, "plugins")
    export const PLUGINS_FOLDER_TEMP = path.join(JSONConfig.ROOT_PATH, ".temp/plugins")
    export async function downloadPluginRepo(repo: string, restart: boolean = true): Promise<PluginDownloadResult> {
        const pluginName = repo.split("/").filter(el => Boolean(el)).at(-1)!
        const TEMP_DOWNLOAD_PATH = path.join(PLUGINS_FOLDER_TEMP, pluginName)
        const PLUGIN_DOWNLOAD_PATH = path.join(PLUGINS_FOLDER, pluginName)
        const result: PluginDownloadResult = {
            repo, restart, pluginName,
            dest: PLUGIN_DOWNLOAD_PATH
        }
        download(repo, TEMP_DOWNLOAD_PATH, err => {
            result.err = err
            if (err) {
                console.log(err)
                throw err
            }
            fs.readFileSync(path.join(TEMP_DOWNLOAD_PATH, "plugin.json"))
            fs.cpSync(TEMP_DOWNLOAD_PATH, PLUGIN_DOWNLOAD_PATH, { recursive: true })
            fs.rmdirSync(TEMP_DOWNLOAD_PATH)
        })
        return result
    }
}
