var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d') !;
ctx.font = "10px Arial,sans-serif";

function computeWidthHeightRatio(text: string): number {
  return ctx.measureText(text).width / 10;
}

interface FontInfo {
  font: string;
}

function fontInfo(element: HTMLElement): FontInfo {
  let computedStyle = window.getComputedStyle(element);
  return {
    font: <string>computedStyle.fontFamily
  };
}

export interface Options {
  maxWidth: number;
  maxHeight: number;
  minFontSize: number;
  maxFontSize: number;
  multiline: boolean;
}

export function fillParentContainer(element: HTMLElement, opts: Options): void {
  let {
    minFontSize,
    maxFontSize,
    maxWidth = element.parentElement!.clientWidth,
    maxHeight = element.parentElement!.clientHeight,
    multiline = true
  } = opts;
  let text = element.textContent || '';
  let { font } = fontInfo(element);

  ctx.font = "10px " + font;
  let tokenizedText = multiline ? text.split(/(:? )/) : [text];
  let widthHeightRatios = tokenizedText.map(computeWidthHeightRatio);

  let finalSize = optimalFontSize(widthHeightRatios, maxWidth, maxHeight, maxFontSize, minFontSize);
  element.style.fontSize = finalSize + "px";
}

function optimalFontSize(wordRatios: number[], maxWidth: number, maxHeight: number, maxFontSize: number, minFontSize: number) {
  let low = minFontSize;
  let high = Math.min(maxHeight, maxFontSize, ...wordRatios.map(r => maxWidth / r));
  if (low >= high || checkConstraints(high, wordRatios, maxWidth, maxHeight)) {
    return Math.max(low, high);
  }
  while (low < high && high - low > 0.3) {
    let fontSize = (low + high) / 2;
    if (checkConstraints(fontSize, wordRatios, maxWidth, maxHeight)) {
      low = fontSize;
    }
    else {
      high = fontSize;
    }
  }
  return low;
}

function checkConstraints(fontSize: number, wordRatios: number[], maxWidth: number, maxHeight: number) {
  let height = estimateHeight(fontSize, wordRatios, maxWidth);
  return height > 0 && height + 5 < maxHeight;
}

function estimateHeight(fontSize: number, wordRatios: number[], maxWidth: number): number {
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
  let computedHeight = fontSize * lines + (fontSize > 10? 5: 8) * (lines - 1);
  return computedHeight;
}
