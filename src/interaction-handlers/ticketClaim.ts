import {
    InteractionHandler,
    InteractionHandlerTypes,
} from "@sapphire/framework";
import { ButtonInteraction, GuildChannel, GuildMember } from "discord.js";
import { TicketPermissionsInfo } from "../utils/embed/embedTemplates";
import { StaffPrecondition } from "../preconditions/staffPrecondition";

export class TicketCloseHandler extends InteractionHandler {
    public constructor(
        ctx: InteractionHandler.LoaderContext,
        options: InteractionHandler.Options
    ) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== "claim_ticket") return this.none();

        return this.some();
    }

    public async run(interaction: ButtonInteraction) {
        if (!StaffPrecondition.checkMember(interaction.member as GuildMember))
            await interaction.reply("You must be a staff to do this!");
        await (interaction.channel as GuildChannel).permissionOverwrites.set(
            TicketPermissionsInfo.ClaimedTicketPermissions(
                interaction.member!.user.id,
                interaction.guild!
            )
        );
        await interaction.reply(
            `This ticket is now claimed by <@${interaction.user.id}>`
        );
    }
}
