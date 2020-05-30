/*
 * @Author: Just be free
 * @Date:   2020-04-02 15:47:54
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 18:02:13
 * @E-mail: justbefree@126.com
 */

import "./style/index.less";
import { injectMixins } from "../mixins/inject";
import { error } from "@/modules/error";
import { isPromise, isObject } from "@/modules/utils";
import { deepClone } from "@/modules/utils/deepClone";
import { slotsMixins } from "../mixins/slots";
import YnPopup from "../yn-popup";
import { YnFlex, YnFlexItem } from "../yn-flex";
import YnIconfont from "../yn-iconfont";
export default {
  name: "YnDropdownMenuItem",
  mixins: [slotsMixins, injectMixins("parent", { indexKey: "indexKey" })],
  components: { YnPopup, YnFlexItem, YnFlex, YnIconfont },
  props: {
    index: [String, Number],
    value: {
      type: [String, Number],
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    },
    options: {
      type: [Array, Object],
      default: () => {
        return [];
      }
    },
    mapStatus: {
      type: Object,
      default: () => {
        return {};
      }
    },
    direction: String,
    hideDirectionIcon: {
      type: Boolean,
      default: false
    },
    titleChangealbe: {
      type: Boolean,
      default: false
    },
    defaultSelectedIndex: {
      type: [Number, String],
      default: -1
    },
    fixed: Boolean
  },
  data() {
    const selections = Array.isArray(this.options)
      ? deepClone(this.options)
      : [];
    return {
      show: false,
      menuStatus: false,
      bodyOverflow: null,
      closingWithoutAnimation: false,
      selections,
      currentSelected: -1,
      checked: false
    };
  },
  watch: {
    options: "setSelections"
  },
  computed: {
    position() {
      return this.direction === "up" ? "bottom" : "top";
    }
  },
  methods: {
    setSelections(n) {
      if (n) {
        if (Array.isArray(n) && n.length > 0) {
          this.selections = deepClone(n);
          this.setDefault();
        }
      }
    },
    hasOptions() {
      const { options } = this;
      return (
        (isObject(options) && typeof options.action === "function") ||
        (Array.isArray(options) && options.length > 0) ||
        this.slots().length > 0
      );
    },
    setDefault() {
      const index = this.defaultSelectedIndex;
      const { selections } = this;
      if (index > -1 && selections.length && selections.length > index) {
        const option = selections[index];
        this.currentSelected = index;
        selections.splice(index, 1, {
          ...option,
          selected: true
        });
        this.$emit("input", option.value);
      }
    },
    createMask(h) {
      return h(
        "transition",
        {
          directives: [{ name: "show", value: this.show }],
          props: { name: "dropdown-fade" }
        },
        [
          h(
            "div",
            {
              class: [
                "v-yn-dropdown-menu-item-mask",
                this.direction === "up" ? "v-up" : "v-bottom"
              ]
            },
            []
          )
        ]
      );
    },
    getStatus() {
      if (this.hasOptions()) {
        return this.show;
      } else {
        return this.checked;
      }
    },
    check(selected = false) {
      if ((selected && !this.checked) || (!selected && this.checked)) {
        this.toggle();
        this.$parent.switchTo(this.index);
      }
    },
    toggle() {
      if (this.hasOptions()) {
        this.show = !this.show;
      } else {
        this.checked = !this.checked;
        const status = this.checked ? "checked" : "unchecked";
        if (this.titleChangealbe) {
          this.$emit("input", this.mapStatus[status].label);
        }
        this.$emit("change", this.mapStatus[status]);
      }
    },
    close(e = false) {
      if (e) {
        this.closingWithoutAnimation = e;
      }
      this.show = false;
    },
    closeTab() {
      this.close();
      this.$parent.closeTab();
    },
    expandDirection() {
      const parent = this.$parent.$el;
      const rect = parent.getBoundingClientRect();
      if (this.direction === "up") {
        this.$refs.menu.style.bottom = `${window.innerHeight - rect.top}px`;
      } else {
        this.$refs.menu.style.top = `${rect.bottom}px`;
      }
    },
    handleBeforeEnter() {
      this.expandDirection();
      this.menuStatus = true;
      this.$emit("beforeEnter");
    },
    handleAfterEnter() {
      this.$emit("afterEnter");
    },
    handleBeforeLeave() {
      this.$emit("beforeLeave");
      if (this.closingWithoutAnimation) {
        this.menuStatus = false;
      }
    },
    handleAfterLeave() {
      this.$emit("afterLeave");
      if (!this.closingWithoutAnimation) {
        this.menuStatus = false;
      }
    },
    handleItemClick(args) {
      const { option, key } = args;
      const { currentSelected, selections } = this;
      const { slideUp } = this.parent;
      if (key === currentSelected) {
        return false;
      }
      slideUp && typeof slideUp === "function" && slideUp();
      if (this.currentSelected > -1) {
        const currnetItem = selections[currentSelected];
        selections.splice(currentSelected, 1, {
          ...currnetItem,
          selected: false
        });
      }
      this.currentSelected = key;
      selections.splice(key, 1, { ...option, selected: true });
      this.$emit("change", option);
      if (this.titleChangealbe) {
        this.$emit("input", option.value);
      }
      this.close();
    },
    getContent(h) {
      const slots = this.slots();
      if (slots && slots.length) {
        return slots;
      } else {
        if (this.selections.length > 0) {
          return [
            h(
              "ul",
              {},
              Array.apply(null, this.selections).map((option, key) => {
                return h(
                  "li",
                  {
                    class: [option.selected ? "active" : ""],
                    on: {
                      click: this.handleItemClick.bind(this, {
                        option,
                        key
                      })
                    },
                    key
                  },
                  [
                    h("yn-flex", { justifyContent: "spaceAround" }, [
                      h("yn-flex-item", { props: { flex: 1 } }, [
                        h("span", { class: ["text"] }, option.text)
                      ]),
                      h("yn-flex-item", {}, [
                        h(
                          "yn-iconfont",
                          {
                            class: ["confirm-mark"],
                            directives: [
                              { name: "show", value: option.selected }
                            ],
                            props: { name: "iconCheckmark", size: 12 }
                          },
                          []
                        )
                      ])
                    ])
                  ]
                );
              })
            )
          ];
        }
      }
    }
  },
  mounted() {
    if (isObject(this.options) && typeof this.options.action === "function") {
      const { action, params, parse } = this.options;
      if (typeof action === "function" && typeof parse === "function") {
        // 异步处理
        const callback = action(params);
        if (isPromise(callback)) {
          callback.then(res => {
            this.selections = parse(res);
            this.setDefault();
          });
        } else {
          error("The action of options's attribute must be a Promise type!");
        }
      }
    } else {
      this.setDefault();
    }
  },
  render(h) {
    if (this.hasOptions()) {
      return h(
        "div",
        {
          ref: "menu",
          directives: [{ name: "show", value: this.menuStatus }],
          class: [
            "yn-dropdown-menu-item",
            this.direction === "up" ? "v-up" : "v-bottom",
            this.menuStatus ? "zIndex" : ""
          ]
        },
        [
          h(
            "yn-popup",
            {
              on: {
                beforeEnter: this.handleBeforeEnter,
                afterEnter: this.handleAfterEnter,
                beforeLeave: this.handleBeforeLeave,
                afterLeave: this.handleAfterLeave,
                input: this.closeTab
              },
              style: { position: "absolute" },
              props: {
                position: this.position,
                value: this.show,
                singleton: true
              }
            },
            [
              h(
                "div",
                {
                  class: ["yn-dropdown-menu-item-content"]
                },
                this.getContent(h)
              )
            ]
          )
        ]
      );
    }
  }
};