/*
* @Author: Just be free
* @Date:   2020-06-15 10:01:18
* @Last Modified by:   Just be free
* @Last Modified time: 2020-06-15 13:37:39
* @E-mail: justbefree@126.com
*/
import { defineComponent, genComponentName } from "../modules/component";
import Iconfont from "../iconfont";
export default defineComponent({
  name: "Counter",
  components: { Iconfont },
  props: {
    max: {
      default: Number.MAX_VALUE,
      type: [Number, String]
    },
    min: {
      default: Number.MIN_VALUE,
      type: [Number, String]
    },
    steps: {
      default: 1,
      type: [Number, String]
    },
    defaultValue: {
      default: 1,
      type: [Number, String]
    },
    parse: {
      type: Function,
      default: (e) => { return e; }
    }
  },
  initPropsToData() {
    return [{ key: "count", value: "defaultValue", parse: Number }];
  },
  methods: {
    subtract() {
      this.caculate("subtract");
    },
    add() {
      this.caculate("add");
    },
    caculate(type = "add") {
      const steps = Number(this.steps);
      if (type === "add" && this.count < Number(this.max)) {
        this.count += steps;
      } else if (type === "subtract" && this.count > Number(this.min)) {
        this.count -= steps;
      } else {
        return;
      }
      this.$emit("change", { parsedValue: this.parse(this.count), value: this.count, type });
    }
  },
  render(h) {
    if (Number(this.defaultValue) <= Number(this.max) && Number(this.defaultValue >= Number(this.min))) {
      return h("div", { class: ["yn-counter"] }, [
        h(genComponentName("iconfont"), { on: { click: this.subtract }, class: ["yn-counter-subtract"], props: { name: "iconinsurance-minus", size: 15 } }, []),
        h("span", { class: ["yn-counter-screen"] }, [this.count]),
        h(genComponentName("iconfont"), { on: { click: this.add }, class: ["yn-counter-plus"], props: { name: "iconinsurance-add", size: 15 } }, [])
      ]);
    } else {
      throw new Error("defaultValue is out of range");
    }
  }
});
