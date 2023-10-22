import { configDotenv } from 'dotenv';

type DotEnvKey = "TOKEN" | "SUPPORT_CATEGORY_ID" | "SUPPORT_LOGS_CHANNEL_ID" | "STAFF_ROLE_ID" | "JOB_MANAGER_ROLE_ID" | "DONATE_MANAGER_ROLE_ID" | "WFS_CHANNEL_ID" | "SUGGESTIONS_CHANNEL_ID"
export function dotenv(key: DotEnvKey) {
    const env = configDotenv()
    const processEnv = env.parsed!
    if (env.error) throw env.error
    return String(processEnv[key])
}