---
layout: /src/layouts/ProjectLayout.astro
title: 'rMotion-Front'
pubDate: 2025-08-10
description: 'Enterprise platform for real-time control and monitoring of autonomous industrial robot fleets (Next.js 15 + React 19 + Turbopack + Docker-First).'
languages: ["Next.js", "React", "TypeScript", "TailwindCSS", "Zustand", "React Query", "Konva", "Docker", "Turbopack"]
image:
  url: "rmotion.webp"
  alt: "rMotion-Front banner showcasing industrial robot fleet monitoring dashboard."
---

**rMotion-Front** is an enterprise web platform engineered for **real-time control, visualization and monitoring** of autonomous industrial robot fleets (collector, transporter and maintenance units). Built on **Next.js 15 (App Router + Server Components)** with a strict **Docker-First** philosophy, it prioritizes performance, scalability and operational consistency.

## 🚀 Goal
Unify robotic operations across multiple workzones providing:
- Unified supervision (state, position, activity)
- Interactive 2D visualization (Konva) of workzones and robots
- Mission / task system with real-time updates (WebSocket)
- Executive dashboard with metrics & KPIs

## 🏗️ Core Architecture
| Layer | Tech | Role |
|------|------|------|
| Framework | Next.js 15 + React 19 | Hybrid SSR + Server Components |
| UI State | Zustand | Decoupled domain stores |
| Server State | TanStack React Query | Declarative cache + invalidations |
| Realtime | WebSocket | Event streaming for robots & tasks |
| Visualization | React Konva | 2D canvas rendering |
| Charts | ApexCharts | KPIs & historical series |
| Build | Turbopack | Fast iteration + splitting |
| Infra | Docker + Makefile | Environment parity |

## 🔧 Applied Patterns
- **Feature / Domain Orientation** (`features/{robots,workzones,tasks}`)
- **Server vs Client Components** to reduce shipped JS
- **Repository pattern** in data services
- **Specialized stores** (robots, tasks, workzones, auth, theme, websocket)
- **Entity normalization** (e.g. `robotStore` transforms API payloads)

## 🤖 Main Modules
### Robots
- Incremental add/update/remove lifecycle
- Active color auto-assignment while on mission
- Enriched state + last update timestamp

### Workzones
- Interactive spatial representation (grid + elements)
- Zone-specific metric isolation

### Tasks / Missions
- Lifecycle: creation → assignment → execution → completion
- Push updates via WebSocket

### Dashboard
- Live utilization & productivity KPIs
- Deferred loading of heavy visual components

## ⚡ Optimization
- Planned dynamic imports for Konva / charts
- Selective subscription in Zustand to minimize re-renders
- Server Components to shrink hydration footprint
- Reproducible multi-stage Docker build + standalone output

## 🐳 Docker-First
All actions (install, dev, build) run inside containers:
```
make dev
make install
make prod-build
```
Guarantees dev/prod parity and eliminates local env drift.

## 🔐 Quality & Security Considerations
- Strict typing with TypeScript 5
- Sensitive env separation via `.env.*`
- Central transformation / (future) validation with Zod schemas

## 🏆 Technical Highlights
- Modular, domain-first scalable architecture
- Optimized base ready for advanced analytics & predictive systems
- Infrastructure prepared for observability (Sentry / OpenTelemetry)

## 🚀 Next Steps
- AI-driven route optimization & task assignment
- Multi-tenant organizational segmentation
- Real-time flow diagrams & predictive KPIs

---
**Image note:** Convert original `banner.png` to optimized WebP (`rmotion.webp`) and place it under `src/assets/images/projects/` to satisfy portfolio image conventions.
