/*
 * @Author: Just be free
 * @Date:   2020-04-21 14:19:49
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-13 09:57:20
 * @E-mail: justbefree@126.com
 */
const VALID_TAG = "yn-tab-item";

import { slotsMixins } from "../mixins/slots";
import { provideMixins } from "../mixins/provide";
import YnFlex from "../yn-flex";
import YnFlexItem from "../yn-flex-item";
export default {
  name: "YnTabs",
  components: { YnFlex, YnFlexItem },
  mixins: [slotsMixins, provideMixins()],
  props: {
    value: [Number, String]
  },
  data() {
    return {
      currentTab: this.value
    };
  },
  methods: {
    getTitles(slots = []) {
      const tabs = [];
      slots.forEach((slot, index) => {
        const { title, disabled } = slot.componentOptions.propsData;
        tabs.push({ value: title, disabled, index: index + 1 });
      });
      return tabs;
    },
    handleTabClick(tab) {
      this.$emit("click", tab);
      if (tab.disabled) {
        return false;
      }
      if (this.currentTab !== tab.index) {
        this.$emit("change", tab);
      }
      this.currentTab = tab.index;
    },
    getStatus(tab) {
      if (tab.disabled) {
        return "disabled";
      }
      if (tab.index === this.currentTab) {
        return "active";
      }
      return "";
    }
  },
  render(h) {
    const slots = this.slots("default", {}, VALID_TAG);
    const tabTitles = this.getTitles(slots);
    const flex = tabTitles.length > 4 ? "0 0 22%" : 1;
    return h("div", { class: ["yn-tabs"] }, [
      h("div", { class: ["yn-tabs-nav"] }, [
        h(
          "yn-flex",
          { style: { overflowX: "auto", userSelect: "none" } },
          Array.apply(null, tabTitles).map(tab => {
            return h(
              "yn-flex-item",
              {
                style: { textAlign: "center" },
                props: { flex },
                on: { click: this.handleTabClick.bind(this, tab) },
                key: tab.index
              },
              [
                h(
                  "span",
                  { class: ["yn-tab-text", this.getStatus(tab)] },
                  tab.value
                )
              ]
            );
          })
        )
      ]),
      h("div", { class: ["yn-tabs-content"] }, slots)
    ]);
  }
};
