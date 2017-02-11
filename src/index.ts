console.log('hey')
var canvas = document.createElement('canvas');
var ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

function computeWidth(height: number, text: string) {
  ctx.font = height + "px 'Source Sans Pro',Arial,sans-serif";
  return ctx.measureText(text).width;
}

interface FontInfo {
  font: string;
  size: number;
  sizeUnit: string;
}

function fontInfo(element: HTMLElement): FontInfo {
  let computedStyle = window.getComputedStyle(element);
  let fontSizeDetails = computedStyle.fontSize!.match(/(\d+)(\w+)/);
  return {
    font: <string>computedStyle.fontFamily,
    size: Number(fontSizeDetails![1]),
    sizeUnit: fontSizeDetails![2]
  };
}

export function fillParentContainer(element: HTMLElement, opts: any): void {
  let { font, size: initialSize, sizeUnit } = fontInfo(element);
  var text = element.textContent;
  // ...
  let finalSize = initialSize;
  element.style.fontSize = finalSize + sizeUnit;
}

export function dummy() {
  return 42;
}
