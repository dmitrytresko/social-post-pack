import type { TextColor } from '../../types/posts';
import { FONT } from '../../constants/canvas';

export function drawScrim(
  ctx: CanvasRenderingContext2D,
  textColor: TextColor,
  w: number,
  h: number,
) {
  const rgb = textColor === 'light' ? '0, 0, 0' : '255, 255, 255';
  const start = h * 0.5;
  const gradient = ctx.createLinearGradient(0, start, 0, h);
  gradient.addColorStop(0, `rgba(${rgb}, 0)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0.78)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, start, w, h - start);
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
