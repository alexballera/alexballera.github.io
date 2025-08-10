#!/usr/bin/env node

/**
 * Verifica aparición de líneas sueltas `i;` en bundles compilados que NO pertenezcan
 * a componentes donde aplicamos workaround (Tags, Languages, LastPost).
 * Falla con exit(1) si detecta patrón inesperado ⇒ ayuda a identificar regresiones
 * del bug de minificación/transpilación (Astro 5.9.2 + Vite 6.3.5 + esbuild 0.25.0).
 */
import { readFileSync, readdirSync, statSync } from 'fs';

import { join } from 'path';

const DIST = 'dist';
const allowedChunkRegex = /(Tags_|Languages_|LastPost_)/; // chunks donde ya declaramos var i;
let offending = [];

function walk(dir){
  for(const entry of readdirSync(dir)){
    const full = join(dir, entry);
    const st = statSync(full);
    if(st.isDirectory()) walk(full);
    else if(/\.mjs$/.test(entry)) checkFile(full);
  }
}

function checkFile(file){
  const txt = readFileSync(file,'utf8');
  const lines = txt.split(/\r?\n/);
  for(let idx=0; idx<lines.length; idx++){
    const line = lines[idx].trim();
    if(line === 'i;'){
      if(!allowedChunkRegex.test(file)){
        offending.push(`${file}:${idx+1}`);
      }
    }
  }
}

try {
  walk(DIST);
} catch (e) {
  console.error('[check-stray-i] No se pudo recorrer dist/:', e.message);
  process.exit(1);
}

if(offending.length){
  console.error('\n[check-stray-i] ERROR: Encontradas referencias sueltas a `i;` en archivos no permitidos:');
  offending.forEach(l => console.error(' -', l));
  console.error('\nSugerencia: añadir workaround local (var i;) o investigar transformación.');
  process.exit(1);
} else {
  console.log('[check-stray-i] OK: no se detectaron líneas sueltas i; fuera de los componentes permitidos.');
}
