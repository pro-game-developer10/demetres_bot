import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
import { EmbedTemplate } from "../utils/embed/embedTemplates";
import { EmbedVerificationUtils } from "../utils/embed/embedVerification";
export class EmbedCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "embed",
            aliases: ["send-embed", "sendembed"],
            description: "Sends a customizable embed",
            flags: true,
            options: ["title", "description", "footer"],
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder.setName(this.name).setDescription(this.description),
            { idHints: ["1167434119148474441"] }
        );
    }
    public async messageRun(message: Message, args: Args) {
        const options: EmbedTemplate.EmbedGenOptions = {
            profile: EmbedVerificationUtils.EmbedAuthorProfile.None,
            member: message.member!,
            colorType: EmbedVerificationUtils.EmbedColorType.None,
        };
        const profileArg = await args
            .pick(
                "enum",
                EmbedVerificationUtils.getPossibleAuthorProfileValuesAsMapped()
            )
            .catch(() => "none");
        options.profile =
            EmbedVerificationUtils.verifyAuthorProfile(profileArg).profile;
        const colorArg = await args
            .pick("enum", { red: "red" })
            .catch(() => "none");
        options.colorType =
            EmbedVerificationUtils.verifyColorType(colorArg).profile;
        options.description =
            args
                .getOption("description")
                ?.replaceAll("\\n", "\n")
                .replaceAll("\\_", "+()|+")
                .replaceAll("_", " ")
                .replaceAll("+()|+", "_") ?? undefined;
        options.footer =
            args
                .getOption("footer")
                ?.replaceAll("`\\n`", "\n")
                .replaceAll("\\_", "+()|+")
                .replaceAll("_", " ")
                .replaceAll("+()|+", "_") ?? undefined;
        options.title =
            args
                .getOption("title")
                ?.replaceAll("`\\n`", "\n")
                .replaceAll("\\_", "+()|+")
                .replaceAll("_", " ")
                .replaceAll("+()|+", "_") ?? undefined;
        options.footerIcon = args.getFlags("hasFooterIcon");
        return await message.channel.send({
            embeds: [EmbedTemplate.EmbedGen(options)],
        });
    }
    // TOAD: Add slash command support
    public async chatInputRun(
        interaction: Command.ChatInputCommandInteraction
    ) {
        return await interaction.reply("Not implemented. (Yet...)");
    }
}
