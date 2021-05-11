/*
 * @Author: Just be free
 * @Date:   2020-11-11 10:03:24
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-12-15 17:48:10
 * @E-mail: justbefree@126.com
 */
import { defineComponent, genComponentName } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import { provideMixins } from "../mixins/provide";
import Flex from "../flex";
import FlexItem from "../flex-item";
const VALID_CHILD_COMPONENT = "animation-list-item";
export default defineComponent({
  name: "AnimationList",
  mixins: [slotsMixins, provideMixins()],
  props: {
    dataList: {
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  components: { Flex, FlexItem },
  watch: {
    // dataList: function (newValue, oldValue) {
    dataList: function () {
      this.$nextTick(() => {
        this.init();
      });
    },
  },
  data() {
    return {
      stackList: [],
    };
  },
  methods: {
    infinite(slots) {
      if (slots.length > 0) {
        const slot = slots.shift();
        this.stackList.push(slot);
        if (this.animation) {
          const timer = setTimeout(() => {
            this.infinite(slots);
            clearTimeout(timer);
          }, 50);
        } else {
          this.infinite(slots);
        }
      }
    },
    getSlots() {
      const prefix = this.VUE_APP_PREFIX;
      let validChildComponent = VALID_CHILD_COMPONENT;
      if (prefix !== "") {
        validChildComponent = `${prefix}-${VALID_CHILD_COMPONENT}`;
      }
      const slots = this.slots("default", {}, validChildComponent);
      return slots;
    },
    init() {
      this.stackList = [];
      const slots = this.getSlots();
      this.infinite(slots);
    },
  },
  mounted() {
    this.init();
  },
  render(h) {
    return h("div", { class: ["yn-animation-list"] }, [
      h(
        genComponentName("flex"),
        { props: { flexDirection: "column" } },
        Array.apply(
          null,
          this.stackList
        ).map((item, key) => {
          return h(genComponentName("flex-item"), { key }, [item]);
        })
      ),
    ]);
  },
});
