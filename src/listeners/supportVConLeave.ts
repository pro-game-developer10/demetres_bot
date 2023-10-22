import { Listener } from '@sapphire/framework';
import { BaseGuildVoiceChannel, VoiceState } from 'discord.js';

export class SupportVCLeaveListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'supportVConLeave',
            once: false,
            event: "voiceStateUpdate"
        })
    }
    public async run(oldState: VoiceState, newState: VoiceState) {
        const WFSChannelNamingPattern = /📞〢Support #([0-9])+/
        const oldChannelFetched = await newState.guild.channels.fetch(oldState.channel?.id!)
        const newUserCount = (oldChannelFetched?.isVoiceBased ? oldChannelFetched.isVoiceBased() : false) ? (oldChannelFetched as BaseGuildVoiceChannel).members.size : 1
        if (WFSChannelNamingPattern.test(oldState.channel?.name!) && newUserCount == 0) oldChannelFetched?.delete("Όλοι οι χρήστες έφυγαν άπο το WFS Support κανάλι")
    }
}