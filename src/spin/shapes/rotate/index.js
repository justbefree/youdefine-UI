/*
* @Author: Just be free
* @Date:   2020-05-28 11:43:13
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-28 11:50:22
* @E-mail: justbefree@126.com
*/
import "./style.less";
import common from "../common.js";
const loadingSvg = require("./image/loading.svg");
export default {
  name: "rotate",
  mixins: [common],
  render(h) {
    return h(
      "div",
      {
        class: ["yn-spin-rotate"],
        style: {
          borderBottomColor: this.spinColor,
          borderLeftColor: this.spinColor,
          borderTopColor: this.spinColor,
          width: this.spinSize,
          height: this.spinSize
        }
      },
      [h("img", { attrs: { src: loadingSvg } }, [])]
    );
  }
};
