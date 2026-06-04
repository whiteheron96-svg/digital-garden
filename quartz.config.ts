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
        header: "Gothic A1",
        body: "Noto Sans KR",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",         // 배경: 순백
          lightgray: "#ececec",     // 경계선
          gray: "#9e9e9e",          // 흐린 텍스트 / 그래프
          darkgray: "#363636",      // 본문 텍스트
          dark: "#0f0f0f",          // 제목 / 거의 검정
          secondary: "#0f0f0f",     // 링크 / 강조: 검정
          tertiary: "#5c5c5c",      // 호버
          highlight: "rgba(0, 0, 0, 0.04)",
          textHighlight: "#00000010",
        },
        darkMode: {
          light: "#0c0c0d",         // 배경: 거의 검정
          lightgray: "#2b2b2e",     // 경계선
          gray: "#6f6f74",          // 흐린 텍스트 / 그래프
          darkgray: "#c9c9cd",      // 본문 텍스트
          dark: "#f4f4f5",          // 제목 / 거의 흰색
          secondary: "#f4f4f5",     // 링크 / 강조: 흰색
          tertiary: "#a8a8ad",      // 호버
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
