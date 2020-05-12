/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:15:58
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 16:17:25
 */
import "./style.less";
import YnSpin from "../yn-spin";
import YnIconfont from "../yn-iconfont";
import { slotsMixins } from "../mixins/slots";
export default {
  name: "YnButton",
  mixins: [slotsMixins],
  components: { YnSpin, YnIconfont },
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    loadingType: {
      type: String,
      default: "snake"
    },
    loadingSize: {
      type: Number,
      default: 14
    },
    loadingColor: {
      type: String,
      default: "#007aff"
    },
    iconName: String,
    iconSize: {
      type: String,
      default: "16"
    }
  },
  methods: {
    isValidType() {
      return ["primary", "info", "warning", "danger"].indexOf(this.type) > -1;
    },
    isValidSize() {
      return ["large", "small", "normal"].indexOf(this.size) > -1;
    },
    createLoading(h) {
      const loading = [];
      if (this.loading) {
        loading.push(
          h("div", { class: ["yn-button-loading-icon"] }, [
            h(
              "yn-spin",
              {
                props: {
                  type: this.loadingType,
                  size: this.loadingSize,
                  color: this.loadingColor
                }
              },
              []
            )
          ])
        );
      }
      return loading;
    },
    createIcon(h) {
      const icon = [];
      if (this.iconName) {
        icon.push(
          h(
            "yn-iconfont",
            { props: { name: this.iconName, size: this.iconSize } },
            []
          )
        );
      }
      return icon;
    },
    handleClick() {
      if (!this.loading && !this.disabled) {
        this.$emit("click");
      }
    }
  },
  render(h) {
    const className = [];
    if (this.isValidType()) {
      className.push(`yn-button-${this.type}`);
    } else {
      className.push("yn-button-default");
    }
    if (this.isValidSize()) {
      className.push(`yn-button-${this.size}`);
    } else {
      className.push("yn-button-normal");
    }
    if (this.disabled) {
      className.push("yn-button-disable");
    }
    if (this.loading) {
      className.push("yn-button-loading");
    }
    if (this.plain) {
      className.push("is-plain");
    }
    const text =
      this.loading && this.loadingText ? this.loadingText : this.slots();
    return h(
      "button",
      {
        class: ["yn-button", ...className],
        attrs: { type: "button" },
        on: { click: this.handleClick }
      },
      [
        ...this.createLoading(h),
        ...this.createIcon(h),
        h("span", { class: ["yn-button-text"] }, text)
      ]
    );
  }
};
