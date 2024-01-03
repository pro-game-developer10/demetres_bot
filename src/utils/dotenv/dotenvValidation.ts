import { ZodType, z } from "zod";
import { DotEnvKey, dotenv, isValidDotenvKey } from "./dotenv";

/**
 * Represents a zod schema based on the currently available .env keys
 */
type DotEnvSchemaKeys = {
    [K in DotEnvKey]?: ZodType;
};
const dotEnvSchema: DotEnvSchemaKeys = {
    DEFAULT_GUILD_ID: z.number().optional().transform(String),
    FALLBACK_LOGO_URL: z.string().url().optional(),
    TOKEN: z.string(),
    ANTILINK_CHANNEL_ALLOWLIST: z.string().optional()
};
/**
 * Validates the entirety of the .env config
 */
export function validateDotenv() {
    for (const key in dotEnvSchema) {
        if (!isValidDotenvKey(key)) continue;
        dotEnvSchema[key as DotEnvKey]?.parse(dotenv(key));
    }
}
