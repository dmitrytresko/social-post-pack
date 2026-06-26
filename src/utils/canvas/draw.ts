import type { Composition } from '../../types/analysis';
import type { TextRegion } from '../../types/canvas';
import { FONT } from '../../constants/canvas';

export function drawScrim(
  ctx: CanvasRenderingContext2D,
  region: TextRegion,
  textColor: Composition['textColor'],
) {
  const rgb = textColor === 'light' ? '0, 0, 0' : '255, 255, 255';
  const strong = `rgba(${rgb}, 0.78)`;
  const clear = `rgba(${rgb}, 0)`;

  const horizontal = region.scrim === 'left' || region.scrim === 'right';
  const gradient = horizontal
    ? ctx.createLinearGradient(region.x, 0, region.x + region.w, 0)
    : ctx.createLinearGradient(0, region.y, 0, region.y + region.h);

  const darkFirst = region.scrim === 'top' || region.scrim === 'right';
  gradient.addColorStop(0, darkFirst ? strong : clear);
  gradient.addColorStop(1, darkFirst ? clear : strong);

  ctx.fillStyle = gradient;
  ctx.fillRect(region.x, region.y, region.w, region.h);
}

export function drawCta(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  accent: string,
) {
  ctx.font = `600 ${size}px ${FONT}`;
  const padX = size * 0.85;
  const pillW = ctx.measureText(text).width + padX * 2;
  const pillH = size * 2;

  ctx.beginPath();
  ctx.roundRect(x, y, pillW, pillH, pillH / 2);
  ctx.fillStyle = accent;
  ctx.fill();

  ctx.fillStyle = contrastText(accent);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + padX, y + pillH / 2);
}

export function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function contrastText(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 150 ? '#111111' : '#ffffff';
}
