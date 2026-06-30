# Crisis Radar VE — Frontend

Next.js frontend for the Crisis Radar VE platform.

## Quick Start

```bash
cd crisis-radar-ve-frontend
cp .env.example .env.local
# Ensure NEXT_PUBLIC_API_URL points to the backend (default: http://localhost:8000)

yarn install
yarn hot
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `yarn hot` | Levanta Next.js con hot reload (Turbopack) |
| `yarn dev` | Alias de `yarn hot` |
| `yarn build` | Build de producción |
| `yarn start` | Servir build de producción |

## Pages (stubbed for UI-first design)

| Route | Purpose |
|-------|---------|
| `/` | Landing / navigation |
| `/dashboard` | Public incident dashboard |
| `/review` | Human review queue |
| `/submit` | Submit link / text / screenshot |

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
