# Social Post Pack

Turn one product image and a reference scene into three ready-to-post social creatives — square, story, and wide banner. The product is composited into the scene on a canvas, and the on-image copy is generated to match by the Claude API.

## Setup

```bash
npm install
```

Create a `.env` from `.env.example` and set your `ANTHROPIC_API_KEY`.

## Commands

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run lint       # oxlint
npm run format     # format with prettier
npm run typecheck  # tsc --noEmit
```

> The `/api/analyze` route runs as a Vercel serverless function. To exercise it locally, run `vercel dev` instead of `npm run dev`.
