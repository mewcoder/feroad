import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "FERoad",
  description: "WEB前端进阶知识库,前端学习,前端进阶,前端面试",
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
  appearance: true,
  // base: '/feroad/',
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "FERoad",
    repo: "https://github.com/mewcoder/feroad",
    footer: {
      copyright: "Copyright © 2023 mewcoder",
    },
    nav: [
      { text: "面试指南", link: "/interview/resume" },
      { text: "前端进阶", link: "/advanced/note" },
      { text: "技术成长", link: "/grow/infra" },
      { text: "学习资源", link: "/study/book" },
      { text: "工具集合", link: "/tools/website" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/mewcoder/feroad" },
      {
        icon: {
          svg: '<svg t="1676712634709" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" width="64" height="64"><path d="M854.584889 370.602667c-9.898667-39.395556 9.927111-102.200889 73.415111-124.416l-67.896889-3.584s-25.713778-89.998222-143.616-97.991111c-117.902222-8.106667-194.986667-3.015111-194.986667-3.015112s87.409778 55.608889 52.394667 154.709334c-25.6 52.48-65.792 95.573333-108.8 144.696889a110.449778 110.449778 0 0 0-3.498667 3.697777c-142.222222 160.312889-365.596444 415.288889-365.596444 415.288889 245.902222 64.398222 410.709333-6.286222 508.188444-91.079111 20.508444-0.199111 35.896889-0.312889 46.307556-0.312889 135.793778 0 250.595556-117.589333 245.902222-248.405333-3.185778-89.884444-31.886222-110.193778-41.813333-149.617778z" fill="#B1B4BD" p-id="2968"></path></svg>',
        },
        link: "https://yuque.com/mewcoder",
      },
    ],
    sidebar: {
      "/interview/": [
        {
          text: "面试指南",
          collapsible: true,
          items: [
            { text: "面试笔记", link: "/interview/note" },
            { text: "面试题库", link: "/interview/question" },
            { text: "写好简历", link: "/interview/resume" },
            { text: "答题套路", link: "/interview/anwser" },
            { text: "面试现场", link: "/interview/interview" },
          ],
        },
        {
          text: "前端百题斩",
          collapsible: true,
          items: [
            { text: "HTML", link: "/interview/1-html" },
            { text: "CSS", link: "/interview/2-css" },
            { text: "JavaScript 基础", link: "/interview/3-js1" },
            { text: "JavaScript 高级", link: "/interview/3-js2" },
            { text: "浏览器", link: "/interview/4-browser" },
            { text: "网络", link: "/interview/5-network" },
            { text: "Vue", link: "/interview/6-vue" },
            { text: "Vue全家桶", link: "/interview/6-vue2" },
            { text: "React", link: "/interview/13-react" },
            { text: "Webpack", link: "/interview/7-webpack" },
            { text: "前端工程化", link: "/interview/8-engineering" },
            { text: "性能优化", link: "/interview/9-performance" },
            { text: "项目", link: "/interview/10-project" },
            { text: "设计", link: "/interview/14-design" },
            { text: "其他", link: "/interview/11-other" },
          ],
        },
        {
          text: "手写",
          collapsible: true,
          items: [
            { text: "打印题", link: "/interview/console" },
            { text: "算法题", link: "/interview/algorithm" },
            { text: "手写题大纲", link: "/interview/handwriting/outline" },
            { text: "JS实现篇", link: "/interview/handwriting/js" },
            { text: "基础应用篇", link: "/interview/handwriting/base" },
            { text: "综合应用篇", link: "/interview/handwriting/enhance" },
          ],
        },
      ],
      "/tools/": [
        {
          text: "",
          collapsible: true,
          items: [{ text: "在线网站", link: "/tools/website" }],
        },
      ],
      "/study/": [
        {
          text: "",
          collapsible: true,
          items: [
            { text: "好书推荐", link: "/study/book" },
            { text: "小册推荐", link: "/study/booklet" },
            { text: "免费好课", link: "/study/lesson" },
          ],
        },
      ],
      "/grow/": [
        {
          text: "职业发展",
          collapsible: true,
          items: [
            { text: "前端基建", link: "/grow/infra" },
            { text: "面试跳槽", link: "/grow/gop" },
            { text: "职业规划", link: "/grow/promotion" },
          ],
        },
        {
          text: "技术视野",
          collapsible: true,
          items: [
            { text: "前端趋势", link: "/grow/trend" },
            { text: "技术新闻", link: "/grow/news" },
          ],
        },
      ],
      "/advanced/": [
        {
          text: "",
          collapsible: true,
          items: [{ text: "笔记", link: "/advanced/note" }],
        },
      ],
    },
  },
});
