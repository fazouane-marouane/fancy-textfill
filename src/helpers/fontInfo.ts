export interface FontInfo {
  fontFamily: string;
  lineHeightRatio: number;
  maxLineHeight: number | null;
}

export function fontInfo(element: HTMLElement): FontInfo {
  const computedStyle = window.getComputedStyle(element);
  const fontFamily = computedStyle.fontFamily!;
  const defaultLineHeightRatio = 1.25;
  const lineHeight = computedStyle.lineHeight;
  let lineHeightRatio: number = defaultLineHeightRatio
  let maxLineHeight: number | null = null;
  if (lineHeight && lineHeight !== 'normal') {
    let matchs = lineHeight.match(/^(\d+(?:.?\d+))(\w*)$/) !;
    lineHeightRatio = parseFloat(matchs[1]);
    switch (matchs[2]) {
      case '%':
        lineHeightRatio /= 100;
        break;
      case 'px':
        maxLineHeight = lineHeightRatio;
        lineHeightRatio /= parseFloat((computedStyle.fontSize || element.style.fontSize) !);
        break;
    }
  }
  else {
    lineHeightRatio = -1;
  }
  return {
    fontFamily,
    lineHeightRatio,
    maxLineHeight
  };
}
