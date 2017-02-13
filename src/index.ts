var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d') !;
ctx.font = "10px Arial,sans-serif";

function computeWidthHeightRatio(text: string): number {
  return ctx.measureText(text).width / 10;
}

interface FontInfo {
  font: string;
  lineHeightRatio: number;
  maxLineHeight: number | null;
}

function fontInfo(element: HTMLElement): FontInfo {
  let computedStyle = window.getComputedStyle(element);
  const defaultLineHeightRatio = 1.2;
  let lineHeight = computedStyle.lineHeight;
  let lineHeightRatio: number = defaultLineHeightRatio
  let maxLineHeight: number | null = null;
  if(lineHeight && lineHeight !== 'normal') {
    let matchs = lineHeight.match(/^(\d+(?:.?\d+))(\w*)$/)!;
    lineHeightRatio = parseFloat(matchs[1]);
    switch(matchs[2]) {
      case 'pt':
        lineHeightRatio /= 10;
        break;
      case '%':
        lineHeightRatio /= 100;
        break;
      case 'px':
        maxLineHeight = lineHeightRatio;
        lineHeightRatio /= parseFloat((computedStyle.fontSize || element.style.fontSize)!);
        break;
    }
  }
  return {
    font: <string>computedStyle.fontFamily,
    lineHeightRatio: lineHeightRatio,
    maxLineHeight: maxLineHeight
  };
}

export interface Options {
  maxWidth?: number;
  maxHeight?: number;
  minFontSize?: number;
  maxFontSize?: number;
  multiline?: boolean;
}

export function fillParentContainer(element: HTMLElement, opts: Options = {}): void {
  let {
    minFontSize = 4,
    maxFontSize = 40,
    maxWidth = null,
    maxHeight = null,
    multiline = true
  } = opts;
  let { font, lineHeightRatio, maxLineHeight } = fontInfo(element);
  maxWidth = maxWidth || element.parentElement!.clientWidth;
  maxHeight = maxHeight || element.parentElement!.clientHeight;
  maxFontSize = Number(maxFontSize) > 0? maxFontSize : maxHeight;
  maxLineHeight = Number(maxLineHeight) > 0? maxLineHeight : maxHeight;
  let text = element.textContent || '';

  ctx.font = "10px " + font;
  let tokenizedText = multiline ? text.split(/(:? )/) : [text];
  let widthHeightRatios = tokenizedText.map(computeWidthHeightRatio);

  let finalSize = optimalFontSize(widthHeightRatios, maxWidth, maxHeight, maxFontSize, maxLineHeight!, minFontSize, lineHeightRatio);
  element.style.fontSize = finalSize + "px";
}

function optimalFontSize(wordRatios: number[], maxWidth: number, maxHeight: number, maxFontSize: number, maxLineHeight: number, minFontSize: number, lineHeightRatio: number) {
  let low = minFontSize;
  let high = Math.min(maxHeight, maxFontSize, maxLineHeight, ...wordRatios.map(r => maxWidth / r));
  if (low >= high || checkConstraints(high, wordRatios, maxWidth, maxHeight, lineHeightRatio)) {
    return Math.max(low, high);
  }
  while (low < high && high - low > 0.3) {
    let fontSize = (low + high) / 2;
    if (checkConstraints(fontSize, wordRatios, maxWidth, maxHeight, lineHeightRatio)) {
      low = fontSize;
    }
    else {
      high = fontSize;
    }
  }
  return Math.floor(low);
}

function checkConstraints(fontSize: number, wordRatios: number[], maxWidth: number, maxHeight: number, lineHeightRatio: number) {
  let height = estimateHeight(fontSize, wordRatios, maxWidth, lineHeightRatio);
  return height > 0 && height <= maxHeight;
}

function estimateHeight(fontSize: number, wordRatios: number[], maxWidth: number, lineHeightRatio: number): number {
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
  let computedHeight = fontSize * lines * lineHeightRatio;
  return computedHeight;
}
