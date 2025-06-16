// @ts-check
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://alexballera.com",
  base: "/",
  server: {
    host: '0.0.0.0',
    port: 4321,
    watch: {
      // Asegurar que los cambios en sistemas de archivos montados sean detectados
      usePolling: true,
      interval: 1000
    }
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [preact(), icon(), sitemap({
    filter: (page) =>
      !page.includes("/blog/tags") &&
      !page.includes("/blog/techs"),
  }),],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
  },
});