/*
 * @Author: Just be free
 * @Date:   2020-01-16 12:51:20
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-12-16 13:41:00
 */
import { defineComponent, genComponentName } from "../modules/component";
import Iconfont from "../iconfont";
export default defineComponent({
  name: "Radiobox",
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
  components: {
    Iconfont,
  },
  methods: {
    handleClick() {
      this.$emit("change", !this.checked);
    },
  },
  render(h) {
    return h(
      "span",
      { class: ["yn-radiobox"], on: { click: this.handleClick } },
      [
        h(
          genComponentName("iconfont"),
          {
            props: {
              size: this.size,
              name: this.checked ? "radio-on" : "radio-off",
            },
          },
          []
        ),
      ]
    );
  },
});
