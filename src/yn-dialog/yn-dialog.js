/*
 * @Author: Just be free
 * @Date:   2020-03-23 11:35:23
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 18:01:28
 * @E-mail: justbefree@126.com
 */
import "./style/index.less";
import { renderedMixins } from "../mixins/rendered";
import { slotsMixins } from "../mixins/slots";
import { addClass } from "@/modules/dom";
import { isPromise } from "@/modules/utils";
import YnButton from "../yn-button";
export default {
  name: "YnDialog",
  mixins: [renderedMixins, slotsMixins],
  components: { YnButton },
  props: {
    callback: null,
    className: [String, Array],
    title: String,
    message: String,
    value: {
      type: Boolean,
      default: false
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    cancelLoadingText: String,
    confirmButtonText: {
      type: String,
      default: "确定"
    },
    confirmLoadingText: String,
    loadingColor: String,
    closeModelOnClick: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [String, Number],
      default: 2
    }
  },
  data() {
    return {
      renderedAsComponent: true,
      bodyOverflow: null,
      events: {},
      loading: false,
      action: "",
      show: false
    };
  },
  methods: {
    getLoadingStatus(e) {
      return this.loading && this.action === e;
    },
    getDisableStatus(e) {
      return this.loading && this.action !== e;
    },
    getButtons(h) {
      const buttons = [];
      if (this.showCancelButton) {
        buttons.push(
          h(
            "yn-button",
            {
              props: {
                loadingColor: this.loadingColor,
                loadingText: this.cancelLoadingText,
                size: "large",
                disabled: this.getDisableStatus("cancel"),
                loading: this.getLoadingStatus("cancel")
              },
              on: { click: this.handleButtonClick.bind(this, "cancel") },
              class: ["yn-dialog-cancel-button"]
            },
            [this.cancelButtonText]
          )
        );
      }
      if (this.showConfirmButton) {
        const className = buttons.length === 1 ? "vertical-line" : "";
        buttons.push(
          h(
            "yn-button",
            {
              props: {
                loadingColor: this.loadingColor,
                loadingText: this.confirmLoadingText,
                size: "large",
                disabled: this.getDisableStatus("confirm"),
                loading: this.getLoadingStatus("confirm")
              },
              on: { click: this.handleButtonClick.bind(this, "confirm") },
              class: ["yn-dialog-confirm-button", className]
            },
            [this.confirmButtonText]
          )
        );
      }
      return buttons.length > 0
        ? h("div", { class: ["yn-dialog-buttons"] }, buttons)
        : null;
    },
    handleButtonClick(e) {
      this.action = e;
      const { callback } = this;
      if (callback && typeof callback === "function") {
        const promise = callback(e);
        if (isPromise(promise)) {
          this.loading = true;
          promise.then(res => {
            this.show = false;
            this.$emit("input", false);
            this.$emit("buttonClick", e, res);
          });
        } else {
          this.show = false;
          this.$emit("input", false);
          this.$emit("buttonClick", e);
        }
      } else {
        this.$emit("input", false);
        this.$emit("buttonClick", e);
        this.show = false;
      }
    },
    getTitle(h) {
      return this.title
        ? h("div", { class: ["yn-dialog-title"] }, this.title)
        : null;
    },
    close() {
      this.events["doClose"]();
      delete this.events["doClose"];
      if (!this.renderedAsComponent) {
        this.removeDOM();
      }
    },
    removeDOM() {
      const el = this.$el;
      const parent = el.parentNode;
      parent.removeChild(el);
    },
    handleBeforeEnter(node) {
      this.beforeOpen &&
        typeof this.beforeOpen === "function" &&
        this.beforeOpen();
      this.bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const parent = node.parentNode;
      const modal = document.createElement("div");
      modal.style.zIndex = Number(this.zIndex) - 1;
      modal.onclick = () => {
        if (this.closeModelOnClick) {
          this.$emit("input", false);
          this.show = false;
        } else {
          this.$emit("modalClick");
        }
      };
      addClass(modal, "v-yndialog-modal");
      parent.insertBefore(modal, node);
      this.$emit("beforeEnter");
      this.events["doClose"] = () => {
        parent.removeChild(modal);
        document.body.style.overflow = this.bodyOverflow;
      };
    },
    handleAfterEnter() {
      this.opened && typeof this.opened === "function" && this.opened();
      this.$emit("afterEnter");
    },
    handleBeforeLeave() {
      this.beforeClose &&
        typeof this.beforeClose === "function" &&
        this.beforeClose(this.action);
      this.$emit("beforeLeave", this.action);
    },
    handleAfterLeave() {
      this.close();
      this.loading = false;
      this.$emit("afterLeave", this.action);
      this.afterClose &&
        typeof this.afterClose === "function" &&
        this.afterClose(this.action);
    }
  },
  render(h) {
    const domProps = {};
    if (!this.renderedAsComponent) {
      domProps.innerHTML = this.message;
    }
    const className = Array.isArray(this.className)
      ? this.className
      : [this.className];
    return h(
      "transition",
      {
        props: { name: "yn-dialog-bounce" },
        on: {
          beforeEnter: this.handleBeforeEnter,
          afterEnter: this.handleAfterEnter,
          beforeLeave: this.handleBeforeLeave,
          afterLeave: this.handleAfterLeave
        }
      },
      [
        h(
          "div",
          {
            class: ["yn-dialog", ...className],
            directives: [{ name: "show", value: this.show || this.value }],
            style: { zIndex: this.zIndex }
          },
          [
            this.getTitle(h),
            h(
              "div",
              {
                class: ["yn-dialog-content"],
                domProps
              },
              this.slots()
            ),
            this.getButtons(h)
          ]
        )
      ]
    );
  }
};
