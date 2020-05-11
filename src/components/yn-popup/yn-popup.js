/*
 * @Author: Just be free
 * @Date:   2020-01-20 16:43:52
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-11 18:20:41
 * @E-mail: justbefree@126.com
 */
import "./style.less";
import PopupManager from "@/modules/popup/popup-manager";
import { addClass } from "@/modules/dom";
const VALIDATE_POSITION_VALUE = ["left", "right", "top", "bottom", "middle"];
import { warn } from "@/modules/error";
import YnIconfont from "../yn-icon";
import { slotsMixins } from "../mixins/slots";
let idSeed = 1;
export default {
  name: "YnPopup",
  mixins: [slotsMixins],
  components: {
    YnIconfont
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "bottom"
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    borderRadius: {
      type: Number,
      default: 10
    },
    lockScreen: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: false
    },
    singleton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: 0,
      diff: 0,
      events: {},
      zIndex: 2000
    };
  },
  watch: {
    value: "hanleFastClick"
  },
  methods: {
    hanleFastClick(c, o) {
      if (c) {
        this.time = Date.now();
      }
      if (o) {
        this.diff = Date.now() - this.time;
      }
    },
    removeModal() {
      if (this.singleton) {
        document.body.style.overflow = this.bodyOverflow;
      }
      this.events["closeModal"] &&
        typeof this.events["closeModal"] === "function" &&
        this.events["closeModal"]();
      this.events = {};
    },
    handleBeforeEnter(node) {
      this.bodyOverflow = document.body.style.overflow;
      const parent = node.parentNode;
      const modal = document.createElement("div");
      addClass(modal, "v-ynpopup-modal");
      parent.insertBefore(modal, node);
      if (this.singleton) {
        modal.style.zIndex = this.zIndex + idSeed;
        this.$el.style.zIndex = this.zIndex + idSeed + 1;
        if (this.lockScreen) {
          document.body.style.overflow = "hidden";
        }
        this.events["closeModal"] = function() {
          parent.removeChild(modal);
        };
        modal.onclick = () => {
          if (this.closeOnClickModal) {
            this.close();
          }
        };
      } else {
        parent.insertBefore(modal, node);
        PopupManager.register(idSeed, this);
      }
      this.idSeed = idSeed;
      idSeed++;
      this.$emit("beforeEnter");
    },
    handleEnter() {
      this.$emit("enter");
    },
    handleAfterEneter() {
      this.$emit("afterEnter");
    },
    handleBeforeLeave() {
      this.$emit("beforeLeave");
    },
    handleLeave() {
      if (this.diff < 1000) {
        if (this.singleton) {
          this.removeModal();
        }
      }
      this.$emit("leave");
    },
    handleAfterLeave() {
      if (this.singleton) {
        this.removeModal();
      } else {
        PopupManager.closeModal(this.idSeed);
      }
      this.$emit("afterLeave");
    },
    close() {
      this.$emit("input", false);
    },
    isValidatePositionVlaue() {
      return VALIDATE_POSITION_VALUE.indexOf(this.position) > -1;
    },
    getStyle(position) {
      if (position === "bottom") {
        return {
          borderRadius: `${this.borderRadius}px ${this.borderRadius}px 0 0`
        };
      } else if (position === "top") {
        return {
          borderRadius: `0 0 ${this.borderRadius}px ${this.borderRadius}px`
        };
      } else {
        return {};
      }
    },
    createCloseIcon(h) {
      if (this.showCloseIcon) {
        return [
          h("div", { class: ["yn-popup-closeicon"] }, [
            h(
              "yn-iconfont",
              {
                props: { name: "iconcancel", size: "18" },
                nativeOn: { click: this.close }
              },
              []
            )
          ])
        ];
      } else {
        return [];
      }
    }
  },
  render(h) {
    let position = "bottom";
    if (this.isValidatePositionVlaue()) {
      position = this.position;
    } else {
      warn(`${this.position} is not a valid value of position props`);
    }
    return h(
      "transition",
      {
        props: { name: `yn-popup-slide-${position}` },
        on: {
          beforeEnter: this.handleBeforeEnter,
          enter: this.handleEnter,
          afterEnter: this.handleAfterEneter,
          beforeLeave: this.handleBeforeLeave,
          leave: this.handleLeave,
          afterLeave: this.handleAfterLeave
        }
      },
      [
        h(
          "div",
          {
            directives: [{ name: "show", value: this.value }],
            class: ["yn-popup", `yn-popup-${position}`],
            style: { ...this.getStyle(position) }
          },
          [...this.createCloseIcon(h), this.slots()]
        )
      ]
    );
  }
};
