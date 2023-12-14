import {
    InteractionHandler,
    InteractionHandlerTypes,
} from "@sapphire/framework";
import {
    ChannelType,
    OverwriteResolvable,
    type StringSelectMenuInteraction,
} from "discord.js";
import { ConfigUtils } from "../utils/json/configUtils";
import { EmbedTemplate, TicketPermissionsInfo } from "../utils/embedTemplates";

export class TicketSelectionHandler extends InteractionHandler {
    public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.SelectMenu,
        });
    }

    public override parse(interaction: StringSelectMenuInteraction) {
        if (interaction.customId !== "ticket_type") return this.none();

        return this.some();
    }

    public async run(interaction: StringSelectMenuInteraction) {
        const ticketInfo: {
            name: string;
            mentions: string[];
            permissions: OverwriteResolvable[];
        } = { name: "", mentions: [], permissions: [] };
        switch (interaction.values[0]) {
        case "support":
            ticketInfo.name = `🎟️〢${interaction.user.username}-support`;
            ticketInfo.mentions.push(
                `<@${interaction.user.id}>`,
                `<@&${ConfigUtils.findOneMentionableByFlags("role","STAFF_ROLE").id}>`
            );
            ticketInfo.permissions =
                    TicketPermissionsInfo.SupportTicketPermissions(
                        interaction.user.id,
                        interaction.guild!
                    );
            break;
        case "job":
            ticketInfo.name = `💼〢${interaction.user.username}-job`;
            ticketInfo.mentions.push(
                `<@${interaction.user.id}>`,
                `<@&${ConfigUtils.findOneMentionableByFlags("role","JOB_MANAGER_ROLE").id}>`
            );
            ticketInfo.permissions =
                    TicketPermissionsInfo.JobTicketPermissions(
                        interaction.user.id,
                        interaction.guild!
                    );
            break;
        case "donate":
            ticketInfo.mentions.push(
                `<@${interaction.user.id}>`,
                `<@&${ConfigUtils.findOneMentionableByFlags("role","DONATE_MANAGER_ROLE").id}>`
            );
            ticketInfo.name = `💸〢${interaction.user.username}-donate`;
            ticketInfo.permissions =
                    TicketPermissionsInfo.DonateTicketPermissions(
                        interaction.user.id,
                        interaction.guild!
                    );
            break;
        default:
            ticketInfo.mentions.push(
                `<@${interaction.user.id}>`,
                `<@&${ConfigUtils.findOneMentionableByFlags("role","STAFF_ROLE").id}>`
            );
            ticketInfo.name = `🎫〢${interaction.user.username}-ticket`;
            ticketInfo.permissions =
                    TicketPermissionsInfo.SupportTicketPermissions(
                        interaction.user.id,
                        interaction.guild!
                    );
            break;
        }
        const categoryID = ConfigUtils.findOneMentionableByFlags("channel","SUPPORT_CATEGORY").id;
        const ticketChannel = await interaction.guild?.channels.create({
            type: ChannelType.GuildText,
            name: ticketInfo.name,
            parent: categoryID,
            topic: `Ticket που φτιάχτηκε από τον user ${interaction.user.username}, θα σας εξυπηρετήσουμε σύντομα!`,
            reason: `Ticket που φτιάχτηκε από τον user ${interaction.user.username}`,
            permissionOverwrites: ticketInfo.permissions,
        });
        await ticketChannel?.send({
            content: ticketInfo.mentions.join("|"),
            embeds: [
                EmbedTemplate.TicketCreationEmbedTemplate(interaction.user.id),
            ],
            components: [EmbedTemplate.TicketControls],
        });
        await interaction.reply({
            content: `Ticket (τύπου ${
                ticketInfo.name.split("-")[1]
            }) φτιάχτηκε με επιτυχία στο κανάλι <#${ticketChannel?.id}>`,
            ephemeral: true,
        });
    }
}
