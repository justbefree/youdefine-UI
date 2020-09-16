/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:20:36
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-09-16 15:24:16
 */
import { defineComponent } from "../modules/component";
import { warn, error } from "../modules/error";
import svgs from "./svgs";
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
  data() {
    return {
      svgPrefix: "",
      svgs
    };
  },
  methods: {
    handleClick() {
      const { name } = this.$props;
      this.$emit("click", { name });
    },
    getSvg() {
      const { name } = this.$props;
      const reg = new RegExp(`^${this.svgPrefix}`);
      const iconName = name.replace(reg, "");
      if (this.svgs) {
        if (this.svgs[iconName]) {
          return this.svgs[iconName];
        } else {
          warn(`${iconName}.svg is missing`);
        }
      } else {
        error(`You need config svgs' lib before use ${this.$options.name} component`);
      }
    }
  },
  render(h) {
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
        h("img", { attrs: { src: this.getSvg(), iconname: this.name }, class: ["yn-iconfont", `yn-iconfont-size-${this.size}`] }, [])
      ]
    );
  }
});
