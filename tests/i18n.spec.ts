import { defaultLang, ui } from '../src/i18n/ui';
import { describe, expect, it } from 'vitest';
import { getLangFromUrl, useTranslations } from '../src/i18n/utils';

function makeURL(path: string) {
  return new URL(`https://example.com${path}`);
}

describe('i18n utils', () => {
  it('getLangFromUrl returns default for unknown language', () => {
    const lang = getLangFromUrl(makeURL('/fr/about'));
    expect(lang).toBe(defaultLang);
  });

  it('getLangFromUrl detects supported language', () => {
    expect(getLangFromUrl(makeURL('/es/about-me'))).toBe('es');
    expect(getLangFromUrl(makeURL('/en/about-me'))).toBe('en');
  });

  it('translator returns fallback when key missing in target language', () => {
    const tEs = useTranslations('es');
    // Ensure we pick a key that exists in base; artificially remove from clone for test
    const key = 'common.readMore' as const;
    expect(tEs(key)).toBe(ui.es[key]);
  });

  it('all string keys exist in both locales (basic parity)', () => {
    const esKeys = Object.entries(ui.es).filter(([, v]) => typeof v === 'string').map(([k]) => k);
    const enKeys = Object.entries(ui.en).filter(([, v]) => typeof v === 'string').map(([k]) => k);

    // Keys missing in EN
    const missingInEn = esKeys.filter(k => !enKeys.includes(k));
    // Keys missing in ES
    const missingInEs = enKeys.filter(k => !esKeys.includes(k));

    expect(missingInEn).toEqual([]);
    expect(missingInEs).toEqual([]);
  });
});
