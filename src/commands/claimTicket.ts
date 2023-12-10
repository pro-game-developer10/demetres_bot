import { Command } from "@sapphire/framework";
import { GuildChannel, Message } from "discord.js";
import { TicketPermissionsInfo } from "../utils/embedTemplates";

export class ClaimTicketCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "claim-ticket",
            aliases: ["claimticket"],
            description: "Claims this ticket",
            preconditions: ["TicketChannelPrecondition", "StaffPrecondition"],
            requiredClientPermissions: ["ManageChannels", "ManageRoles"],
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder.setName(this.name).setDescription(this.description),
            { idHints: ["1165680158183784650"] }
        );
    }
    public async messageRun(message: Message) {
        await (message.channel as GuildChannel).permissionOverwrites.set(
            TicketPermissionsInfo.ClaimedTicketPermissions(
                message.author.id,
                message.guild!
            )
        );
        return await message.reply(
            `This ticket is now claimed by <@${message.author.id}>`
        );
    }
    public async chatInputRun(
        interaction: Command.ChatInputCommandInteraction
    ) {
        await (interaction.channel as GuildChannel).permissionOverwrites.set(
            TicketPermissionsInfo.ClaimedTicketPermissions(
                interaction.member!.user.id,
                interaction.guild!
            )
        );
        return await interaction.reply(
            `This ticket is now claimed by <@${interaction.user.id}>`
        );
    }
}
