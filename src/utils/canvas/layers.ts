import type {
  FormatLayout,
  PostCopy,
  PostFormat,
  ProductQuadrant,
  TextColor,
  TextEdge,
} from '../../types/posts';
import { FONT, TYPOGRAPHY } from '../../constants/canvas';
import {
  clearZoneFor,
  normalizeLayout,
} from '../layout';
import {
  drawEdgeScrim,
  drawSceneEdgeSoftening,
  sampleSceneTint,
} from './scrim';
import { clamp, drawCta, fitHeadlineSize, wrapLines } from './text';

interface TextBlock {
  x: number;
  y: number;
  maxWidth: number;
}

function storyVerticalAnchor(
  quadrant: ProductQuadrant,
  edge: TextEdge,
  h: number,
  blockH: number,
  pad: number,
): number {
  const productOnTop = quadrant.startsWith('top');
  const productOnBottom = quadrant.startsWith('bottom');

  if (edge === 'left' || edge === 'right') {
    if (productOnTop) return h * 0.2 + pad;
    if (productOnBottom) return h * 0.58 - blockH / 2;
    return (h - blockH) / 2;
  }

  return (h - blockH) / 2;
}

function textBlockPosition(
  edge: TextEdge,
  w: number,
  h: number,
  blockH: number,
  pad: number,
  format: PostFormat,
  quadrant: ProductQuadrant,
): TextBlock {
  const zone = clearZoneFor(format, edge);
  const isStory = format === 'story';

  switch (edge) {
    case 'top': {
      const zoneBottom = h * zone - pad;
      const innerY = isStory ? pad * 1.2 : pad;
      return {
        x: pad,
        y:
          innerY + blockH > zoneBottom
            ? Math.max(pad, zoneBottom - blockH)
            : innerY,
        maxWidth: w - pad * 2,
      };
    }
    case 'bottom': {
      const zoneTop = h * (1 - zone);
      const y = isStory
        ? zoneTop + pad * 1.1
        : Math.max(zoneTop + pad * 0.25, h - pad - blockH);
      return { x: pad, y, maxWidth: w - pad * 2 };
    }
    case 'left': {
      const maxWidth = w * zone - pad * 1.5;
      return {
        x: pad,
        y: isStory
          ? storyVerticalAnchor(quadrant, edge, h, blockH, pad)
          : (h - blockH) / 2,
        maxWidth,
      };
    }
    case 'right': {
      const maxWidth = w * zone - pad * 1.5;
      return {
        x: w - pad - maxWidth,
        y: isStory
          ? storyVerticalAnchor(quadrant, edge, h, blockH, pad)
          : (h - blockH) / 2,
        maxWidth,
      };
    }
  }
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  scene: HTMLImageElement,
  w: number,
  h: number,
) {
  ctx.drawImage(scene, 0, 0, w, h);
  drawSceneEdgeSoftening(ctx, w, h);
}

export function drawCopy(
  ctx: CanvasRenderingContext2D,
  copy: PostCopy,
  accent: string,
  textColor: TextColor,
  w: number,
  h: number,
  format: PostFormat,
  layout: FormatLayout,
) {
  const resolved = normalizeLayout(layout);
  const type = TYPOGRAPHY[format];
  const pad = w * type.edgePad;
  const zone = clearZoneFor(format, resolved.textEdge);

  const maxWidth =
    resolved.textEdge === 'left' || resolved.textEdge === 'right'
      ? w * zone - pad * 1.5
      : w - pad * 2;

  const headline = fitHeadlineSize(
    ctx,
    copy.headline,
    maxWidth,
    type.headlineMin,
    type.headlineMax,
    type.maxHeadlineLines,
  );

  const ctaSize = clamp(
    headline * type.ctaRatio,
    type.ctaMin,
    type.ctaMax,
  );
  const lineHeight = headline * type.lineHeight;
  const headlineCtaGap = headline * 0.38;

  ctx.font = `700 ${headline}px ${FONT}`;
  const lines = wrapLines(ctx, copy.headline, maxWidth);
  const headlineH = lines.length * lineHeight;
  const ctaH = ctaSize * 1.75;
  const blockH = headlineH + headlineCtaGap + ctaH;

  const sceneTint = sampleSceneTint(ctx, w, h, resolved.textEdge, zone);
  drawEdgeScrim(ctx, textColor, w, h, resolved.textEdge, zone, sceneTint);

  const { x, y } = textBlockPosition(
    resolved.textEdge,
    w,
    h,
    blockH,
    pad,
    format,
    resolved.productQuadrant,
  );

  const fg = textColor === 'light' ? '#ffffff' : '#111111';
  ctx.font = `700 ${headline}px ${FONT}`;
  ctx.fillStyle = fg;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  let lineY = y;
  for (const line of lines) {
    ctx.fillText(line, x, lineY);
    lineY += lineHeight;
  }

  drawCta(ctx, copy.cta, x, lineY + headlineCtaGap, ctaSize, accent);
}
