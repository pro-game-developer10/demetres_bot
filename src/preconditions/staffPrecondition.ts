import { Precondition } from "@sapphire/framework";
import {
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
    GuildMember,
    Message,
} from "discord.js";
import { ConfigUtils } from "../utils/json/configUtils";

export class StaffPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        return StaffPrecondition.checkMember(message.member!)
            ? this.ok()
            : this.error({ message: "You must be a staff to do this!" });
    }
    public override async chatInputRun(
        interaction: ChatInputCommandInteraction
    ) {
        return StaffPrecondition.checkMember(interaction.member as GuildMember)
            ? this.ok()
            : this.error({ message: "You must be a staff to do this!" });
    }
    public override async contextMenuRun(
        interaction: ContextMenuCommandInteraction
    ) {
        return StaffPrecondition.checkMember(interaction.member as GuildMember)
            ? this.ok()
            : this.error({ message: "You must be a staff to do this!" });
    }
    public static checkMember(member: GuildMember) {
        return (
            member.roles.cache.has(ConfigUtils.findOneMentionableByFlags("role", "DONATE_MANAGER_ROLE").id) ||
            member.roles.cache.has(ConfigUtils.findOneMentionableByFlags("role", "JOB_MANAGER_ROLE").id) ||
            member.roles.cache.has(ConfigUtils.findOneMentionableByFlags("role", "STAFF_ROLE").id)
        );
    }
}
declare module "@sapphire/framework" {
    interface Preconditions {
        StaffPrecondition: never;
    }
}
