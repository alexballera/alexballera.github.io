import { defaultLang, ui } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

type UILanguageFull = typeof ui[typeof defaultLang];
// Deriva todas las claves y luego filtra a mano: nos quedamos con aquellas cuyo valor es string en la implementación en runtime.
type AllKeys = keyof UILanguageFull;
// Para evitar el problema de distribución con objetos anidados, modelamos StringKey como AllKeys pero en tiempo de ejecución restringimos.
type StringKey = AllKeys & string;
// Eliminado tipo UILanguage concreto para evitar warning de no-unused-vars; derivamos dinámico en runtime

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: StringKey): string {
    const anyLang = ui as Record<string, any>;
    const val = anyLang[lang][key];
    if (typeof val === 'string') return val;
    const fb = anyLang[defaultLang][key];
    return typeof fb === 'string' ? fb : '';
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
