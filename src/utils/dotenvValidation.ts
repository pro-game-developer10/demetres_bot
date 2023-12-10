import { ZodType, z } from "zod";
import { DotEnvKey, dotenv, isValidDotenvKey } from "./dotenv";

type DotEnvSchemaKeys = {
    [K in DotEnvKey]?: ZodType;
};
const dotEnvSchema: DotEnvSchemaKeys = {
    ANTILINK_CHANNEL_ALLOWLIST: z.string().optional(),
    DEFAULT_GUILD_ID: z.number().optional().transform(String),
    DONATE_MANAGER_ROLE_ID: z.number().optional().transform(String),
    WFS_CHANNEL_ID: z.number().optional().transform(String),
    SUGGESTIONS_CHANNEL_ID: z.number().optional().transform(String),
    FALLBACK_LOGO_URL: z.string().url().optional(),
    JOB_MANAGER_ROLE_ID: z.number().optional().transform(String),
    NON_SLASH_PREFIX: z.string().length(1).optional(),
    STAFF_ROLE_ID: z.number().optional().transform(String),
    SUPPORT_CATEGORY_ID: z.number().optional().transform(String),
    SUPPORT_LOGS_CHANNEL_ID: z.number().optional().transform(String),
    TOKEN: z.string(),
};
export function validateDotenv() {
    for (const key in dotEnvSchema) {
        if (!isValidDotenvKey(key)) continue;
        dotEnvSchema[key as DotEnvKey]?.parse(dotenv(key));
    }
}
