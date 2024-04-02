import {
  Options,
  AlgorithmParameters,
  fontInfo,
  computeWidthHeightRatio,
  estimateHeight,
} from './helpers/index';
export type { Options };

export function fillParentContainer(
  element: HTMLElement,
  opts: Options = {}
): void {
  // 1. Parse options
  let {
    minFontSize = 4,
    maxFontSize = 40,
    explicitLineHeight = false,
    maxWidth = null,
    maxHeight = null,
    multiline = true,
  } = opts;
  let { fontFamily, lineHeightRatio, maxLineHeight } = fontInfo(
    element,
    explicitLineHeight
  );
  // 2. Apply defaulting rules
  maxHeight = maxHeight || element.parentElement?.clientHeight || 0;
  maxWidth = maxWidth || element.parentElement?.clientWidth || 0;
  const algoParams: AlgorithmParameters = {
    fontFamily,
    fontSize: 0,
    lineHeightRatio,
    minFontSize,
    maxHeight,
    maxWidth,
    maxFontSize:
      maxFontSize && Number(maxFontSize) > 0 ? maxFontSize : maxHeight,
    maxLineHeight:
      maxLineHeight && Number(maxLineHeight) > 0 ? maxLineHeight : maxHeight,
  };
  // 3. tokenize text
  const text = element.textContent || '';
  const tokenizedText = multiline ? text.split(/(:? )/) : [text];
  const widthHeightRatios = tokenizedText.map(text =>
    computeWidthHeightRatio(fontFamily, text)
  );
  // 4. compute the optimal font-size
  let optimalSize = optimalFontSize(widthHeightRatios, algoParams);
  element.style.fontSize = `${optimalSize}px`;
}

function optimalFontSize(
  wordRatios: number[],
  args: AlgorithmParameters
): number {
  let { minFontSize, maxHeight, maxFontSize, maxLineHeight, maxWidth } = args;
  let low = Math.floor(minFontSize);
  let high = Math.floor(
    Math.min(
      maxHeight,
      maxFontSize,
      maxLineHeight,
      ...wordRatios.map(r => maxWidth / r)
    )
  );
  if (
    low >= high ||
    checkConstraints(wordRatios, { ...args, fontSize: high })
  ) {
    return Math.max(low, high);
  }
  while (low < high && high - low > 1) {
    const fontSize = (low + high) >>> 1;
    if (checkConstraints(wordRatios, { ...args, fontSize })) {
      low = fontSize;
    } else {
      high = fontSize;
    }
  }
  return low;
}

function checkConstraints(
  wordRatios: number[],
  args: AlgorithmParameters
): boolean {
  let { maxHeight } = args;
  let height = estimateHeight(wordRatios, args);
  return height > 0 && height <= maxHeight;
}
