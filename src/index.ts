var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d')!;
ctx.font =  "10px 'Source Sans Pro',Arial,sans-serif";

function computeWidthHeightRatio(text: string): number {
  return ctx.measureText(text).width / 10;
}

interface FontInfo {
  font: string;
  fontSize: number;
  sizeUnit: string;
}

function fontInfo(element: HTMLElement): FontInfo {
  let computedStyle = window.getComputedStyle(element);
  let fontSizeDetails = computedStyle.fontSize!.match(/(\d+)(\w+)/);
  return {
    font: <string>computedStyle.fontFamily,
    fontSize: Number(fontSizeDetails![1]),
    sizeUnit: fontSizeDetails![2]
  };
}

export function fillParentContainer(element: HTMLElement, opts: any): void {
  let maxWidth = element.parentElement!.offsetWidth;
  let maxHeight = element.parentElement!.offsetHeight;
  let { font, fontSize: initialSize, sizeUnit } = fontInfo(element);
  let text = element.textContent || '';
  ctx.font =  "10px " + font;
  let widthHeightRatios = text.split(/(:? )/).map(computeWidthHeightRatio);
  let cumulatedSum = widthHeightRatios.reduce((acc: number[], value, idx)=> acc.concat((acc[idx - 1] || 0) + value), []);
  // ...
  let maximalHeights = cumulatedSum.map(ratioSum => maxWidth / ratioSum);
  //
  let finalSize = Math.min(maxHeight, maximalHeights[maximalHeights.length - 1]);
  element.style.fontSize = finalSize + sizeUnit;
}

export function dummy() {
  return 42;
}
