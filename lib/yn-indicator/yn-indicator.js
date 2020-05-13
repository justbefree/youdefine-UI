/*
 * @Author: Just be free
 * @Date:   2020-02-18 10:24:33
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 18:07:29
 */
import "./style/index.less";
import { renderedMixins } from "../mixins/rendered";
import YnSpin from "../yn-spin";
export default {
  name: "YnIndicator",
  mixins: [renderedMixins],
  props: {
    text: String,
    spinType: String
  },
  components: {
    YnSpin
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleTouchMove(e) {
      const event = e || window.event;
      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.returnValue = false;
        event.cancelBubble = true;
      }
      return false;
    }
  },
  render(h) {
    return h("transition", { props: { name: "yn-indicator" } }, [
      h(
        "div",
        {
          class: ["yn-indicator"],
          directives: [{ name: "show", value: this.visible }]
        },
        [
          h(
            "div",
            {
              class: ["yn-indicator-wrapper"],
              style: { padding: this.text ? "20px" : "15px" }
            },
            [
              h(
                "yn-spin",
                {
                  props: { size: 32, type: this.spinType, color: "#ccc" },
                  class: ["yn-indicator-spin"]
                },
                []
              ),
              h("span", {
                class: ["yn-indicator-text"],
                directives: [{ name: "show", value: this.text }],
                domProps: { innerHTML: this.text }
              })
            ]
          ),
          h(
            "div",
            {
              class: ["yn-indicator-mask"],
              on: { touchmove: this.handleTouchMove }
            },
            []
          )
        ]
      )
    ]);
  }
};
