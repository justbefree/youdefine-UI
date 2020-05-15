/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:20:36
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-15 10:13:49
 */
import { defineComponent } from "../modules/component";
import "./svg-iconfont";
export default defineComponent({
  name: "Iconfont",
  props: {
    name: String,
    size: {
      type: [String, Number],
      default: 28,
      require: false
    }
  },
  methods: {
    handleClick() {
      this.$emit("click", {});
    }
    // checkIfIconValidate() {
    //   window.addEventListener("DOMContentLoaded", () => {
    //     const validIcons = [];
    //     const svg = document.querySelector("svg");
    //     if (!svg) {
    //       warn("Make sure the yn-iconfont component was installed.");
    //       return false;
    //     }
    //     const symbol = svg.getElementsByTagName("symbol");
    //     if (!symbol) {
    //       warn("Make sure the yn-iconfont component was installed.");
    //       return false;
    //     }
    //     for (let key in symbol) {
    //       if (symbol[key] && symbol[key].id) {
    //         validIcons.push(symbol[key].id);
    //       }
    //     }
    //     if (validIcons.indexOf(this.name) < 0) {
    //       warn(`The icon of ${this.name} was not found.`);
    //     }
    //   });
    // }
  },
  render(h) {
    // this.checkIfIconValidate();
    return h(
      "i",
      {
        class: [
          "yn-iconfont-wrap",
          String(this.size) === "0" ? "yn-iconfont-size-0" : ""
        ],
        on: { click: this.handleClick }
      },
      [
        h(
          "svg",
          {
            attrs: { "aria-hidden": "true" },
            class: ["yn-iconfont", `yn-iconfont-size-${this.size}`]
          },
          [h("use", { attrs: { "xlink:href": `#${this.name}` } }, [])]
        )
      ]
    );
  }
});
