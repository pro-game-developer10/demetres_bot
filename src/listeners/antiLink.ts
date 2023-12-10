import { Listener } from "@sapphire/framework";
import { GuildMember, Message } from "discord.js";
import {
    AntiLinkPrecondition,
    AntiLinkResults,
} from "../preconditions/AntiLinkPrecondition";

export class AntiLinkListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: "antiLink",
            once: false,
            event: "messageCreate",
        });
    }
    public async run(msg: Message) {
        const content = msg.content;
        let results = AntiLinkPrecondition.checkMessage(content);
        if (
            AntiLinkPrecondition.memberShallBypass(
                results,
                msg.member as GuildMember | undefined
            ).canBypass
        )
            results = AntiLinkResults.PASS;
        return await AntiLinkPrecondition.antiLinkAction(results, msg)();
    }
}
