import { type Options, fillParentContainer } from "./index";

export * from "./index";
import * as jQuery from "jquery";

declare global {
  interface JQuery<TElement = HTMLElement> {
    fancyTextFill(this: JQuery, opts: Options): void;
  }
}

jQuery.fn.fancyTextFill = function (this: JQuery, opts: Options) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  this.toArray().forEach((el) => fillParentContainer(el, opts));
};
