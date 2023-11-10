import { z } from 'zod'
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
export const rolesConfigSchema = () => z.object({
    roles: z.array(z.string().or(z.object({
        id: z.string(),
        type: z.string(),
        flags: z.array(z.string()).or(z.record(z.boolean()).optional()).optional(),
        options: z.union([z.object({
            disabled: z.boolean().optional()
        }),z.record(z.unknown())]).optional()
    }))).optional()
})
interface Role {
    id: string;
    type: string;
    flags?: string[] | Record<string, boolean>;
    options?: Partial<RoleOptions>;
}
interface BaseRoleOptions {
    disabled?: boolean;
}
type RoleOptions = BaseRoleOptions & Record<string, unknown>;
