export const TIME_BREAKDOWN = [
  { value: '~16h', label: 'Total' },
  { value: '~6h', label: 'Hands-on' },
  { value: '~10h', label: 'AI-driven' },
];

export const TOOLSET = [
  {
    name: 'Claude Code',
    detail:
      'the agent I ran inside VS Code, did most of the implementation, refactors and debugging.',
  },
  {
    name: 'Claude Opus 4.8',
    detail: 'the model I leaned on most, with a few lighter passes on Sonnet.',
  },
  {
    name: 'Claude + Gemini 2.5 Flash Image',
    detail:
      'the two models inside the app. Claude does the creative direction and copy, Gemini generates the scenes.',
  },
  {
    name: 'React 19, Vite, TypeScript, Tailwind, TanStack Query',
    detail:
      'the stack it runs on, with oxlint and Prettier. Deployed on Vercel.',
  },
];
