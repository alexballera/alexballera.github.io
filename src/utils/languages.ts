export interface Language {
  name: string;
  iconName: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  angular: {
    name: "Angular",
    iconName: "angular",
  },
  astro: {
    name: "Astro",
    iconName: "astro",
  },
  bootstrap: {
    name: "Bootstrap",
    iconName: "bootstrap",
  },
  html: {
    name: "HTML 5",
    iconName: "html",
  },
  javascript: {
    name: "JavaScript",
    iconName: "javascript",
  },
  nextjs: {
    name: "Next.js",
    iconName: "nextjs",
  },
  node: {
    name: "Node.js",
    iconName: "node",
  },
  tailwind: {
    name: "Tailwind CSS",
    iconName: "tailwind",
  },
  figma: {
    name: "Figma",
    iconName: "figma",
  },
  markdown: {
    name: "Markdown",
    iconName: "markdown",
  },
  python: {
    name: "Python",
    iconName: "python",
  },
  sass: {
    name: "Sass",
    iconName: "sass",
  },
  sql: {
    name: "SQL",
    iconName: "sql",
  },
  ts: {
    name: "TypeScript",
    iconName: "typescript",
  },
  git: {
    name: "Git",
    iconName: "git",
  },
  css: {
    name: "CSS",
    iconName: "css",
  },
  vercel: {
    name: "Vercel",
    iconName: "vercel",
  },
  gatsby: {
    name: "Gatsby",
    iconName: "gatsby",
  },
  windsurf: {
    name: "Windsurf",
    iconName: "windsurf-logo",
  },
  cursor: {
    name: "Cursor",
    iconName: "cursor-ia",
  },
  deepseek: {
    name: "DeepSeek",
    iconName: "deepseek",
  },
  copilot: {
    name: "GitHub Copilot",
    iconName: "copilot",
  },
  chatgpt: {
    name: "ChatGPT",
    iconName: "chatgpt",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 