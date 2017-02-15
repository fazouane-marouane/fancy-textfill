import * as LRU from 'lru-cache'
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

let cache = LRU(3000)
export function getLineHeightRatio(fontFamily: string, fontSize: number): number {
  let key = `${fontFamily};${fontSize}`;
  let cachedValue = <number>cache.get(key);
  if (!cachedValue) {
    init();
    invisibleElement.style.fontFamily = fontFamily;
    invisibleElement.style.fontSize = fontSize + "px";
    cachedValue = invisibleElement.clientHeight / fontSize;
    cache.set(key, cachedValue);
  }
  return cachedValue;
}
