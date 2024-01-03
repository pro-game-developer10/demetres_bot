import { JSONConfig } from "./parseConfig";
import path from "node:path";
import { JSONConfigDefaults } from "../../data/jsonConfigDefaults";
import { ConfigFile } from "../../schemas/config/bot-config";
import MentionablesConfig from "../../schemas/config/mentionables";
export namespace ConfigUtils {
    export function getDotenvPath() {
        const config = JSONConfig.parseConfigs();
        const filename = config.bot.dotenvOverride?.path;
        const { root } = config.bot;
        return path.join(JSONConfig.ROOT_PATH, root, filename!);
    }
    interface PrefixInfo {
        prefix: string;
        slashEnabled: boolean;
    }
    export function getPrefixInfo(): PrefixInfo {
        const configs = JSONConfig.parseConfigs();
        const { prefix } = configs.bot;
        return typeof prefix === "string"
            ? {
                prefix,
                slashEnabled: true,
            }
            : {
                prefix: prefix.nonSlash,
                slashEnabled: prefix.slashEnabled ?? true,
            };
    }
    type MentionableType = "channel" | "role" | "all"
    type ChannelMentionableFlag =
        | "SUPPORT_CATEGORY"
        | "SUPPORT_LOGS"
        | "WFS_CHANNEL"
        | "SUGGESTIONS_CHANNEL"
    type RoleMentionableFlag =
        | "STAFF_ROLE"
        | "JOB_MANAGER_ROLE"
        | "DONATE_MANAGER_ROLE"
    type GlobalMentionableFlags = never
    type MentionableFlagAll = ChannelMentionableFlag | RoleMentionableFlag
    export type MentionableFlag<T extends MentionableType = "all"> =
        ( T extends "channel"
        ? ChannelMentionableFlag
        : T extends "role"
        ? RoleMentionableFlag
        : T extends "all"
        ? MentionableFlagAll
        : string )
        | GlobalMentionableFlags
    export function includesFlag(flagList: string[] | Record<string, boolean>, desiredFlag: string): boolean {
        if (Array.isArray(flagList)) return flagList.includes(desiredFlag)
        else return flagList[desiredFlag]
    }
    export function filterMentionablesByFlags(mentionableType: MentionableType, ...flags: MentionableFlag<typeof mentionableType>[]): MentionablesConfig["items"] {
        const configs = JSONConfig.parseConfigs()
        const { items } = configs.mentionables
        if (!items) return []
        flags = Array.from(new Set(flags))
        const itemsFilteredByType = mentionableType == "all"
            ? items
            : items.filter(item => item.type == mentionableType)
        return itemsFilteredByType.filter(item => {
            if (!item.flags) return false
            else return flags.reduce((prev, val) => (prev && includesFlag(item.flags! ,val)), true)
        })
    }
    export function findOneMentionableByFlags(mentionableType: MentionableType, ...flags: MentionableFlag<typeof mentionableType>[]): NonNullable<MentionablesConfig["items"]>[number] {
        return filterMentionablesByFlags(mentionableType, ...flags)![0]
    }
    export function getEmojiByType(type: string, returnAsMention: boolean = false): string | null {
        const configs = JSONConfig.parseConfigs()
        const { emojis, enabled } = configs.emojis
        if (!enabled) return null
        const selectedEmoji = emojis?.filter(emoji => emoji.type === type)[0]
        if (!selectedEmoji) return null
        if (returnAsMention && !selectedEmoji.id) return null
        else return returnAsMention 
            ? `<${selectedEmoji.animated ? "a" : ""}:${selectedEmoji.name}:${selectedEmoji.id}>`
            : selectedEmoji.unicodeLiteral ?? selectedEmoji.id ?? selectedEmoji.name ?? null
    }
    export function parseConfigFileInfo(configObj: ConfigFile): ConfigFile {
        let { fileType } = configObj;
        const { path, type } = configObj;
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
        case JSONConfig.ConfigType.EMOJIS:
            configDefaults = JSONConfigDefaults.EMOJIS
            break
        default:
            throw new Error("Invalid Config Type") as never;
        }
        return Object.assign(configDefaults, configObj);
    }
}
