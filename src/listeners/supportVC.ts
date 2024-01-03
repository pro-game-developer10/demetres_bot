import { Listener } from "@sapphire/framework";
import { ChannelType, VoiceState } from "discord.js";
import {
    EmbedTemplate,
    TicketPermissionsInfo,
} from "../utils/embed/embedTemplates";
import { ConfigUtils } from "../utils/json/configUtils";

export class SupportVCListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: "supportVC",
            once: false,
            event: "voiceStateUpdate",
        });
    }
    public async run(_oldState: VoiceState, newState: VoiceState) {
        if (
            !(
                newState.channelId! ==
                ConfigUtils.findOneMentionableByFlags("channel", "WFS_CHANNEL")
                    .id
            )
        )
            return;
        const supportChannelCount = newState.guild.channels.cache.filter(
            (channel) =>
                channel.isVoiceBased() &&
                channel.parentId ==
                    ConfigUtils.findOneMentionableByFlags(
                        "channel",
                        "SUPPORT_CATEGORY"
                    ).id
        ).size;
        const supportChannel = await newState.guild?.channels.create({
            type: ChannelType.GuildVoice,
            name: `📞〢Support #${supportChannelCount}`,
            parent: ConfigUtils.findOneMentionableByFlags(
                "channel",
                "SUPPORT_CATEGORY"
            ).id,
            reason: `WFS Voice Channel που φτιάχτηκε από τον user ${newState.member?.user.username}`,
            permissionOverwrites: TicketPermissionsInfo.WFSVCChannelPermissions(
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                newState.member?.user.id!,
                newState.guild
            ),
        });
        newState.setChannel(
            supportChannel,
            `WFS Voice Channel που φτιάχτηκε από τον user ${newState.member?.user.username}`
        );
        await newState.guild?.channels
            .fetch(
                ConfigUtils.findOneMentionableByFlags("channel", "SUPPORT_LOGS")
                    .id
            )
            ?.then((channel) => {
                if (channel?.isTextBased())
                    channel.send({
                        content: `<@&${
                            ConfigUtils.findOneMentionableByFlags(
                                "channel",
                                "STAFF_ROLE"
                            ).id
                        }>`,
                        embeds: [
                            EmbedTemplate.UserSupportNeeded(
                                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                                newState.member?.user.id!,
                                supportChannel.id
                            ),
                        ],
                    });
            });
    }
}
