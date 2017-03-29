import { lru_cached } from '../lru';
let invisibleElement = document.createElement('div');
invisibleElement.style.visibility = 'hidden';
invisibleElement.style.height = 'auto';
invisibleElement.style.width = 'auto';
invisibleElement.style.zIndex = "-9999";
invisibleElement.innerText = "h";

document.addEventListener('DOMContentLoaded', init);
var initialized = false;

function init() {
  if (!initialized) {
    initialized = true;
    document.body.appendChild(invisibleElement);
  }
}

const cachedGetLineHeightRatio = lru_cached(3000)((fontFamily: string, fontSize: number) => {
  init();
  invisibleElement.style.fontFamily = fontFamily;
  invisibleElement.style.fontSize = fontSize + "px";
  return invisibleElement.clientHeight / fontSize;
});

export function getLineHeightRatio(fontFamily:string,fontSize :number): number {
  return cachedGetLineHeightRatio(fontFamily, fontSize);
}
