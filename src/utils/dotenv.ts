import { configDotenv } from 'dotenv';
import { DotEnvFallbacks } from '../data/dotenvDefaults';
export function isValidDotenvKey(key: DotEnvKey | string): key is DotEnvKey {
    return Object.prototype.hasOwnProperty.call(DotEnvFallbacks, key)
}
function isError(input: unknown): input is Error {
    return (input instanceof Error)
}
export type DotEnvKey =
    | "TOKEN"
    | "SUPPORT_CATEGORY_ID"
    | "SUPPORT_LOGS_CHANNEL_ID"
    | "STAFF_ROLE_ID"
    | "JOB_MANAGER_ROLE_ID"
    | "DONATE_MANAGER_ROLE_ID"
    | "WFS_CHANNEL_ID"
    | "SUGGESTIONS_CHANNEL_ID"
    | "FALLBACK_LOGO_URL"
    | "DEFAULT_GUILD_ID"
    | "ANTILINK_CHANNEL_ALLOWLIST"
    | "NON_SLASH_PREFIX"
export function dotenv(key: DotEnvKey) {
    const env = configDotenv()
    const processEnv = env.parsed!
    if (env.error) throw env.error
    if (processEnv[key]) return String(processEnv[key])
    else {
        if (isError(DotEnvFallbacks[key])) throw new Error(DotEnvFallbacks[key])
        else return DotEnvFallbacks[key]
    }
}
