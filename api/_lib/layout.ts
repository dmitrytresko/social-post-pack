import type { FormatLayout, ProductQuadrant, TextEdge } from './types.js';

const OPPOSED_EDGES: Record<ProductQuadrant, TextEdge[]> = {
  'top-left': ['bottom', 'right'],
  'top-right': ['bottom', 'left'],
  'bottom-left': ['top', 'right'],
  'bottom-right': ['top', 'left'],
};

const CLEAR_ZONE: Record<TextEdge, number> = {
  top: 0.34,
  bottom: 0.38,
  left: 0.42,
  right: 0.42,
};

export function normalizeLayout(layout: FormatLayout): FormatLayout {
  const allowed = OPPOSED_EDGES[layout.productQuadrant];
  if (allowed.includes(layout.textEdge)) return layout;
  return { ...layout, textEdge: allowed[0] };
}

export function clearZonePercent(edge: TextEdge): number {
  return Math.round(CLEAR_ZONE[edge] * 100);
}

export function buildSeparationHint(layout: FormatLayout): string {
  const pct = clearZonePercent(layout.textEdge);
  return `Position the product in the ${layout.productQuadrant} and keep the ${layout.textEdge} ${pct}% of the frame as open, uncluttered background for overlay text, with a clear gap between the product and that open area.`;
}
