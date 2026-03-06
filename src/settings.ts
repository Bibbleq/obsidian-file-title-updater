import { App } from "obsidian";

export enum TitleSource {
    FILENAME = "filename",
    FRONTMATTER = "frontmatter",
    HEADING = "heading",
}

export enum IllegalCharacterHandling {
    REMOVE = "remove",
    REPLACE_WITH_SPACE = "replace_with_space",
    REPLACE_WITH_DASH = "replace_with_dash",
    REPLACE_WITH_UNDERSCORE = "replace_with_underscore",
    CUSTOM = "custom",
}

export enum SyncMode {
    ALL = "all",
    FILENAME_FRONTMATTER = "filename_frontmatter",
    FILENAME_HEADING = "filename_heading",
    FRONTMATTER_HEADING = "frontmatter_heading",
}

export interface PluginSettings {
    defaultTitleSource: TitleSource;
    illegalCharHandling: IllegalCharacterHandling;
    customReplacement: string;
    updateOtherTitlesWithSanitizedVersion: boolean;
    syncMode: SyncMode;
    /**
     * Frontmatter title field configuration.
     * Options: "default" (uses "title"), "custom" (uses customFrontmatterField)
     */
    frontmatterTitleField: "default" | "custom";
    /**
     * Custom frontmatter field name for the title when frontmatterTitleField is "custom".
     * For example: "Titel", "heading", "name", etc.
     */
    customFrontmatterField: string;
    /**
     * Add old filename as an alias in frontmatter when renaming files.
     */
    addOldFilenameAsAlias: boolean;
    /**
     * Use old filename as display text for wikilinks without existing display text.
     * Only applies when addOldFilenameAsAlias is enabled.
     * When enabled, [[OldName]] becomes [[NewName|OldName]] (displays as 'OldName').
     * When disabled, [[OldName]] becomes [[NewName]] (displays as 'NewName').
     * Links with existing custom display text are always preserved regardless of this setting.
     */
    useOldFilenameAsDisplayText: boolean;
    /**
     * Notification preferences for sync operations.
     * Options: "all" (show all notifications), "errors" (errors only), "none" (no notifications)
     */
    notificationPreference: "all" | "errors" | "none";
    /**
     * Separate notification preferences for mobile devices.
     * If null, uses the same preference as desktop (notificationPreference).
     * Options: "all" (show all notifications), "errors" (errors only), "none" (no notifications)
     */
    mobileNotificationPreference: "all" | "errors" | "none" | null;
    /**
     * Automatically sync titles when switching away from a file (focus change).
     * Uses the active-leaf-change event to sync the file you were previously editing.
     * This syncs heading→filename on the file being left, complementing the manual commands.
     */
    useFocusChangeHook: boolean;
    /**
     * List of folder paths to exclude from sync operations.
     * Exact path matching. Files in these folders (and their subfolders) will be skipped.
     * One folder path per line. Example: "Templates", "Archive/Old"
     */
    excludedFolders: string[];
    /**
     * Regex patterns to match against folder paths for exclusion.
     * Files in matching folders (and their subfolders) will be skipped.
     * One pattern per line. Example: "^Templates", ".*\/archive$"
     */
    excludedFolderPatterns: string[];
    /**
     * Regex patterns to match against filenames (without extension) for exclusion.
     * Matching files will be skipped during sync operations.
     * One pattern per line. Example: "^Template -", "^_"
     */
    excludedFilePatterns: string[];
    /**
     * User-defined character remappings applied before the illegal character denylist.
     * Each entry uses the format `from >> to` (e.g., `' >> '`).
     * Allows characters with natural equivalents to be intelligently remapped rather
     * than removed. Remapped characters that are still illegal will be handled by
     * the illegalCharHandling setting.
     */
    characterRemappings: string[];
}

export const DEFAULT_SETTINGS: PluginSettings = {
    defaultTitleSource: TitleSource.FILENAME,
    illegalCharHandling: IllegalCharacterHandling.REMOVE,
    customReplacement: "",
    updateOtherTitlesWithSanitizedVersion: false,
    syncMode: SyncMode.ALL,
    frontmatterTitleField: "default",
    customFrontmatterField: "title",
    addOldFilenameAsAlias: false,
    useOldFilenameAsDisplayText: false,
    notificationPreference: "all",
    mobileNotificationPreference: null,
    useFocusChangeHook: false, // Off by default to avoid surprises
    excludedFolders: [],
    excludedFolderPatterns: [],
    excludedFilePatterns: [],
    characterRemappings: [
        "\u2018 >> '",
        "\u2019 >> '",
        '\u201C >> "',
        '\u201D >> "',
        "\u2013 >> -",
        "\u2014 >> -",
        "\u2026 >> ...",
    ],
};
