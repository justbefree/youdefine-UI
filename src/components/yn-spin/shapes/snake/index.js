/*
 * @Author: Just be free
 * @Date:   2020-02-14 17:08:59
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-02-17 16:41:47
 */
import "./style.less";
import common from "../common.js";
export default {
  name: "snake",
  mixins: [common],
  render(h) {
    return h(
      "div",
      {
        class: ["yn-spin-snake"],
        style: {
          borderBottomColor: this.spinColor,
          borderLeftColor: this.spinColor,
          borderTopColor: this.spinColor,
          width: this.spinSize,
          height: this.spinSize
        }
      },
      []
    );
  }
};
