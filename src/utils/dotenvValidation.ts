import { ZodType, z } from "zod";
import { DotEnvKey, dotenv, isValidDotenvKey } from "./dotenv";

type DotEnvSchemaKeys = {
    [K in DotEnvKey]?: ZodType;
};
const dotEnvSchema: DotEnvSchemaKeys = {
    DEFAULT_GUILD_ID: z.number().optional().transform(String),
    FALLBACK_LOGO_URL: z.string().url().optional(),
    TOKEN: z.string(),
    ANTILINK_CHANNEL_ALLOWLIST: z.string().optional()
};
export function validateDotenv() {
    for (const key in dotEnvSchema) {
        if (!isValidDotenvKey(key)) continue;
        dotEnvSchema[key as DotEnvKey]?.parse(dotenv(key));
    }
}
