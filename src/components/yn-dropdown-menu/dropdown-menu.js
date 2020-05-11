/*
 * @Author: Just be free
 * @Date:   2020-04-02 15:11:27
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-11 18:26:23
 * @E-mail: justbefree@126.com
 */

import "./style.less";
import { provideMixins } from "../mixins/provide";
const VALID_CHILD_COMPONENT = "yn-dropdown-menu-item";
import { YnFlex, YnFlexItem } from "../yn-flex";
import { slotsMixins } from "../mixins/slots";
import YnIconfont from "../yn-icon";
export default {
  name: "YnDropdownMenu",
  mixins: [slotsMixins, provideMixins()],
  components: { YnFlex, YnFlexItem, YnIconfont },
  props: {
    direction: {
      type: String,
      default: "down"
    }
  },
  data() {
    return {
      currentTab: "",
      currentTabStauts: true,
      tabs: {}
    };
  },
  methods: {
    validChildComponent() {
      const children = this.slots();
      const validComponent = [];
      let key = 0;
      children &&
        children.forEach(child => {
          if (
            child.componentOptions &&
            VALID_CHILD_COMPONENT === child.componentOptions.tag
          ) {
            child.key = key;
            validComponent.push(child);
            key++;
          }
        });
      return validComponent;
    },
    switchTo(key) {
      const slots = this.validChildComponent();
      if (key > -1) {
        this.currentTab = key;
        this.tabs = {
          ...this.tabs,
          [key]: slots[key].componentInstance.getStatus()
        };
      }
    },
    slideUp() {
      this.currentTabStauts = false;
      this.tabs = {
        ...this.tabs,
        [this.currentTab]: false
      };
    },
    handleTabSwitch(args) {
      const { item, key, slots } = args;
      const instance = item.componentInstance;
      const hasOptions = instance.hasOptions();
      const { currentTab } = this;
      const currentTabStauts = {};
      instance.toggle();
      if (currentTab !== "") {
        const status = slots[currentTab].componentInstance.getStatus();
        currentTabStauts[currentTab] = status;
      }
      this.tabs = {
        ...this.tabs,
        ...currentTabStauts,
        [key]: instance.getStatus()
      };
      this.currentTabStauts = instance.getStatus();
      if (currentTab !== key && currentTab !== "") {
        if (hasOptions) {
          slots[currentTab].componentInstance.close(this.tabs[currentTab]);
        } else {
          if (slots[currentTab].componentInstance.hasOptions()) {
            slots[currentTab].componentInstance.close(this.tabs[currentTab]);
          }
        }
      }
      this.currentTab = key;
    },
    getProperlyIcon(slideDown = false, active = false) {
      if (slideDown) {
        if (active) {
          return "iconcollapsed-selected";
        } else {
          return "iconcollapsed-default";
        }
      } else {
        if (active) {
          return "iconexpanded-selected";
        } else {
          return "iconexpanded-default";
        }
      }
    },
    createMenu(h, slots) {
      return h("div", { class: ["yn-dropdown-menu-bar"] }, [
        h(
          "yn-flex",
          { props: { justifyContent: "spaceBetween" } },
          Array.apply(null, slots).map((item, key) => {
            item.componentOptions.propsData.direction = this.direction;
            item.componentOptions.propsData.index = key;
            const mapStatus = item.componentOptions.propsData.mapStatus || {};
            const fixed = item.componentOptions.propsData.fixed || false;
            const text = item.data.model.value;
            const down = this.tabs[key];
            const directionIcon =
              item.componentOptions.propsData.hideDirectionIcon || false;
            const showDirectionIcon =
              !(Object.keys(mapStatus).length > 0) && !directionIcon;
            // const active = this.currentTab === key;
            let active = false;
            if (showDirectionIcon) {
              active = this.currentTab === key;
            } else {
              if (fixed) {
                active = this.tabs[key];
              } else {
                active = this.currentTab === key && this.currentTabStauts;
              }
            }
            return h(
              "yn-flex-item",
              {
                class: ["menu-bar-item", active ? "active" : ""],
                on: {
                  click: this.handleTabSwitch.bind(this, { item, key, slots })
                },
                props: { flex: 1 },
                key
              },
              [
                h("span", {}, text),
                h(
                  "yn-iconfont",
                  {
                    directives: [{ name: "show", value: showDirectionIcon }],
                    class: ["dropdown-icon"],
                    props: { size: 6, name: this.getProperlyIcon(down, active) }
                  },
                  []
                )
              ]
            );
          })
        )
      ]);
    },
    closeTab() {
      this.tabs = { ...this.tabs, [this.currentTab]: false };
    }
  },
  render(h) {
    const slots = this.validChildComponent();
    return h("div", { class: ["yn-dropdown-menu"] }, [
      this.createMenu(h, slots),
      slots
    ]);
  }
};
