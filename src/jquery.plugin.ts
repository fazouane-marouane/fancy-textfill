import { Options, fillParentContainer} from './index'
export * from './index'
import * as $ from "jquery"

$.fn.fancyTextFill = function(opts: Options) {
  (<JQuery>this).toArray().forEach(el => fillParentContainer(el, opts));
};
