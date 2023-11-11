import { Precondition } from '@sapphire/framework'
import { ContextMenuCommandInteraction } from 'discord.js'
import { dotenv } from '../utils/dotenv'
import { SuggestionUtils } from '../utils/suggestionUtils'

export class SuggestionEmbedPrecondition extends Precondition {
    public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
        return this.checkInteraction(interaction)
    }
    private checkInteraction(interaction: ContextMenuCommandInteraction) {
        if (
            !interaction.isMessageContextMenuCommand() ||
            interaction.channelId != dotenv("SUGGESTIONS_CHANNEL_ID") ||
            interaction.targetMessage.author.id != interaction.client.user.id
        ) return this.error({ message: "This message is not a suggestion" })
        const embed = interaction.targetMessage.embeds[0]
        const suggestionStatus = SuggestionUtils.parseSuggestionStatusFromColor(embed)
        if (this.checkStatusAndCommandMatch(suggestionStatus, interaction.commandName)) return this.error({
            message: `This suggestion is already ${this.translateSuggestionStatus(suggestionStatus)[1]}`
        })
        if (!interaction.targetMessage.editable) return this.error({
            message: `This suggestion cannot be marked as ${this.translateSuggestionStatus(suggestionStatus)[1]} by the bot because it doesn't have the appropriate permissions`
        })
        return this.ok()
    }
    private checkStatusAndCommandMatch(status: SuggestionUtils.SuggestionStatus, command: string): boolean {
        return this.translateSuggestionStatus(status)[0] == command
    }
    private translateSuggestionStatus(status: SuggestionUtils.SuggestionStatus): [string,string] {
        switch (status) {
            case SuggestionUtils.SuggestionStatus.Rejected:
                return ["reject suggestion", "rejected"]
            case SuggestionUtils.SuggestionStatus.Approved:
                return ["approve suggestion", "approved"]
            case SuggestionUtils.SuggestionStatus.Pending:
                return ["", "pending"]
            case SuggestionUtils.SuggestionStatus.UnderReview:
                return ["put suggestion under review", "put under review"]
            default:
                return ["", ("unknown" as never)]
        }
    }
}
declare module '@sapphire/framework' {
    interface Preconditions {
        SuggestionEmbedPrecondition: never
    }
}
