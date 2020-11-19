/*
 * @Author: Just be free
 * @Date:   2020-11-11 10:27:56
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-11-19 14:11:35
 * @E-mail: justbefree@126.com
 */
import { defineComponent } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import { injectMixins } from "../mixins/inject";
export default defineComponent({
  name: "AnimationListItem",
  mixins: [slotsMixins, injectMixins("parent", { indexKey: "indexKey" })],
  props: {
    height: [String, Number],
  },
  data() {
    return {
      show: false,
      animation: true,
    };
  },
  mounted() {
    if (this.parent.animation) {
      const timer = setTimeout(() => {
        this.show = true;
        clearTimeout(timer);
      }, 1);
    }
  },
  beforeDestroy() {
    this.show = false;
  },
  render(h) {
    return h(
      "transition",
      { props: { name: this.parent.animation ? "yn-slide-in" : "" } },
      [
        h(
          "div",
          {
            directives: [
              { name: "show", value: this.show || !this.parent.animation },
            ],
            class: ["yn-animation-list-item"],
            style: { height: `${this.height}px` },
          },
          this.slots()
        ),
      ]
    );
  },
});
