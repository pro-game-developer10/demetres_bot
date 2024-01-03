/**
 * Utilities for verifying embeds
 */
export namespace EmbedVerificationUtils {
    /**
     * Every usable author profile for the /embed command
     */
    export enum EmbedAuthorProfile {
        /**
         * Profile which represents the server as the author
         */
        Official = "Official",
        /**
         * Profile which represents the user who made the embed as the author
         */
        User = "User",
        /**
         * Same as `EmbedAuthorProfile.User` but with the pfp of `EmbedProfile.Official`
         */
        UserWithOfficialPFP = "User With Official PFP",
        /**
         * No profile is associated with the embed
         */
        None = "None",
        /**
         * Profile which represents the server's staff team as the author
         */
        Team = "Official (as team)",
    }
    /**
     * Every usable color for the /embed command
     */
    export enum EmbedColorType {
        Red = 0xff0000,
        Orange = 0xff4500,
        Yellow = 0xffaa00,
        Lime = 0x10ff45,
        Blue = 0x2a9bf2,
        Purple = 0x5a3ba2,
        None = Number(null),
    }
    /**
     * Represents a result of the `verifyColorType()` function
     */
    interface ColorTypeVerificationResult {
        /**
         * Whether or not the color exists in `EmbedVerificationUtils.possibleColorTypeValues`
         */
        isValid: boolean;
        /**
         * The `EmbedColorType` associated with the provided color
         */
        profile: EmbedColorType;
    }
    export const possibleColorTypeValues = [
        "red",
        "orange",
        "yellow",
        "lime",
        "blue",
        "purple",
        "none",
    ];
    /**
     * Verifies whether or not a color is valid
     * @param colorName Color name to verify
     * @returns Whether or not the color is valid and if valid also returns the color associated with the input
     */
    export function verifyColorType(
        colorName: string
    ): ColorTypeVerificationResult {
        const result = { isValid: true, profile: EmbedColorType.None };
        switch (colorName.toLowerCase()) {
        case "red":
            result.profile = EmbedColorType.Red;
            break;
        case "orange":
            result.profile = EmbedColorType.Orange;
            break;
        case "yellow":
            result.profile = EmbedColorType.Yellow;
            break;
        case "lime":
            result.profile = EmbedColorType.Lime;
            break;
        case "blue":
            result.profile = EmbedColorType.Blue;
            break;
        case "purple":
            result.profile = EmbedColorType.Purple;
            break;
        case "none":
            result.profile = EmbedColorType.None;
            break;
        default:
            result.isValid = false;
            return result;
        }
        return result;
    }
    /**
     * Represents a result of the `verifyAuthorProfile()` function
     */
    interface AuthorProfileVerificationResult {
        /**
         * Whether or not the profile is valid
         */
        isValid: boolean;
        /**
         * The profile itself
         */
        profile: EmbedAuthorProfile;
    }
    /**
     * All the possible author profile values
     */
    export const possibleAuthorProfileValues = {
        official: [
            EmbedAuthorProfile.Official.toLowerCase(),
            "official",
            "server",
        ],
        user: [EmbedAuthorProfile.User.toLowerCase(), "user", "member", "self"],
        officialUser: [
            EmbedAuthorProfile.UserWithOfficialPFP.toLowerCase(),
            "userofficial",
            "userasofficial",
            "userwithofficialpfp",
            "officialuser",
            "memberofficial",
            "memberasofficial",
            "memberwithofficialpfp",
            "officialmember",
            "selfofficial",
            "selfasofficial",
            "selfwithofficialpfp",
            "officialself",
        ],
        none: [
            EmbedAuthorProfile.None.toLowerCase(),
            "none",
            "null",
            "default",
            "noprofile",
        ],
        officialTeam: [
            EmbedAuthorProfile.Team.toLowerCase(),
            "officialteam",
            "officialserverteam",
            "officialguildteam",
            "serverteam",
            "guildteam",
        ],
    };
    export const getPossibleAuthorProfileValuesAsMapped = () => {
        const values = Object.values(possibleAuthorProfileValues).reduce(
            (prev, val) => [...prev, ...val]
        );
        const result: { [i: string]: string } = {};
        values.forEach((value) => {
            result[value] = value;
        });
        return result;
    };
    export function verifyAuthorProfile(
        profileName: string
    ): AuthorProfileVerificationResult {
        const result = { isValid: true, profile: EmbedAuthorProfile.None };
        switch (true) {
        case possibleAuthorProfileValues.official.includes(
            profileName.toLowerCase()
        ):
            result.profile = EmbedAuthorProfile.Official;
            break;
        case possibleAuthorProfileValues.user.includes(
            profileName.toLowerCase()
        ):
            result.profile = EmbedAuthorProfile.User;
            break;
        case possibleAuthorProfileValues.officialUser.includes(
            profileName.toLowerCase()
        ):
            result.profile = EmbedAuthorProfile.UserWithOfficialPFP;
            break;
        case possibleAuthorProfileValues.none.includes(
            profileName.toLowerCase()
        ):
            result.profile = EmbedAuthorProfile.None;
            break;
        case possibleAuthorProfileValues.officialTeam.includes(
            profileName.toLowerCase()
        ):
            result.profile = EmbedAuthorProfile.Team;
            break;
        default:
            result.isValid = false;
            return result;
        }
        return result;
    }
}
