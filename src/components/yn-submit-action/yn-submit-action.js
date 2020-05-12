/*
 * @Author: Just be free
 * @Date:   2020-04-24 12:04:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 16:17:05
 * @E-mail: justbefree@126.com
 */
import "./style.less";
import { slotsMixins } from "../mixins/slots";
import { YnFlex, YnFlexItem } from "../yn-flex";
import YnButton from "../yn-button";
import YnPopup from "../yn-popup";
import YnIconfont from "../yn-iconfont";
const VALIDE_POPUP_CONTENT_COMPONENT = "yn-submit-action-popup-content";
const VALIDE_VALUE_COMPONENT = "yn-submit-action-value";
export default {
  name: "YnSubmitAction",
  mixins: [slotsMixins],
  components: { YnFlex, YnFlexItem, YnPopup, YnButton, YnIconfont },
  props: {
    submitText: {
      type: String,
      default: "提交"
    },
    label: {
      type: String,
      default: "总计:"
    },
    value: {
      type: String,
      default: "0"
    },
    currencySymbol: {
      type: String,
      default: "&yen;"
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    fixed: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPopup: false,
      popupStatus: false,
      submitStatus: "resolved"
    };
  },
  methods: {
    submit() {
      if (this.popupStatus) {
        this.submitStatus = "pendding";
        this.toggle();
      } else {
        this.$emit("submit");
      }
    },
    toggle() {
      this.showPopup = !this.showPopup;
    },
    view() {
      this.showPopup = true;
    },
    setActionPopupStyle() {
      const rect = this.$el.getBoundingClientRect();
      this.$refs.actionPopup.style.bottom = `${window.innerHeight -
        rect.top}px`;
    },
    handleBeforeEnter() {
      this.$emit("beforeEnter");
      this.popupStatus = true;
      this.setActionPopupStyle();
    },
    handleAfterLeave() {
      this.popupStatus = false;
      this.$emit("afterLeave");
      if (this.submitStatus === "pendding") {
        this.$emit("submit");
        this.submitStatus = "resolved";
      }
    },
    getValideContent(type, slots = []) {
      const validComponent = [];
      let valideName;
      if (type === "value") {
        valideName = VALIDE_VALUE_COMPONENT;
      } else if (type === "content") {
        valideName = VALIDE_POPUP_CONTENT_COMPONENT;
      }
      slots &&
        slots.forEach(child => {
          if (
            child.componentOptions &&
            valideName === child.componentOptions.tag
          ) {
            validComponent.push(child);
          }
        });
      return validComponent;
    },
    genValue(h, slots) {
      const value = this.getValideContent("value", slots);
      if (value.length > 0) {
        return value;
      } else {
        return h("span", { class: ["yn-submit-action-currency"] }, [
          h("small", { domProps: { innerHTML: this.currencySymbol } }, []),
          h("b", {}, [this.value])
        ]);
      }
    },
    genIcon(h) {
      if (this.showIcon) {
        const iconName = this.showPopup
          ? "iconl-arrow-down-line"
          : "iconl-arrow-up-line";
        return h("span", { class: ["yn-submit-action-icon"] }, [
          h("yn-iconfont", { props: { name: iconName, size: 12 } }, [])
        ]);
      }
    }
  },
  render(h) {
    const slots = this.slots();
    return h(
      "div",
      { class: ["yn-submit-action", this.fixed ? "fixed" : ""] },
      [
        h(
          "div",
          {
            class: ["yn-submit-action-popup"],
            ref: "actionPopup",
            directives: [{ name: "show", value: this.popupStatus }]
          },
          [
            h(
              "yn-popup",
              {
                style: { position: "absolute" },
                props: { value: this.showPopup, singleton: true },
                on: {
                  beforeEnter: this.handleBeforeEnter,
                  afterLeave: this.handleAfterLeave,
                  input: this.toggle
                }
              },
              [
                h("div", { class: ["yn-submit-action-content"] }, [
                  this.getValideContent("content", slots)
                ])
              ]
            )
          ]
        ),
        h("yn-flex", { class: ["yn-submit-action-flex"] }, [
          h(
            "yn-flex-item",
            { props: { flex: 2 }, on: { click: this.toggle } },
            [
              h("yn-flex", {}, [
                h("yn-flex-item", {}, [
                  h("span", { class: ["yn-submit-action-total-text"] }, [
                    this.label
                  ])
                ]),
                h("yn-flex-item", {}, [this.genValue(h, slots)]),
                h("yn-flex-item", {}, [this.genIcon(h)])
              ])
            ]
          ),
          h("yn-flex-item", { props: { flex: 1 } }, [
            h(
              "yn-button",
              {
                class: ["yn-submit-action-button"],
                props: {
                  type: "primary",
                  size: "large",
                  disabled: this.disabled
                },
                on: { click: this.submit }
              },
              [this.submitText]
            )
          ])
        ])
      ]
    );
  }
};
