export interface Language {
  name: string;
  nameEn?: string;  // Añadimos nombre en inglés
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
  react: {
    name: "React",
    iconName: "react",
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
    className: "bg-white dark:bg-zinc-800" // Ensure proper background for contrast
  },
  docker: {
    name: "Docker",
    iconName: "docker",
    className: "bg-white dark:bg-zinc-800" // Docker icon needs proper background for contrast
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
  leadership: {
    name: "Liderazgo",
    nameEn: "Leadership",
    iconName: "leadership",
  },
  marketing: {
    name: "Marketing",
    nameEn: "Marketing", // Mismo en ambos idiomas
    iconName: "marketing",
  },
  finance: {
    name: "Finanzas",
    nameEn: "Finance",
    iconName: "finance",
  },
  strategy: {
    name: "Estrategia",
    nameEn: "Strategy",
    iconName: "strategy",
  },
  management: {
    name: "Gerencia",
    nameEn: "Management",
    iconName: "management",
  },
  branding: {
    name: "Branding",
    nameEn: "Branding", // Mismo en ambos idiomas
    iconName: "branding",
  },
  valuation: {
    name: "Valuation",
    nameEn: "Valuation", // Mismo en ambos idiomas
    iconName: "valuation",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
};