/*
 * @Author: Just be free
 * @Date:   2020-01-16 12:49:59
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-12-16 13:40:09
 */
import Iconfont from "../iconfont";
import { defineComponent, genComponentName } from "../modules/component";
export default defineComponent({
  name: "Checkbox",
  components: { Iconfont },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    size: [String, Number],
  },
  model: {
    prop: "checked",
    event: "change",
  },
  methods: {
    handleClick() {
      this.$emit("change", !this.checked);
    },
  },
  render(h) {
    return h(
      "span",
      { class: ["yn-checkbox"], on: { click: this.handleClick } },
      [
        h(
          genComponentName("iconfont"),
          {
            props: {
              size: this.size,
              name: this.checked ? "checkbox-checked" : "checkbox-uncheck",
            },
          },
          []
        ),
      ]
    );
  },
});
