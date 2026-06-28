# Social Post Pack

Turn one product image and one or two reference scenes into three ready-to-post social creatives — square (1080×1080), story (1080×1920), and wide banner. Claude plans the layout and writes the on-image copy, Gemini 2.5 Flash Image places the product into the scene, and a Canvas pass overlays the copy and exports each creative as a PNG.

## How it works

1. **Analyze** (`/api/analyze`) — Claude reads the product and reference images and returns a plan: an image prompt, per-format copy (headline + CTA), an accent color, and where the product and text should sit.
2. **Generate** (`/api/generate`) — Gemini 2.5 Flash Image renders the scene with the product placed into it, once per aspect ratio, with a retry per format for resilience.
3. **Compose** — a Canvas layer draws the copy on top (kept off the generated image so text stays crisp) and exports a downloadable PNG.

## Setup

```bash
npm install
```

Create a `.env` from `.env.example` and set both keys:

- `ANTHROPIC_API_KEY` — analysis and copy (Claude)
- `GEMINI_API_KEY` — image generation (Gemini)

## Commands

```bash
npm run dev        # start the dev server (also serves the /api routes)
npm run build      # production build
npm run lint       # oxlint
npm run format     # format with prettier
npm run typecheck  # tsc --noEmit
```

> In development the `/api/analyze` and `/api/generate` routes run inside the Vite dev server via a small plugin, so `npm run dev` is all you need. In production the handlers in `api/` run as Vercel serverless functions.

## Tech stack

React 19, Vite, TypeScript, Tailwind, and TanStack Query on the front end; `@anthropic-ai/sdk` and `@google/genai` for the generation pipeline. Linting via oxlint, formatting via Prettier. Built to run on Vercel.
