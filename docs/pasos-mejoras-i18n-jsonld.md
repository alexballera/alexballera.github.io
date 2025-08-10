# Pasos Implementación Mejoras (Temporal)

Documento temporal con checklist paso a paso. Cada paso incluye verificación de build. Al finalizar, este archivo debe eliminarse.

## Checklist General
- [ ] 1. Crear tipo estricto de claves `TranslationKey`.
- [ ] 2. Ajustar `useTranslations` para usar `TranslationKey` y añadir warnings de fallback.
- [ ] 3. Añadir JSON-LD básico (WebSite + Person) a `Layout.astro`.
- [ ] 4. Actualizar README con nota de uso preferente de Docker.
- [ ] 5. Actualizar `.github/copilot-instructions.md` con misma nota.
- [ ] 6. Ejecutar build para validar cambios.
- [ ] 7. Confirmar que script i18n sigue pasando (`npm run i18n:check` dentro del contenedor o flujo Docker equivalente).
- [ ] 8. Eliminar este documento tras revisión.

## Paso 1: Tipo de claves de traducción
Archivo: `src/i18n/ui.ts`
Acción: exportar `TranslationKey = keyof typeof ui.es & string`.
Verificación: TypeScript reconoce `t` con autocompletado.
Build: `./docker-dev.sh build`.

## Paso 2: Warnings en fallback
Archivo: `src/i18n/utils.ts`
Acción: Modificar `useTranslations` para loggear `console.warn` en DEV si falta clave.
Build: `./docker-dev.sh build`.

## Paso 3: JSON-LD
Archivo: `src/layouts/Layout.astro`
Acción: Insertar `<script type="application/ld+json">` con esquema WebSite + Person.
Build: `./docker-dev.sh build`.

## Paso 4: README
Archivo: `README.md`
Acción: Añadir nota de uso de Docker y evitar npm fuera del contenedor.
Build: `./docker-dev.sh build`.

## Paso 5: Copilot Instructions
Archivo: `.github/copilot-instructions.md`
Acción: Añadir misma nota Docker en Developer Workflows.
Build: `./docker-dev.sh build`.

## Paso 6: Build completo
Acción: Ejecutar build final + `npm run i18n:check` dentro del contenedor.
Comandos (dentro contenedor):
```
npm run build:check
```
Resultado esperado: Sin errores, `[i18n:check] OK`.

## Paso 7: Validaciones Manuales
- Ver en dev: inspeccionar `head` y confirmar JSON-LD válido (usar Rich Results Test).
- Probar traducción existente y clave inexistente para ver warning.

## Paso 8: Limpieza
Eliminar este archivo tras merge: `git rm docs/pasos-mejoras-i18n-jsonld.md`.

---
Este documento es temporal y no debe permanecer tras la verificación.
