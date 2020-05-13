/*
 * @Author: Just be free
 * @Date:   2020-01-16 12:49:59
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 17:59:10
 */
import YnIconfont from "../yn-iconfont";
import "./style/index.less";
export default {
  name: "YnCheckbox",
  components: { YnIconfont },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    size: [String, Number]
  },
  model: {
    prop: "checked",
    event: "change"
  },
  methods: {
    handleClick() {
      this.$emit("change", !this.checked);
    }
  },
  render(h) {
    return h(
      "span",
      { class: ["yn-checkbox"], on: { click: this.handleClick } },
      [
        h(
          "yn-iconfont",
          {
            props: {
              size: this.size,
              name: this.checked
                ? "iconcheckbox-checked"
                : "iconcheckbox-uncheck"
            }
          },
          []
        )
      ]
    );
  }
};
