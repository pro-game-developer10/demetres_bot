import { Listener, container, UserError } from '@sapphire/framework';
import { Message } from 'discord.js';
import { AntiLinkPrecondition, AntiLinkResults } from '../preconditions/antiLink';

export class AntiLinkListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'antiLink',
            once: false,
            event: 'messageCreate'
        })
    }
    public async run(msg: Message) {
        const content = msg.content
        const results = AntiLinkPrecondition.checkMessage(content)
        return await AntiLinkPrecondition.antiLinkAction(results,msg)()
    }
}