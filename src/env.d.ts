/// <reference types="astro/client" />

// Declaración auxiliar mínima (fallback) para evitar error de tipo en el linter local.
// Astro/Vite ya proveen esta firma en tiempo real; aquí sólo si no la detecta.
interface ImportMeta {
	glob?: (pattern: string, options?: { eager?: boolean }) => Record<string, unknown>;
}