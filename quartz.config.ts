import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ellie's Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-RBJ0MQ0SQ1"
    },
    locale: "en-US",
    baseUrl: "whiteheron96-svg.github.io/digital-garden",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        // Airtable 디자인 시스템 매핑 (DESIGN-airtable.md)
        lightMode: {
          light: "#ffffff",         // 배경: canvas
          lightgray: "#dddddd",     // 경계선: hairline
          gray: "#6b7078",          // 흐린 텍스트: muted
          darkgray: "#333840",      // 본문: body
          dark: "#181d26",          // 제목: ink (near-black)
          secondary: "#1b61c9",     // 링크 / 강조: link blue
          tertiary: "#1a3866",      // 호버: link-active
          highlight: "rgba(24, 29, 38, 0.04)",
          textHighlight: "#181d2610",
        },
        darkMode: {
          light: "#0f1115",         // 배경
          lightgray: "#262a31",     // 경계선
          gray: "#8a9099",          // 흐린 텍스트
          darkgray: "#c9ccd2",      // 본문
          dark: "#f2f3f5",          // 제목
          secondary: "#6ea8ff",     // 링크 / 강조
          tertiary: "#a9c9ff",      // 호버
          highlight: "rgba(255, 255, 255, 0.05)",
          textHighlight: "#ffffff14",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
