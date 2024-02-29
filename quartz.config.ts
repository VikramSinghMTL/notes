import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Vik's Notes",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "notes.singh.gg",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      cdnCaching: true,
      typography: {
        header: "Roboto Slab",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#dce0e8",
          lightgray: "#eff1f5",
          gray: "#bcc0cc",
          darkgray: "#4c4f69",
          dark: "#5c5f77",
          secondary: "#7287fd",
          tertiary: "#1e66f5",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#181926",
          lightgray: "#24273a",
          gray: "#494d64",
          darkgray: "#cad3f5",
          dark: "#b8c0e0",
          secondary: "#b7bdf8",
          tertiary: "#8aadf4",
          highlight: "rgba(114, 135, 253, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        // uses themes bundled with Shikiji, see https://shikiji.netlify.app/themes
        theme: {
          light: "catppuccin-latte",
          dark: "catppuccin-macchiato",
        },
        // set this to 'true' to use the background color of the Shikiji theme
        // if set to 'false', will use Quartz theme colors for background
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "relative" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
