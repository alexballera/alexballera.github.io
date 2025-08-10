# Informe Bug: Instrucción suelta `i;` en chunks Astro

## Resumen
En build SSR (astro build) con Astro 5.9.2 + Vite 6.3.5 + esbuild 0.25.0 aparecen líneas sueltas `i;` en algunos chunks generados de componentes `.astro` que usan `import.meta.glob` + filtrado + manipulación de Set. Esto produce `ReferenceError: i is not defined` durante la generación estática.

## Entorno
- Astro: 5.9.2
- Vite: 6.3.5
- esbuild: 0.25.0 (dependencia de astro)
- Node: 20.19.4 (Docker)
- SO contenedor: Debian 12

## Componentes afectados (observados)
- `src/components/blog/Tags.astro`
- `src/components/blog/Languages.astro`
- `src/components/blog/LastPost.astro` (cuando incluye reduce + Set sobre resultado filtrado)

## Patrón de código disparador (simplificado)
```astro
---
const postModules = import.meta.glob('../../pages/**/blog/posts/*.md', { eager: true });
const all = Object.values(postModules).filter(m => m && m.url && m.url.startsWith(`/${lang}/`));
// Después del build en chunk aparece una línea aislada `i;` justo tras esta sentencia.
const tagSet = new Set();
for (const post of all) {
  for (const tg of (post.frontmatter?.tags ?? [])) tagSet.add(tg);
}
---
```

## Chunk generado (extracto)
```js
const allPosts = Object.values(postModules).filter(...);
i; // <-- línea inesperada
const tagSet = new Set();
```

## Reproducción
1. Clonar repo (privado) o recrear con un componente Astro que:
   - use `import.meta.glob(..., { eager: true })`
   - aplique `Object.values(...).filter(...)` sobre el resultado
   - itere y construya un `Set`.
2. Ejecutar `astro build` (en Docker o local) → falla en generación de la página que renderiza el componente.

## Mitigación temporal
Insertar `var i;` inmediatamente después de la línea que filtra los módulos, para neutralizar la referencia.

Ejemplo:
```astro
const allPosts = Object.values(postModules).filter(...);
var i; // workaround: evita ReferenceError del `i;` suelto inyectado
```

Se añadió script `scripts/check-stray-i.js` para alertar de nuevas apariciones fuera de los componentes mitigados.

## Impacto
- Build se interrumpe impidiendo deploy.
- Sólo ocurre en build (no observado en `astro dev`).

## Hipótesis
- Eliminación (tree-shaking) parcial de variable interna generada por compilador Astro/Vite que deja statement residual.
- Posible interacción con desestructuración interna del pipeline `import.meta.glob` + hoisting de declaraciones.

## Próximos pasos sugeridos
1. Abrir issue en repositorio Astro adjuntando este informe y snippet minimal reproducible.
2. Probar actualización a futuras versiones Astro/Vite/esbuild para confirmar resolución.
3. Remover workaround y script cuando se confirme fix upstream.

## Referencias internas
- Workaround marcado con comentarios `BUG_WORKAROUND_START/END` en componentes.
- Nota añadida en `OPTIMIZATION_PLAN.md` (tabla de decisiones).

