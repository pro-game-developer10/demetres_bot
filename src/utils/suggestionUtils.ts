import { Embed, EmbedBuilder, GuildMember, Message } from "discord.js"

export enum SuggestionStatus {
    Rejected = 'Απορρίφθηκε',
    Approved = 'Εγκρίθηκε',
    Pending = 'Εκκρεμεί ανασκόπηση',
    UnderReview = 'Υπό ανασκόπηση'
}
export function suggestionStatusColor(status: SuggestionStatus) {
    switch (status) {
        case SuggestionStatus.Rejected:
            return 0xff4500
        case SuggestionStatus.Approved:
            return 0x10ff45
        case SuggestionStatus.Pending:
            return 0x2a9bf2
        case SuggestionStatus.UnderReview:
            return 0xffaa00
        default:
            return 0x2a9bf2
    }
}
export function parseSuggestionStatusFromColor(embed: Embed | EmbedBuilder): SuggestionStatus {
    switch (embed.data.color) {
        case 0xff4500:
            return SuggestionStatus.Rejected
        case 0x10ff45:
            return SuggestionStatus.Approved
        case 0x2a9bf2:
            return SuggestionStatus.Pending
        case 0xffaa00:
            return SuggestionStatus.UnderReview
        default:
            return SuggestionStatus.Pending
    }
}
export async function parseMemberFromSuggestionEmbed(msg: Message): Promise<GuildMember> {
    let userID = msg.embeds[0].data.footer?.text.split(" ")[2].replaceAll("|","") ?? msg.client.user.id
    return await msg.guild?.members.fetch({ user: userID })!
}

// export const suggestionStatusesMap = () => { 
//     const map = new Map<SuggestionStatus,[string,string]>()
//     map.set(SuggestionStatus.Approved, ["approve suggestion", "approved"])
//     map.set(SuggestionStatus.UnderReview, ["put suggestion under review", "under review"])
//     map.set(SuggestionStatus.Rejected, ["reject suggestion", "rejected"])
//     return map
// }

// export const reverseSuggestionStatusesMap = () => { 
//     const map = new Map<string,[SuggestionStatus,string]>()
//     map.set("approve suggestion", [SuggestionStatus.Approved, "approved"])
//     map.set("put suggestion under review", [SuggestionStatus.UnderReview, "under review"])
//     map.set("reject suggestion", [SuggestionStatus.Rejected, "rejected"])
//     return map
// }