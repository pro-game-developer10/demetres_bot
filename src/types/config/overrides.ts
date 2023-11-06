/**
 * @file overrides.json
 * @main
 */
export default interface OverridesConfig {
    root: string;
    configPaths?: ConfigFile[];
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
interface ConfigFile {
    type: string;
    fileType: "env" | "json" | "yml";
    path: string;
}
