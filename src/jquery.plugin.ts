import { Options, fillParentContainer } from './index';
import * as $ from 'jquery';
export * from './index';

declare global {
  interface JQuery {
    fancyTextFill(this: JQuery, opts: Options): this;
  }
}

$.fn.fancyTextFill = function(this: JQuery, opts: Options) {
  this.each(function(this: HTMLElement) {
    fillParentContainer(this, opts);
  });
  return this;
};
