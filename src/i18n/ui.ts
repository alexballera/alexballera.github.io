export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

import { common } from './segments/common';
import { hero } from './segments/hero';
import { nav } from './segments/nav';
import { site as siteSeg } from './segments/site';
import { about } from './segments/about';
import { blog } from './segments/blog';
import { contact } from './segments/contact';
import { footer } from './segments/footer';
import { lang as langSeg } from './segments/lang';
import { projects } from './segments/projects';
import { navigation } from './segments/navigation';
import { code } from './segments/code';
import { toc } from './segments/toc';
import { hobbies } from './segments/hobbies';
import { imageSeg } from './segments/image';

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
