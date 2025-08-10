export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

import { about } from './segments/about';
import { blog } from './segments/blog';
import { code } from './segments/code';
import { common } from './segments/common';
import { contact } from './segments/contact';
import { footer } from './segments/footer';
import { hero } from './segments/hero';
import { hobbies } from './segments/hobbies';
import { imageSeg } from './segments/image';
import { lang as langSeg } from './segments/lang';
import { nav } from './segments/nav';
import { navigation } from './segments/navigation';
import { projects } from './segments/projects';
import { site as siteSeg } from './segments/site';
import { toc } from './segments/toc';

// Merged UI object (segment-first, fallback to legacy keys below during transición)
const merged = (lang: 'es' | 'en') => ({
  ...common[lang],
  ...nav[lang],
  ...hero[lang],
  ...about[lang],
  ...blog[lang],
  ...contact[lang],
  ...footer[lang],
  ...langSeg[lang],
  ...projects[lang],
  ...navigation[lang],
  ...code[lang],
  ...toc[lang],
  ...hobbies[lang],
  ...siteSeg[lang],
  ...imageSeg[lang], // objetos anidados (no strings) permanecen accesibles
});

export const ui = {
  es: {
    ...merged('es'),
  },
  en: {
    ...merged('en'),
  },
} as const;

// Tipo estricto de claves de traducción (solo strings de nivel superior actuales)
export type TranslationKey = keyof typeof ui.es & string;
