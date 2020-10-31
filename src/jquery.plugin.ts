import { Options, fillParentContainer } from "./index";
export * from "./index";
import * as $ from "jquery";

declare global {
  interface JQuery {
    fancyTextFill(this: JQuery, opts: Options): this;
  }
}

$.fn.fancyTextFill = function (this: JQuery, opts: Options) {
  this.each(function (this: HTMLElement) {
    fillParentContainer(this, opts);
  });
  return this;
};
