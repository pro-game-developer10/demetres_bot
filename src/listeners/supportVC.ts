import { Listener } from '@sapphire/framework';
import { ChannelType, VoiceState } from 'discord.js';
import { dotenv } from '../utils/dotenv';
import { EmbedTemplate, TicketPermissionsInfo } from '../utils/embedTemplates';

export class SupportVCListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'supportVC',
            once: false,
            event: "voiceStateUpdate"
        })
    }
    public async run(_oldState: VoiceState, newState: VoiceState) {
        if (!(newState.channelId! == dotenv("WFS_CHANNEL_ID"))) return
        // const whitelistedStaffRoleIDs = [
        //     dotenv("STAFF_ROLE_ID"),
        //     dotenv("JOB_MANAGER_ROLE_ID"),
        //     dotenv("DONATE_MANAGER_ROLE_ID")
        // ]
        // const staffInside = newState.channel?.members?.filter(member => {
        //     const hasAtleastOneStaffRole = whitelistedStaffRoleIDs.map(roleID => member.roles.cache.has(roleID)).reduce((prev,val) => prev || val)
        //     const hasAdminPerm = member.permissions.has(PermissionFlagsBits.Administrator, true)
        //     return (hasAtleastOneStaffRole || hasAdminPerm)
        // })!
        // if (staffInside.size == 0) return
        const supportChannelCount = newState.guild.channels.cache.filter(channel => channel.isVoiceBased() && channel.parentId == dotenv("SUPPORT_CATEGORY_ID")).size
        const supportChannel = await newState.guild?.channels.create({
            type: ChannelType.GuildVoice,
            name: `📞〢Support #${supportChannelCount}`,
            parent: dotenv("SUPPORT_CATEGORY_ID"),
            reason: `WFS Voice Channel που φτιάχτηκε από τον user ${newState.member?.user.username}`,
            permissionOverwrites: TicketPermissionsInfo.WFSVCChannelPermissions(newState.member?.user.id!,newState.guild)
        })
        newState.setChannel(supportChannel,`WFS Voice Channel που φτιάχτηκε από τον user ${newState.member?.user.username}`)
        await newState.guild?.channels.fetch(dotenv("SUPPORT_LOGS_CHANNEL_ID"))?.then(channel => {
            if (channel?.isTextBased()) channel.send({
                content: `<@&${dotenv("STAFF_ROLE_ID")}>`,
                embeds: [EmbedTemplate.UserSupportNeeded(newState.member?.user.id!,supportChannel.id)]
            })
        })
    }
}