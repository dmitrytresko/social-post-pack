# Project

A tool that turns one product image and a reference scene into three ready-to-post social creatives (square, story, wide banner). It places the product into the scene via Canvas compositing and writes the on-image copy to match, driven by the Claude API.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — oxlint check
- `npm run format` — format and fix with prettier
- `npm run typecheck` — tsc --noEmit (run before considering any task done)

## Architecture

- `src/components/` — reusable, presentational components
- `src/sections/` — section-specific components, hooks, and logic, grouped by feature
- `src/hooks/` — shared custom hooks
- `src/types/` — shared TypeScript types/interfaces
- `src/utils/` — pure utility functions, API clients

Keep feature-specific code inside its feature folder. Only promote something to `components/`, `hooks/`, or `utils/` once a second feature actually needs it — don't pre-abstract for a one-off.

## Conventions

- Functional components only, no class components
- Named exports for components and hooks (no default exports)
- Destructure props in the function signature
- Props interface named `{Component}Props`, defined in the same file unless shared
- One component per file; filename matches the component name

```tsx
// Good
export function Card({ title, onSelect }: CardProps) {
  return <div onClick={onSelect}>{title}</div>;
}
```

## Styling

- Tailwind utility classes directly in JSX — no separate CSS files unless something can't be expressed in Tailwind
- No inline `style={}` props except for truly dynamic values (computed positions, colors from data, etc.)
- Group utility classes by concern (layout → spacing → color → typography) rather than alphabetically
- Extract a component (not a CSS class) when a style combination repeats more than twice
- Use the monospace/terminal font for the app UI and Inter (sans-serif) for the generated post output — keep the two surfaces distinct

## State

- Local UI state: `useState` / `useReducer`
- No global state library unless a specific need comes up — don't introduce Redux/Zustand preemptively
- If server/API data shows up later, flag the fetching approach before defaulting to raw `useEffect` calls

## Coding Practices

- State assumptions explicitly rather than guessing silently
- If a request has more than one reasonable interpretation, say so instead of picking one quietly
- If a simpler approach exists than what was asked for, say so — push back when warranted
- Write the minimum code that solves the problem — no speculative features, no abstractions for single-use code, no configurability that wasn't requested, no error handling for scenarios that can't happen here
- Keep comments minimal — no header blocks or comments restating the code; add one only for genuinely non-obvious reasoning
- Touch only what the task requires — don't refactor or reformat adjacent code, even if you'd write it differently
- Match existing style; if you notice unrelated dead code or issues, mention them rather than fixing them inline
- Clean up only what your own change makes unused (e.g. now-unused imports)
- Turn vague tasks into checkable ones — "fix the bug" becomes "reproduce it, then confirm it's gone"; "add validation" becomes "confirm invalid inputs are rejected and valid ones aren't"
- For multi-step tasks, briefly state the plan and how each step will be checked before executing

## TypeScript & Lint

- Linting is via oxlint (not ESLint) — don't suggest ESLint plugins/configs, they won't apply here
- No `any` — use `unknown` with narrowing, or generics, instead
- No `console.log` left in committed code — `console.error`/`console.warn` only, and only for real error/warning cases
- Run `npm run lint` and `npm run typecheck` before treating a change as done

## Do Not

- Don't add new dependencies (UI libraries, state managers, routers, etc.) without flagging it first
- Don't create abstractions "for the future" — build for what the current plan needs
- Don't silently deviate from the dev plan — surface it first if something doesn't fit
