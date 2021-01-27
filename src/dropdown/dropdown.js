/*
 * @Author: Just be free
 * @Date:   2021-01-26 15:32:36
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-01-27 12:57:31
 * @E-mail: justbefree@126.com
 */
import { defineComponent, genComponentName } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import Popup from "../popup";
export default defineComponent({
  name: "Dropdown",
  mixins: [slotsMixins],
  components: { Popup },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle() {
      console.log("ddd");
    },
  },
  render(h) {
    const target = this.slots("target");
    console.log("target", target);
    return h("div", { class: ["yn-dropdown"] }, [
      target,
      h(genComponentName("popup"), { props: { value: this.show } }, [
        this.slots("content"),
      ]),
    ]);
  },
});
