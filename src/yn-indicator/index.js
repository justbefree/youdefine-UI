/*
 * @Author: Just be free
 * @Date:   2020-02-14 15:51:17
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-14 18:07:53
 * @E-mail: justbefree@126.com
 */

import { extend } from "../mixins/rendered";
// import { install } from "../modules/component";
import YnIndicator from "./yn-indicator.js";
const IndicatorConstructor = extend(YnIndicator);
let instance;
export default {
  open(options = {}) {
    if (!instance) {
      instance = new IndicatorConstructor({
        el: document.createElement("div")
      });
    }
    if (instance.visible) {
      return false;
    }
    instance.text = typeof options === "string" ? options : options.text || "";
    instance.spinType = options.spinType || "snake";
    document.body.appendChild(instance.$el);
    instance.rendered(() => {
      instance.visible = true;
    });
  },
  close() {
    if (instance) {
      instance.visible = false;
    }
  }
};
