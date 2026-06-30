# Crisis Radar VE — Frontend

Next.js frontend for the Crisis Radar VE platform.

## Quick Start

```bash
cd crisis-radar-ve-frontend
cp .env.example .env.local
# Ensure NEXT_PUBLIC_API_URL points to the backend (default: http://localhost:8000)

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
