/*
 * @Author: Just be free
 * @Date:   2020-01-16 12:49:59
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-01-13 17:27:38
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "checked",
    event: "change",
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit("change", !this.checked);
      }
    },
  },
  render(h) {
    const disabled = this.disabled ? "-disabled" : "";
    return h(
      "span",
      { class: ["yn-checkbox"], on: { click: this.handleClick } },
      [
        h(
          genComponentName("iconfont"),
          {
            props: {
              size: this.size,
              name: this.checked
                ? `checkbox-checked${disabled}`
                : `checkbox-uncheck${disabled}`,
            },
          },
          []
        ),
      ]
    );
  },
});
