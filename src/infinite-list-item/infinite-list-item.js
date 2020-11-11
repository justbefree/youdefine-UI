/*
 * @Author: Just be free
 * @Date:   2020-11-11 10:27:56
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-11-11 17:03:53
 * @E-mail: justbefree@126.com
 */
import { defineComponent } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
export default defineComponent({
  name: "InfiniteListItem",
  mixins: [slotsMixins],
  props: {
    height: [String, Number],
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    const timer = setTimeout(() => {
      this.show = true;
      clearTimeout(timer);
    }, 1);
  },
  beforeDestroy() {
    this.show = false;
  },
  render(h) {
    return h("transition", { props: { name: "yn-slide-in" } }, [
      h(
        "div",
        {
          directives: [{ name: "show", value: this.show }],
          class: ["yn-infinite-list-item"],
          style: { height: `${this.height}px` },
        },
        this.slots()
      ),
    ]);
  },
});
