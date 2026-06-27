import { buildSeparationHint } from './layout.ts';
import type { FormatLayout, PostFormat } from './types.ts';

// shared by the claude analysis prompt and every gemini format prompt
const GLOBAL_PROMPT_RULES = `Compose one continuous, full-bleed photographic scene that fills the entire frame edge to edge — a single cohesive environment with consistent lighting and depth. Keep the product within one area of the frame and leave the opposite region as open, uncluttered background so overlay copy can be placed there afterwards; keep the product, along with its shadow, reflection, and glow, clearly clear of that open area. Render the scene only — do not draw any text, captions, or logos, since overlay copy is added after generation.`;

export const ANALYSIS_PROMPT = `You are a creative director. You are given one product image and one or two reference scene images. Plan how to place the product into the reference scene's setting and mood, then return the structured plan below.

${GLOBAL_PROMPT_RULES}

Return:
- imagePrompt: a vivid instruction for an image model. Describe one continuous, photorealistic scene that fills the whole frame, with the product placed naturally into the reference environment under matched lighting and a soft contact shadow. Describe the product and setting concretely, keep the product's real shape and label, and remove its original studio backdrop. Keep the product moderately sized — never full height or dominating the frame.
- accent: a hex color drawn from the scene for the CTA pill — saturated tones (navy, purple, green, teal, coral, gold) pair best with high-contrast labels.
- textColor: 'light' or 'dark' — whichever keeps the headline and CTA legible over the open text area.
- copies: minimal copy per format. headline is a single short punchy line (banner's is shortest); cta is 1–2 words. No hashtags or emoji.
- layouts: per-format composition for square (1080×1080), story (1080×1920), and banner (1200×675). Each format is independent — product placement does not need to match across formats; optimize each for its aspect ratio.

For each format in layouts, return:
- productQuadrant: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'. Use eye-tracking guidance — top-left is the strongest focal point, top-right gets fast scans, bottom quadrants are weaker. Choose deliberately; never default to dead center.
- textEdge: 'top' | 'bottom' | 'left' | 'right' — where overlay copy sits, always on the opposite side from the product quadrant (top-left product → bottom or right text; top-right → bottom or left; bottom-left → top or right; bottom-right → top or left). Leave a clear gap so text and product never overlap.
- productPlacement: a short concrete phrase for where and how the product sits (grounding, angle), consistent with productQuadrant.

Guidance per format:
- Story (1080×1920): place the product in the top-left or top-right and keep the opposite area open for text — ideally the lower third, or a side column aligned with the product. Keep important content within the central 1080×1420 safe zone.
- Square (1080×1080) and Banner (1200×675): balance the product and the open text area across the frame.

Keep copy lengths in mind (do not change these): story headlines 48–80px, square 60–80px, banner 72–85px.`;

const BASE_PROMPT =
  'The first image is the product to feature. The remaining image(s) are the reference scene whose setting, lighting, and mood to recreate.';

const FRAME_EXTENSION: Record<PostFormat, string> = {
  square: 'Fill the full square frame with one cohesive scene.',
  story:
    'Build a tall vertical portrait: extend the environment so the sky or ceiling continues upward and the ground or floor continues downward, filling the entire height as one seamless scene.',
  banner:
    'Build a wide horizontal landscape: extend the environment outward to the left and right, filling the entire width as one seamless scene.',
};

export function buildScenePrompt(
  format: PostFormat,
  imagePrompt: string,
  layout: FormatLayout,
): string {
  const scaleRule =
    format === 'banner'
      ? 'The product may read as a wider hero element but never spans the full frame.'
      : 'Keep the product moderately sized — roughly 25–35% of the frame height, never full height.';
  return `${BASE_PROMPT} ${FRAME_EXTENSION[format]} ${GLOBAL_PROMPT_RULES} ${imagePrompt} ${layout.productPlacement} ${buildSeparationHint(layout)} ${scaleRule} Preserve the product exactly as shown — its geometry, proportions, label, branding, colors, and materials. Do not redesign or invent any part of it. Remove the product's original studio backdrop and integrate it into the scene as if it truly belongs there: grounded with believable weight and contact, scaled naturally against nearby elements, with the scene's light wrapping its surfaces and subtle reflections of the surroundings on it — never flat or pasted on top. Treat the reference scene as creative direction, not a fixed backdrop: you may reposition, rescale, simplify, or omit its elements for a cohesive composition, and let any creatures or figures you keep feel whole and relate naturally to the product.`;
}
