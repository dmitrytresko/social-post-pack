import type { TextColor, TextEdge } from '../../types/posts';
import { SCRIM_OPACITY } from '../../constants/canvas';

export function drawSceneEdgeSoftening(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const depth = Math.min(w, h) * 0.045;
  ctx.save();

  const top = ctx.createLinearGradient(0, 0, 0, depth);
  top.addColorStop(0, 'rgba(0, 0, 0, 0.14)');
  top.addColorStop(0.45, 'rgba(0, 0, 0, 0.04)');
  top.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, w, depth);

  const bottom = ctx.createLinearGradient(0, h - depth, 0, h);
  bottom.addColorStop(0, 'rgba(0, 0, 0, 0)');
  bottom.addColorStop(0.55, 'rgba(0, 0, 0, 0.04)');
  bottom.addColorStop(1, 'rgba(0, 0, 0, 0.14)');
  ctx.fillStyle = bottom;
  ctx.fillRect(0, h - depth, w, depth);

  const side = Math.min(w * 0.035, depth);
  const left = ctx.createLinearGradient(0, 0, side, 0);
  left.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
  left.addColorStop(0.5, 'rgba(0, 0, 0, 0.03)');
  left.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = left;
  ctx.fillRect(0, 0, side, h);

  const right = ctx.createLinearGradient(w - side, 0, w, 0);
  right.addColorStop(0, 'rgba(0, 0, 0, 0)');
  right.addColorStop(0.5, 'rgba(0, 0, 0, 0.03)');
  right.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
  ctx.fillStyle = right;
  ctx.fillRect(w - side, 0, side, h);

  ctx.restore();
}

export function sampleSceneTint(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  edge: TextEdge,
  zoneFraction: number,
): string {
  const steps = 12;
  let r = 0;
  let g = 0;
  let b = 0;

  const addSample = (sx: number, sy: number) => {
    const x = Math.min(w - 1, Math.max(0, Math.floor(sx)));
    const y = Math.min(h - 1, Math.max(0, Math.floor(sy)));
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    r += pixel[0] ?? 0;
    g += pixel[1] ?? 0;
    b += pixel[2] ?? 0;
  };

  switch (edge) {
    case 'bottom': {
      const y = h * (1 - zoneFraction);
      for (let i = 0; i < steps; i++) {
        addSample((w / (steps - 1)) * i, y);
      }
      break;
    }
    case 'top': {
      const y = h * zoneFraction;
      for (let i = 0; i < steps; i++) {
        addSample((w / (steps - 1)) * i, y);
      }
      break;
    }
    case 'left': {
      const x = w * zoneFraction;
      for (let i = 0; i < steps; i++) {
        addSample(x, (h / (steps - 1)) * i);
      }
      break;
    }
    case 'right': {
      const x = w * (1 - zoneFraction);
      for (let i = 0; i < steps; i++) {
        addSample(x, (h / (steps - 1)) * i);
      }
      break;
    }
  }

  return `${Math.round(r / steps)}, ${Math.round(g / steps)}, ${Math.round(b / steps)}`;
}

export function drawEdgeScrim(
  ctx: CanvasRenderingContext2D,
  textColor: TextColor,
  w: number,
  h: number,
  edge: TextEdge,
  zoneFraction: number,
  sceneTint?: string,
) {
  const fallback = textColor === 'light' ? '0, 0, 0' : '255, 255, 255';
  const rgb = sceneTint ? blendScrimTint(sceneTint, textColor) : fallback;
  const opacity = SCRIM_OPACITY;
  const blur = Math.max(8, Math.min(w, h) * 0.016);

  ctx.save();
  ctx.filter = `blur(${blur}px)`;

  switch (edge) {
    case 'bottom': {
      const zone = h * zoneFraction;
      const feather = zone * 0.9;
      const start = h - zone - feather;
      const gradient = ctx.createLinearGradient(0, start, 0, h);
      applyTintedGradient(gradient, rgb, opacity, false);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, start, w, h - start);
      break;
    }
    case 'top': {
      const zone = h * zoneFraction;
      const feather = zone * 0.9;
      const end = zone + feather;
      const gradient = ctx.createLinearGradient(0, 0, 0, end);
      applyTintedGradient(gradient, rgb, opacity, true);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, end);
      break;
    }
    case 'left': {
      const zone = w * zoneFraction;
      const feather = zone * 0.9;
      const end = zone + feather;
      const gradient = ctx.createLinearGradient(0, 0, end, 0);
      applyTintedGradient(gradient, rgb, opacity, true);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, end, h);
      break;
    }
    case 'right': {
      const zone = w * zoneFraction;
      const feather = zone * 0.9;
      const start = w - zone - feather;
      const gradient = ctx.createLinearGradient(start, 0, w, 0);
      applyTintedGradient(gradient, rgb, opacity, false);
      ctx.fillStyle = gradient;
      ctx.fillRect(start, 0, w - start, h);
      break;
    }
  }

  ctx.restore();
}

function applyTintedGradient(
  gradient: CanvasGradient,
  rgb: string,
  opacity: number,
  solidAtStart: boolean,
) {
  const stops: [number, number][] = solidAtStart
    ? [
        [0, opacity],
        [0.2, opacity * 0.68],
        [0.42, opacity * 0.38],
        [0.62, opacity * 0.16],
        [0.82, opacity * 0.05],
        [1, 0],
      ]
    : [
        [0, 0],
        [0.18, 0],
        [0.4, opacity * 0.05],
        [0.6, opacity * 0.16],
        [0.8, opacity * 0.38],
        [1, opacity],
      ];

  for (const [pos, alpha] of stops) {
    gradient.addColorStop(pos, `rgba(${rgb}, ${alpha})`);
  }
}

function blendScrimTint(tint: string, textColor: TextColor): string {
  const parts = tint.split(',').map((part) => Number.parseInt(part.trim(), 10));
  const [r, g, b] = parts;
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return textColor === 'light' ? '0, 0, 0' : '255, 255, 255';
  }

  if (textColor === 'light') {
    return `${Math.round(r * 0.32)}, ${Math.round(g * 0.32)}, ${Math.round(b * 0.32)}`;
  }
  return `${Math.round(255 - (255 - r) * 0.32)}, ${Math.round(255 - (255 - g) * 0.32)}, ${Math.round(255 - (255 - b) * 0.32)}`;
}
