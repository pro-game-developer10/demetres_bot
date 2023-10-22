import { Precondition } from '@sapphire/framework'
import { ContextMenuCommandInteraction } from 'discord.js'
import { dotenv } from '../utils/dotenv'
import { parseSuggestionStatusFromColor, suggestionStatusesMap, reverseSuggestionStatusesMap } from '../utils/suggestionUtils'

export class SuggestionEmbedPrecondition extends Precondition {
    public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
        return this.checkInteraction(interaction)
    }
    private checkInteraction(interaction: ContextMenuCommandInteraction) {
        // TODO: Fix precondition
        if (
            !interaction.isMessageContextMenuCommand() ||
            interaction.channelId != dotenv("SUGGESTIONS_CHANNEL_ID") ||
            interaction.targetMessage.author.id != interaction.client.user.id
        ) return this.error({ message: "This message is not a suggestion" })
        const embed = interaction.targetMessage.embeds[0]
        const statusData = suggestionStatusesMap.get(parseSuggestionStatusFromColor(embed))!
        if (statusData[0] == interaction.commandName.toLowerCase()) return this.error({ message: `This suggestion is already ${statusData[1]}` })
        if (!interaction.targetMessage.editable) return this.error({ message: `This suggestion cannot be marked as ${reverseSuggestionStatusesMap.get(interaction.commandName.toLowerCase())![1]} by the bot because it doesn't have the appropriate permissions` })
        return this.ok()
    }
}
declare module '@sapphire/framework' {
    interface Preconditions {
        SuggestionEmbedPrecondition: never;
    }
}