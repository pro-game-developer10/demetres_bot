import { configDotenv } from 'dotenv';

export function dotenv(key: string) {
    const env = configDotenv()
    const processEnv = env.parsed!
    if (env.error) throw env.error
    return String(processEnv[key])
}