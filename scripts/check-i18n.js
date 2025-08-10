#!/usr/bin/env node

/**
 * Verifica paridad de claves i18n entre idiomas.
 * Base: 'es'. Compara contra el resto (en).
 * Falla (exit 1) si:
 *  - Falta una clave en algún idioma.
 *  - Hay claves extra (opcional: sólo warn por ahora).
 */
// Intento 1: importar el TS directamente (Node 20 soporta importación de TS sólo si existe loader; normalmente fallará)
let uiModule;
try {
  uiModule = await import('../src/i18n/ui.ts');
} catch (e) {
  // Intento 2: compilar on-the-fly con esbuild si está disponible
  try {
    const { build } = await import('esbuild');
    const path = new URL('../src/i18n/ui.ts', import.meta.url).pathname;
    const result = await build({ entryPoints: [path], bundle: true, write: false, platform: 'node', format: 'esm' });
    const code = result.outputFiles[0].text;
    uiModule = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
  } catch (e2) {
    console.error('[i18n:check] No se pudo cargar ui.ts (intentos fallidos). Añade esbuild como devDependency si quieres compilación on-the-fly.');
    console.error('Error original:', e2.message);
    process.exit(1);
  }
}
const { ui, defaultLang } = uiModule;

const base = ui[defaultLang];
const langs = Object.keys(ui).filter(l => l !== defaultLang);

const missing = [];
const extra = [];

for (const k of Object.keys(base)) {
  for (const l of langs) {
    if (!(k in ui[l])) missing.push({ key: k, lang: l });
  }
}

for (const l of langs) {
  for (const k of Object.keys(ui[l])) {
    if (!(k in base)) extra.push({ key: k, lang: l });
  }
}

if (missing.length) {
  console.error('[i18n:check] FALTAN claves:');
  for (const m of missing) console.error(`  - ${m.key} (${m.lang})`);
}

if (extra.length) {
  console.warn('[i18n:check] Claves extra (OK pero revisar):');
  for (const e of extra) console.warn(`  - ${e.key} (${e.lang})`);
}

if (missing.length) {
  console.error(`\n[i18n:check] ERROR: ${missing.length} claves faltantes.`);
  process.exit(1);
}

console.log('[i18n:check] OK: paridad completa.');
