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
  // Marketing y negocios
  "Marketing Strategy": {
    name: "Marketing Strategy",
    nameEn: "Marketing Strategy",
    iconName: "marketing",
  },
  "Planificación estratégica": {
    name: "Planificación estratégica",
    nameEn: "Strategic Planning",
    iconName: "strategy",
  },
  "Financial Management": {
    name: "Gestión Financiera",
    nameEn: "Financial Management",
    iconName: "finance",
  },
  "Business Development": {
    name: "Desarrollo de Negocio",
    nameEn: "Business Development",
    iconName: "branding",
  },
  "Market Analysis": {
    name: "Análisis de Mercado",
    nameEn: "Market Analysis",
    iconName: "dashboard",
  },
  "Project Finance": {
    name: "Finanzas de Proyectos",
    nameEn: "Project Finance",
    iconName: "finance",
  },
  "Gestión de proyectos": {
    name: "Gestión de proyectos",
    nameEn: "Project Management",
    iconName: "management",
  },
  "Liderazgo estratégico": {
    name: "Liderazgo estratégico",
    nameEn: "Strategic Leadership",
    iconName: "leadership",
  },
  "Business Planning": {
    name: "Planificación de Negocios",
    nameEn: "Business Planning",
    iconName: "briefcase",
  },
  "Management": {
    name: "Gestión",
    nameEn: "Management",
    iconName: "management",
  },
  "Corporate Finance": {
    name: "Finanzas Corporativas",
    nameEn: "Corporate Finance",
    iconName: "finance",
  },
  "Puesta en marcha de empresas": {
    name: "Puesta en marcha de empresas",
    nameEn: "Startup Launch",
    iconName: "rocket",
  },
  "Plan de negocio": {
    name: "Plan de negocio",
    nameEn: "Business Plan",
    iconName: "briefcase",
  },
  "Investment Analysis": {
    name: "Análisis de Inversiones",
    nameEn: "Investment Analysis",
    iconName: "valuation",
  },
  "Business Analysis": {
    name: "Análisis de Negocio",
    nameEn: "Business Analysis",
    iconName: "dashboard",
  },
  "Entrepreneurial Finance": {
    name: "Finanzas Empresariales",
    nameEn: "Entrepreneurial Finance",
    iconName: "finance",
  },
  // Versiones cortas de tags de negocios
  "Estrategia": {
    name: "Estrategia",
    nameEn: "Strategy",
    iconName: "strategy",
  },
  "Strategy": {
    name: "Estrategia",
    nameEn: "Strategy",
    iconName: "strategy",
  },
  "Finanzas": {
    name: "Finanzas",
    nameEn: "Finance",
    iconName: "finance",
  },
  "Finance": {
    name: "Finanzas",
    nameEn: "Finance",
    iconName: "finance",
  },
  "Gerencia": {
    name: "Gerencia",
    nameEn: "Management",
    iconName: "management",
  },
  "Emprendimiento": {
    name: "Emprendimiento",
    nameEn: "Entrepreneurship",
    iconName: "rocket",
  },
};

export const getLanguage = (lang: string | undefined): Language => {
  // Manejar el caso donde lang es undefined o null
  if (!lang) {
    return {
      name: "Unknown",
      nameEn: "Unknown",
      iconName: "info"
    };
  }
  
  // Si el idioma existe, devuélvelo
  if (languages[lang]) {
    return languages[lang];
  }
  
  // Si no existe, crea un idioma genérico basado en el nombre proporcionado
  // y usa un ícono apropiado según el contexto
  let iconName = "info";
  
  // Detectar si es una habilidad de negocios o técnica
  if (lang.toLowerCase().includes("market") || 
      lang.toLowerCase().includes("business") || 
      lang.toLowerCase().includes("strateg") ||
      lang.toLowerCase().includes("finance") || 
      lang.toLowerCase().includes("management")) {
    iconName = "briefcase";
  } else if (lang.toLowerCase().includes("develop") || 
             lang.toLowerCase().includes("code") || 
             lang.toLowerCase().includes("program")) {
    iconName = "code";
  }
  
  return {
    name: lang,
    nameEn: lang,
    iconName: iconName
  };
};