import { defaultLang, ui } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

type UILanguage = typeof ui[typeof defaultLang];
// Claves cuyo valor es string (excluye objetos anidados como 'image.portfolioTexts')
type StringKey = { [K in keyof UILanguage]: UILanguage[K] extends string ? K : never }[keyof UILanguage];

export function useTranslations(lang: keyof typeof ui) {
  return function t<K extends StringKey>(key: K): UILanguage[K] {
    return (ui[lang][key] || ui[defaultLang][key]);
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    // Since prefixDefaultLocale is true, all languages need prefix
    return `/${l}${path}`;
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/');
  const lang = parts[1];
  
  if (lang in ui) {
    return '/' + parts.slice(2).join('/');
  }
  return pathname;
}
