/*
 * @Author: Just be free
 * @Date:   2020-04-24 12:04:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-07-09 15:52:00
 * @E-mail: justbefree@126.com
 */
import { defineComponent, genComponentName } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import Flex from "../flex";
import FlexItem from "../flex-item";
import Button from "../button";
import Popup from "../popup";
import Iconfont from "../iconfont";
const VALIDE_POPUP_CONTENT_COMPONENT = "submit-action-popup-content";
const VALIDE_VALUE_COMPONENT = "submit-action-value";
export default defineComponent({
  name: "SubmitAction",
  mixins: [slotsMixins],
  components: { Flex, FlexItem, Popup, Button, Iconfont },
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
      this.$emit("trigger", this.showPopup);
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
      const prefix = this.VUE_APP_PREFIX;
      const validComponent = [];
      let valideName;
      if (type === "value") {
        valideName = `${prefix}-${VALIDE_VALUE_COMPONENT}`;
      } else if (type === "content") {
        valideName = `${prefix}-${VALIDE_POPUP_CONTENT_COMPONENT}`;
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
          h(genComponentName("iconfont"), { props: { name: iconName, size: 12 } }, [])
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
              genComponentName("popup"),
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
        h(genComponentName("flex"), { class: ["yn-submit-action-flex"] }, [
          h(
            genComponentName("flex-item"),
            { props: { flex: 2 }, on: { click: this.toggle } },
            [
              h(genComponentName("flex"), {}, [
                h(genComponentName("flex-item"), {}, [
                  h("span", { class: ["yn-submit-action-total-text"] }, [
                    this.label
                  ])
                ]),
                h(genComponentName("flex-item"), {}, [this.genValue(h, slots)]),
                h(genComponentName("flex-item"), {}, [this.genIcon(h)])
              ])
            ]
          ),
          h(genComponentName("flex-item"), { props: { flex: 1 } }, [
            h(
              genComponentName("button"),
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
});
