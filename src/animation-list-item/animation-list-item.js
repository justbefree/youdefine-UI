/*
 * @Author: Just be free
 * @Date:   2020-11-11 10:27:56
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-12-15 18:09:18
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
      entered: false,
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
  methods: {
    afterEnter() {
      this.entered = true;
    },
  },
  render(h) {
    const slots = this.slots();
    const ele = slots && slots[0] && slots[0].elm;
    const display =
      ele && window.getComputedStyle(ele, null).getPropertyValue("display");
    return (
      slots &&
      slots.length > 0 &&
      h(
        "transition",
        {
          props: { name: this.parent.animation ? "yn-slide-in" : "" },
          on: { afterEnter: this.afterEnter },
        },
        [
          h(
            "div",
            {
              directives: [
                {
                  name: "show",
                  value:
                    (this.show || !this.parent.animation) && display !== "none",
                },
              ],
              class: [
                "yn-animation-list-item",
                this.entered ? "no-animation" : "",
              ],
              style: { height: `${this.height}px` },
            },
            this.slots()
          ),
        ]
      )
    );
  },
});
