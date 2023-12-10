import fs from "node:fs";
import { parse as parseDotenv } from "dotenv";
import { DotEnvFallbacks } from "../data/dotenvDefaults";
import { ConfigUtils } from "./json/configUtils";
export function isValidDotenvKey(key: DotEnvKey | string): key is DotEnvKey {
    return Object.prototype.hasOwnProperty.call(DotEnvFallbacks, key);
}
function isError(input: unknown): input is Error {
    return input instanceof Error;
}
export type DotEnvKey =
    | "TOKEN"
    | "FALLBACK_LOGO_URL"
    | "DEFAULT_GUILD_ID"
    | "ANTILINK_CHANNEL_ALLOWLIST"
export function dotenv(key: DotEnvKey) {
    if (process.env[key]) return String(process.env[key]);
    else
        throw new Error(
            `No such key as "${key}" was found in the ${ConfigUtils.getDotenvPath()} file`
        );
}
export function dotenvInit() {
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
