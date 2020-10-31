# fancy-textfill
[![npm](https://img.shields.io/npm/v/fancy-textfill.svg)](https://www.npmjs.com/package/fancy-textfill)
[![license](https://img.shields.io/github/license/fazouane-marouane/fancy-textfill.svg)](https://github.com/fazouane-marouane/fancy-textfill/blob/master/LICENSE)

Fast implementation for resizing text to fill its container.
It computes the optimal font-size needed to match a text to specific width and height.
It's also available as a jquery plugin.

It's really fast. See for yourself. :metal: [Demo](https://fazouane-marouane.github.io/fancy-textfill/)

## Install

```bash
npm install --save fancy-textfill
# or you can use yarn (yarn add fancy-textfill)
```

## Example

```html
<!-- In case you're using it as a jquery plugin -->
<script src="jquery.min.js"></script>
<script src="https://unpkg.com/fancy-textfill/dist/fancy-text-fill.jQuery.js"></script>
<!-- Or you can use it without jquery, by using https://unpkg.com/fancy-textfill/dist/fancy-text-fill.js -->
<!-- Example setup -->
<style>
  .container {
    width: 200px;
    height: 50px;
  }
  .myText {
    display: block;
  }
</style>
<div class="container">
  <span class="myText">Hello darkness, my old friend.</span>
</div>
<div class="container">
  <span class="myText">I've come to talk with you again.</span>
</div>
```

You can either use it on bare dom elements or on jquery objects.

```js
// Without jquery
document.getElementsByClassName('myText')
  .forEach(function (el) {
    fancyTextFill.fillParentContainer(el, {
      minFontSize: 6,
      maxFontSize: 26
    });
  });
// With jquery
$('.myText').fancyTextFill({
  minFontSize: 6,
  maxFontSize: 26
});
```

You can also use it as a module. You can import it like so:

```js
// Without jquery
import { fillParentContainer } from 'fancy-textfill';
// Or const { fillParentContainer } = require('fancy-textfill');
fillParentContainer(el, {
  minFontSize: 6,
  maxFontSize: 26
});
```

```js
// as a jquery plugin
import 'fancy-textfill/es2015/jquery.plugin';
// Or require('fancy-textfill/es2015/jquery.plugin');
$('.myText').fancyTextFill({
 minFontSize: 6,
 maxFontSize: 26
});
```

## Options

| Name        | Description | Default value |
|-------------|-------------|---------------|
| minFontSize | Minimal font size (in pixels). The text will shrink up to this value. | 4 |
| maxFontSize | Maximum font size (in pixels). The text will stretch up to this value. If it is `null` or a negative number (`maxFontSize <= 0`), the text will stretch to as big as the container can accommodate. | 40 |
| maxWidth    | Explicit width to resize. Defaults to the container's width. | `null` |
| maxHeight   | Explicit height to resize. Defaults to the container's height. | `null` |
| multiline   | Will only resize to the width restraint when set to `false` | true |
| explicitLineHeight | When set to `false`, `line-height`s are assumed to be relative to the current `font-size`| `false`|

## How does it compare to...

1. [jquery-textfill](https://github.com/jquery-textfill/jquery-textfill)

> **Performance!** fancy-TextFill implements the same features while being way faster than the original jquery plugin.

2. [BigText](https://github.com/zachleat/BigText)

> BigText doesn't support multiple lines.

## Unit tests

```bash
# Run chrome driver
chromedriver --port=4444 --url-base=wd/hub
# In another console
npm run build:dev
npm run test
```

## License

This code is licensed under the _MIT License_. See file LICENSE for more details.
