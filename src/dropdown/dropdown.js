/*
 * @Author: Just be free
 * @Date:   2021-01-26 15:32:36
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-01-27 13:37:16
 * @E-mail: justbefree@126.com
 */
import { defineComponent, genComponentName } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import Popup from "../popup";
export default defineComponent({
  name: "Dropdown",
  mixins: [slotsMixins],
  components: { Popup },
  props: {
    direction: String,
  },
  data() {
    return {
      show: false,
      status: true,
    };
  },
  computed: {
    position() {
      return this.direction === "up" ? "bottom" : "top";
    },
  },
  methods: {
    toggle() {
      console.log("ddd");
      this.show = !this.show;
    },
    handleBeforeEnter() {
      this.$emit("beforeEnter");
      this.status = true;
      const target = this.slots("target");
      const dom = target[0].elm;
      const rect = dom.getBoundingClientRect();
      if (this.direction === "up") {
        this.$refs.dropdownPopup.style.bottom = `${
          window.innerHeight - rect.top
        }px`;
      } else {
        this.$refs.dropdownPopup.style.top = `${rect.bottom}px`;
      }
      console.log("beforeEnter", target[0].elm);
    },
    handleAfterEnter() {
      this.$emit("afterEnter");
    },
    handleBeforeLeave() {
      this.$emit("beforeLeave");
    },
    handleAfterLeave() {
      this.$emit("afterLeave");
      this.status = false;
    },
  },
  render(h) {
    const target = this.slots("target");
    return h("div", { class: ["yn-dropdown"] }, [
      target,
      h(
        "div",
        {
          directives: [{ name: "show", value: this.status }],
          class: [
            "yn-dropdown-popup",
            this.direction === "up" ? "top" : "bottom",
          ],
          ref: "dropdownPopup",
        },
        [
          h(
            genComponentName("popup"),
            {
              on: {
                beforeEnter: this.handleBeforeEnter,
                afterEnter: this.handleAfterEnter,
                beforeLeave: this.handleBeforeLeave,
                afterLeave: this.handleAfterLeave,
              },
              style: { position: "absolute" },
              props: {
                value: this.show,
                singleton: true,
                position: this.position,
              },
            },
            [this.slots("content")]
          ),
        ]
      ),
    ]);
  },
});
