/**
 * @file roles.json
 * @main
 */
export default interface RolesConfig {
    roles: Array<string | Role>;
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
interface Role {
    id: string;
    type: string;
    extendsFrom: string;
    flags?: string[] | Record<string, boolean>;
    options?: Partial<RoleOptions>;
}
interface BaseRoleOptions {
    disabled?: boolean;
}
type RoleOptions = BaseRoleOptions & Record<string, unknown>;
