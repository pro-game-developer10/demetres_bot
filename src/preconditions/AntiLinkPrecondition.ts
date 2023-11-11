import { Time } from '@sapphire/duration';
import { Precondition } from '@sapphire/framework';

import { ChatInputCommandInteraction, ContextMenuCommandInteraction, GuildMember, Message, PermissionFlagsBits } from 'discord.js';
import { MessageAdapter } from '../utils/messageAdapter';

export enum AntiLinkResults {
    PASS = "PASS",
    DEFAULT = "DEFAULT",
    DELETE = "DELETE",
    TIMEOUT_30M = "TIMEOUT_30M",
    TIMEOUT_2H = "TIMEOUT_2H",
    BAN = "BAN"
}
export class AntiLinkPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        return this.antiLinkPreconditionResults(AntiLinkPrecondition.checkMessage(message.content), message);
    }
    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        return this.antiLinkPreconditionResults(AntiLinkPrecondition.checkMessage(interaction.options.data.map(d => d.value).toString().replace(",", " ")), interaction)
    }
    public override async contextMenuRun(_interaction: ContextMenuCommandInteraction) {
        // return this.antiLinkPreconditionResults(AntiLinkPrecondition.checkMessage(interaction.options.data.map(d => d.value).toString().replace(","," ")), null)
        return this.ok()
    }
    public static checkMessage(messageContent: string): AntiLinkResults {
        let strippedMessagePieces = messageContent
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "")
            .replace("[", " ")
            .replace("]", " ")
            .replace("(", " ")
            .replace(")", " ")
            .split(" ")
        let pieceActions = strippedMessagePieces.map(piece => {
            if (piece.startsWith("tenor.com")) return AntiLinkResults.PASS
            if (piece.startsWith("cdn.discordapp.com")) return AntiLinkResults.PASS
            if (piece.startsWith("discord.com/api/v10/webhooks")) return AntiLinkResults.PASS
            if (
                piece.startsWith("instagram.com/")
                || piece.startsWith("youtube.com/")
                || piece.startsWith("twitter.com/")
                || piece.startsWith("x.com/")
                || piece.startsWith("reddit.com/")
            ) return AntiLinkResults.DELETE
            if (
                piece.startsWith("discord.gg/")
                || piece.startsWith("discord.com/invite/")
            ) return AntiLinkResults.TIMEOUT_30M
            if (piece.startsWith("discord.com/api/oauth2/authorize/")) return AntiLinkResults.TIMEOUT_2H
            return AntiLinkResults.PASS
        })
        let dominatingAction = pieceActions.reduce((prev, val) => prev > val ? prev : val)
        return dominatingAction
    }
    public static antiLinkAction(inputResults: AntiLinkResults, msg: Message | ChatInputCommandInteraction): () => Promise<MessageAdapter> {
        let errorMsg = `Anti-Link policy violation (Action: ${inputResults})`
        switch (inputResults) {
            case AntiLinkResults.PASS:
                return async () => {
                    let adaptee = new MessageAdapter(msg)
                    return adaptee
                }
            case AntiLinkResults.DEFAULT:
                return async () => {
                    let adaptee = new MessageAdapter(msg)
                    if ((adaptee.subject as ChatInputCommandInteraction).commandName) return adaptee
                    if (adaptee.user.bot) return adaptee
                    if (!adaptee.user.dmChannel) adaptee.user.createDM().then(dm => { dm.send(errorMsg) })
                    else adaptee.user.dmChannel?.send(errorMsg)
                    await adaptee.deleteReply()
                    return adaptee
                }
            case AntiLinkResults.DELETE:
                return async () => {
                    let adaptee = new MessageAdapter(msg)
                    if ((adaptee.subject as ChatInputCommandInteraction).commandName) return adaptee
                    if (adaptee.user.bot) return adaptee
                    if (!adaptee.user.dmChannel) adaptee.user.createDM().then(dm => { dm.send(errorMsg) })
                    else adaptee.user.dmChannel?.send(errorMsg)
                    await adaptee.deleteReply()
                    return adaptee
                }
            case AntiLinkResults.TIMEOUT_30M:
                return async () => {
                    let adaptee = new MessageAdapter(msg)
                    if ((adaptee.subject as ChatInputCommandInteraction).commandName) return adaptee
                    if (adaptee.user.bot) return adaptee
                    if (!adaptee.user.dmChannel) adaptee.user.createDM().then(dm => { dm.send(errorMsg) })
                    else adaptee.user.dmChannel?.send(errorMsg)
                    let member = adaptee.member as GuildMember
                    if (member.moderatable) await member.timeout(Time.Minute * 30, errorMsg)
                    await adaptee.deleteReply()
                    return adaptee
                }
            case AntiLinkResults.TIMEOUT_2H:
                return async () => {
                    let adaptee = new MessageAdapter(msg)
                    if ((adaptee.subject as ChatInputCommandInteraction).commandName) return adaptee
                    if (adaptee.user.bot) return adaptee
                    if (!adaptee.user.dmChannel) adaptee.user.createDM().then(dm => { dm.send(errorMsg) })
                    else adaptee.user.dmChannel?.send(errorMsg)
                    let member = adaptee.member as GuildMember
                    if (member.moderatable) await member.timeout(Time.Hour * 2, errorMsg)
                    await adaptee.deleteReply()
                    return adaptee
                }
            case AntiLinkResults.BAN:
                return async () => {
                    let adaptee = new MessageAdapter(msg)
                    if ((adaptee.subject as ChatInputCommandInteraction).commandName) return adaptee
                    if (adaptee.user.bot) return adaptee
                    if (!adaptee.user.dmChannel) adaptee.user.createDM().then(dm => { dm.send(errorMsg) })
                    else adaptee.user.dmChannel?.send(errorMsg)
                    let member = adaptee.member as GuildMember
                    if (member.bannable) await member.ban({ deleteMessageSeconds: Time.Minute / Time.Second * 5, reason: errorMsg })
                    await adaptee.deleteReply()
                    return adaptee
                }
        }
    }
    private antiLinkPreconditionResults(inputResults: AntiLinkResults, msg: Message | ChatInputCommandInteraction) {
        switch (inputResults) {
            case AntiLinkResults.PASS:
                return this.ok()
            default:
                if (AntiLinkPrecondition.memberShallBypass(inputResults, (msg.member as GuildMember | undefined)).canBypass) return this.ok()
                return this.error({
                    message: `Anti-Link policy violation (Action: ${inputResults})`,
                    context: {
                        action: inputResults,
                        actionExecutable: AntiLinkPrecondition.antiLinkAction(inputResults, msg)
                    }
                })
        }
    }
    public static memberShallBypass(inputResults: AntiLinkResults, member?: GuildMember | null) {
        if (!member) return { canBypass: true, result: AntiLinkResults.PASS }
        if (inputResults == AntiLinkResults.BAN) return { canBypass: false, result: inputResults }
        let perms = member.permissions
        if (perms.has(PermissionFlagsBits.BanMembers, true)) return { canBypass: true, result: AntiLinkResults.PASS }
        return { canBypass: false, result: inputResults }
    }
}
declare module '@sapphire/framework' {
    interface Preconditions {
        AntiLinkPrecondition: never
    }
}
