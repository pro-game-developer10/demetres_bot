import {
    InteractionHandler,
    InteractionHandlerTypes,
    PieceContext,
} from "@sapphire/framework";
import { ButtonInteraction } from "discord.js";

export class TicketCloseHandler extends InteractionHandler {
    public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button,
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== "close_ticket") return this.none();

        return this.some();
    }

    public async run(interaction: ButtonInteraction) {
        await interaction.channel?.delete();
    }
}
