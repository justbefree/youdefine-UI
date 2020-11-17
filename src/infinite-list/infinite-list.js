/*
 * @Author: Just be free
 * @Date:   2020-11-11 10:03:24
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-11-13 14:51:49
 * @E-mail: justbefree@126.com
 */
import { defineComponent, genComponentName } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import Flex from "../flex";
import FlexItem from "../flex-item";
const VALID_CHILD_COMPONENT = "infinite-list-item";
export default defineComponent({
  name: "InfiniteList",
  props: {
    dataList: {
      type: [Array, Object],
      default: () => {
        return [];
      }
    },
    hasAnimation: {
      default: true
    }
  },
  components: { Flex, FlexItem },
  mixins: [slotsMixins],
  watch: {
    dataList: function (newValue) {
      if (newValue && newValue.length > 0) {
        this.init();
      }
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
        if (this.hasAnimation) {
          const slot = slots.shift();
          this.stackList.push(slot);
          const timer = setTimeout(() => {
            this.infinite(slots);
            clearTimeout(timer);
          }, 50);
        } else {
          slots.shift(); // 用来区分过滤
          this.stackList = slots;
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
    return h("div", { class: ["yn-infinite-list"] }, [
      h(
        genComponentName("flex"),
        { props: { flexDirection: "column" } },
        Array.apply(null, this.stackList).map((item, key) => {
          return h(genComponentName("flex-item"), { key }, [item]);
        })
      ),
    ]);
  },
});
