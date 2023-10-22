import { Precondition } from '@sapphire/framework';
import { ChatInputCommandInteraction, ContextMenuCommandInteraction, GuildMember, Message } from 'discord.js';
import { dotenv } from '../utils/dotenv';

export class StaffPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        return StaffPrecondition.checkMember(message.member!) ? this.ok() : this.error({ message: "You must be a staff to do this!" })
    }
    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        return StaffPrecondition.checkMember(interaction.member as GuildMember) ? this.ok() : this.error({ message: "You must be a staff to do this!" })
    }
    public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
        return StaffPrecondition.checkMember(interaction.member as GuildMember) ? this.ok() : this.error({ message: "You must be a staff to do this!" })
    }
    public static checkMember(member: GuildMember) {
        return member.roles.cache.has(dotenv("DONATE_MANAGER_ROLE_ID")) || member.roles.cache.has(dotenv("JOB_MANAGER_ROLE_ID")) || member.roles.cache.has(dotenv("STAFF_ROLE_ID"))
    }
}
declare module '@sapphire/framework' {
    interface Preconditions {
        StaffPrecondition: never
    }
}