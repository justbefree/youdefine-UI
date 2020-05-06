/*
 * @Author: Just be free
 * @Date:   2020-01-16 12:51:20
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 15:47:10
 */
import YnIconfont from "../../display/yn-icon";
export default {
  name: "YnRadiobox",
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
  components: {
    YnIconfont
  },
  methods: {
    handleClick() {
      this.$emit("change", !this.checked);
    }
  },
  render(h) {
    return h(
      "span",
      { class: ["yn-radiobox"], on: { click: this.handleClick } },
      [
        h(
          "yn-iconfont",
          {
            props: {
              size: this.size,
              name: this.checked ? "iconradio-on" : "iconradio-off"
            }
          },
          []
        )
      ]
    );
  }
};
