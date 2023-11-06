/**
 * @file bot-config.json
 * @main
 */
export default interface BotConfig {
    root: string;
    dotenvOverride?: Omit<ConfigFile,"fileType" | "type">;
    // configPaths?: ConfigFile[];
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
interface ConfigFile {
    type: string
    fileType: 'env' | 'json' | 'yml';
    path: string;
}
