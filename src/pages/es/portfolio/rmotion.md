---
layout: /src/layouts/ProjectLayout.astro
title: 'rMotion-Front'
pubDate: 2025-08-10
description: 'Plataforma enterprise para control y monitoreo en tiempo real de flotas de robots industriales autónomos (Next.js 15 + React 19 + Turbopack + Docker-First).'
languages: ["Next.js", "React", "TypeScript", "TailwindCSS", "Zustand", "React Query", "Konva", "Docker", "Turbopack"]
image:
  url: "rmotion.webp"
  alt: "Banner de rMotion-Front mostrando interfaz de monitoreo de robots industriales en dashboard moderno."
---

**rMotion-Front** es una plataforma web enterprise diseñada para el **control, visualización y monitoreo en tiempo real** de flotas de robots industriales (recolectores, transportadores y de mantenimiento). Construida sobre **Next.js 15 (App Router + Server Components)** y un enfoque **Docker-First**, prioriza rendimiento, escalabilidad y consistencia operativa.

## 🚀 Objetivo
Centralizar la operación de robots autónomos en múltiples zonas de trabajo, ofreciendo:
- Supervisión unificada (estado, posición, actividad)
- Visualización 2D interactiva (Konva) de workzones y robots
- Sistema de tareas/misiones con actualización en tiempo real (WebSocket)
- Dashboard ejecutivo con métricas y KPIs

## 🏗️ Arquitectura Clave
| Capa | Tecnología | Rol |
|------|------------|-----|
| Framework | Next.js 15 + React 19 | SSR híbrido + Server Components |
| Estado UI | Zustand | Stores desacoplados por dominio |
| Estado servidor | TanStack React Query | Cache declarativa + invalidaciones |
| Tiempo real | WebSocket | Eventos de robots y tareas |
| Visualización | React Konva | Canvas 2D para mapas y entidades dinámicas |
| Gráficas | ApexCharts | KPIs y series históricas |
| Build | Turbopack | Iteración rápida + code splitting |
| Infra dev/prod | Docker + Makefile | Paridad total de entornos |

## 🔧 Patrones aplicados
- **Feature-Driven / Domain-Oriented** (`features/{robots,workzones,tasks}`)
- **Separación Server/Client Components** para reducir JS enviado
- **Repository pattern** en servicios de datos
- **Stores especializados** (robots, tareas, workzones, auth, theme, websocket)
- **Normalización** de entidades (`robotStore` convierte payloads API → modelo interno)

## 🤖 Módulos Principales
### Robots
- Alta, actualización incremental y remoción dinámica
- Colores activos asignados automáticamente cuando toman tareas
- Enriquecimiento de estado + timestamp de actualización

### Workzones
- Representación espacial interactiva (grid + entidades)
- Capacidad de aislar métricas por zona

### Tasks / Misiones
- Ciclo de vida: creación → asignación → ejecución → finalización
- Actualización push vía WebSocket

### Dashboard
- KPIs de utilización, productividad y actividad en vivo
- Componentes cargados de forma diferida (optimización inicial)

## ⚡ Optimización
- Carga diferida de componentes pesados (Konva / charts) planificada
- Estrategia de suscripción selectiva en stores para limitar renders
- Uso de Server Components para reducir hidratos innecesarios
- Build reproducible mediante Docker multi-stage + salida standalone

## 🐳 Enfoque Docker-First
Toda acción (instalación, desarrollo, build) se ejecuta dentro de contenedores:
```
make dev
make install
make prod-build
```
Esto evita el clásico “funciona en mi máquina” y asegura paridad dev/prod.

## 🔐 Consideraciones de Calidad y Seguridad
- Separación de variables sensibles en `.env.*`
- Tipado estricto con TypeScript 5
- Lógica de transformación y validación centralizada (Zod en esquemas futuros)

## 🏆 Logros Técnicos
- Arquitectura modular escalable orientada a dominios
- Base optimizada para incorporar analítica avanzada y predicción
- Infra lista para CI/CD layer y observabilidad (Sentry / OpenTelemetry)

## 🚀 Próximos Pasos
- IA para optimizar rutas y asignación de tareas
- Multi-tenant y segmentación organizacional
- Diagramas de flujo tiempo real + métricas predictivas

---
**Nota sobre la imagen:** Debes convertir `banner.png` del proyecto original a formato optimizado WebP (`rmotion.webp`) y ubicarlo en `src/assets/images/projects/` para que la ruta funcione (convención del portafolio).
