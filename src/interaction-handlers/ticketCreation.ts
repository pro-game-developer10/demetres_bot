import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { ChannelType, OverwriteResolvable, type StringSelectMenuInteraction } from 'discord.js';
import { dotenv } from '../utils/dotenv';
import { EmbedTemplate, TicketPermissionsInfo } from '../utils/embedTemplates';

export class TicketSelectionHandler extends InteractionHandler {
    public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
        super(ctx, {
        ...options,
        interactionHandlerType: InteractionHandlerTypes.SelectMenu
        });
    }

    public override parse(interaction: StringSelectMenuInteraction) {
        if (interaction.customId !== 'ticket_type') return this.none();

        return this.some();
    }

    public async run(interaction: StringSelectMenuInteraction) {
        let ticketInfo: {
            name: string,
            mentions: string[],
            permissions: OverwriteResolvable[]
        } = { name: "", mentions: [], permissions: [] }
        switch (interaction.values[0]) {
            case "support":
                ticketInfo.name = `🎟️〢${interaction.user.username}-support`
                ticketInfo.mentions.push(`<@${interaction.user.id}>`, `<@&${dotenv("STAFF_ROLE_ID")}>`)
                ticketInfo.permissions = TicketPermissionsInfo.SupportTicketPermissions(interaction.user.id,interaction.guild!)
                break
            case "job":
                ticketInfo.name = `💼〢${interaction.user.username}-job`
                ticketInfo.mentions.push(`<@${interaction.user.id}>`, `<@&${dotenv("JOB_MANAGER_ROLE_ID")}>`)
                ticketInfo.permissions = TicketPermissionsInfo.JobTicketPermissions(interaction.user.id,interaction.guild!)
                break
            case "donate":
                ticketInfo.mentions.push(`<@${interaction.user.id}>`,`<@&${dotenv("DONATE_MANAGER_ROLE_ID")}>`)
                ticketInfo.name = `💸〢${interaction.user.username}-donate`
                ticketInfo.permissions = TicketPermissionsInfo.DonateTicketPermissions(interaction.user.id,interaction.guild!)
                break
            default:
                ticketInfo.mentions.push(`<@${interaction.user.id}>`,`<@&${dotenv("STAFF_ROLE_ID")}>`)
                ticketInfo.name = `🎫〢${interaction.user.username}-ticket`
                ticketInfo.permissions = TicketPermissionsInfo.SupportTicketPermissions(interaction.user.id,interaction.guild!)
                break
        }
        const categoryID = dotenv("SUPPORT_CATEGORY_ID")
        const ticketChannel = await interaction.guild?.channels.create({
            type: ChannelType.GuildText,
            name: ticketInfo.name,
            parent: categoryID,
            topic: `Ticket που φτιάχτηκε από τον user ${interaction.user.username}, θα σας εξυπηρετήσουμε σύντομα!`,
            reason: `Ticket που φτιάχτηκε από τον user ${interaction.user.username}`,
            permissionOverwrites: ticketInfo.permissions
        })
        await interaction.guild?.channels.fetch(dotenv("SUPPORT_LOGS_CHANNEL_ID"))?.then(channel => {
            if (channel?.isTextBased()) channel.send({
                content: ticketInfo.mentions[1],
                embeds: [EmbedTemplate.UserSupportNeeded(interaction.user.id,ticketChannel?.id!)]
            })
        })
        await ticketChannel?.send({
            content: ticketInfo.mentions.join("|"),
            embeds: [EmbedTemplate.TicketCreationEmbedTemplate(interaction.user.id)],
            components: [EmbedTemplate.TicketControls]
        })
        await interaction.reply({
            content: `Ticket (τύπου ${ticketInfo.name.split("-")[1]}) φτιάχτηκε με επιτυχία στο κανάλι <#${ticketChannel?.id}>`,
            ephemeral: true
        })
    }
}