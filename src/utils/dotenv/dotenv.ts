import fs from "node:fs";
import { parse as parseDotenv } from "dotenv";
import { DotEnvFallbacks } from "../../data/dotenvDefaults";
import { ConfigUtils } from "../json";
/**
 * Checks whether a key is valid in the .env file
 * @param key - Key to check
 * @returns Whether or not the provided key is valid
 */
export function isValidDotenvKey(key: DotEnvKey | string): key is DotEnvKey {
    return Object.prototype.hasOwnProperty.call(DotEnvFallbacks, key);
}
/**
 * Checks whether the input is an instance of the Error class
 * @param input - Value to check
 * @returns Whether or not the provided value is an instance of the Error class
 */
function isError(input: unknown): input is Error {
    return input instanceof Error;
}
/**
 * Represents every valid .env key
 */
export type DotEnvKey =
    | "TOKEN"
    | "FALLBACK_LOGO_URL"
    | "DEFAULT_GUILD_ID"
    | "ANTILINK_CHANNEL_ALLOWLIST"
/**
 * Gets the value of a .env key
 * @param key The key to get the value from
 * @returns The value of the provided key
 * @throws Error when the provided key is not found in the .env file
 */
export function dotenv(key: DotEnvKey): string {
    if (process.env[key]) return String(process.env[key]);
    else
        throw new Error(
            `No such key as "${key}" was found in the ${ConfigUtils.getDotenvPath()} file`
        );
}
/**
 * Represents the .env config as JSON object
 */
type DotEnvConfig = {
    [k in DotEnvKey]: string;
};
/**
 * Reads and iniatiates the .env config
 * @returns The entire .env config as JSON object
 * @throws Error when a key is missing from the .env file and doesn't have any default value
 */
export function dotenvInit(): Partial<DotEnvConfig> {
    const envBuf = fs.readFileSync(ConfigUtils.getDotenvPath());
    const env = parseDotenv(envBuf.toString());
    const dotenvKeys = Object.keys(DotEnvFallbacks);
    dotenvKeys.forEach((key) => {
        const dkey = key as DotEnvKey;
        if (env[dkey]) {
            env[dkey] = String(env[dkey]);
            return;
        }
        if (!isError(DotEnvFallbacks[dkey])) env[dkey] = DotEnvFallbacks[dkey];
        else throw new Error(DotEnvFallbacks[dkey]);
    });
    return env;
}
