import type {
  FormatLayout,
  PostFormat,
  ProductQuadrant,
  TextEdge,
} from '../types/posts';

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

const STORY_CLEAR_ZONE: Record<TextEdge, number> = {
  top: 0.3,
  bottom: 0.34,
  left: 0.4,
  right: 0.4,
};

export function clearZoneFor(format: PostFormat, edge: TextEdge): number {
  return format === 'story' ? STORY_CLEAR_ZONE[edge] : CLEAR_ZONE[edge];
}

export function normalizeLayout(layout: FormatLayout): FormatLayout {
  const allowed = OPPOSED_EDGES[layout.productQuadrant];
  if (allowed.includes(layout.textEdge)) return layout;
  return { ...layout, textEdge: allowed[0] };
}
