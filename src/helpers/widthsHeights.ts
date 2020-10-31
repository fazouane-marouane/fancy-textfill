import { AlgorithmParameters } from './algorithmParameters';
import { getLineHeightRatio } from './lineHeight';

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d')!;
ctx.font = '10px Arial,sans-serif';

export function computeWidthHeightRatio(
  fontFamily: string,
  text: string
): number {
  ctx.font = `10px ${fontFamily}`;
  return ctx.measureText(text).width / 10;
}

export function estimateLinesCount(
  wordRatios: number[],
  args: AlgorithmParameters
): number {
  let { fontSize, maxWidth } = args;
  let currentLineWidth = 0;
  let lines = 1;
  for (let r of wordRatios) {
    let wordSize = r * fontSize;
    if (wordSize >= maxWidth - 5) {
      return -1;
    }
    if (currentLineWidth + wordSize >= maxWidth - 5) {
      lines++;
      currentLineWidth = 0;
    }
    currentLineWidth += wordSize;
  }
  return lines;
}

export function estimateHeight(
  wordRatios: number[],
  args: AlgorithmParameters
): number {
  let { fontFamily, fontSize, lineHeightRatio } = args;
  let linesCount = estimateLinesCount(wordRatios, args);
  if (lineHeightRatio < 0) {
    lineHeightRatio = getLineHeightRatio(fontFamily, fontSize);
  }
  let computedHeight = fontSize * linesCount * lineHeightRatio;
  return computedHeight;
}
