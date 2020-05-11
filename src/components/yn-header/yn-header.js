/*
 * @Author: Just be free
 * @Date:   2020-01-15 14:51:42
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-04-13 13:49:23
 * @E-mail: justbefree@126.com
 */
import "./style.less";
export default {
  name: "YnDynamicHeader",
  props: {
    fixed: {
      type: Boolean,
      default: true,
      require: false
    },
    visible: {
      type: Boolean,
      default: true,
      require: false
    },
    transparent: {
      type: Boolean,
      default: false,
      require: false
    },
    showBackIcon: {
      type: Boolean,
      default: true,
      require: false
    },
    title: {
      type: String,
      default: "默认title",
      require: false
    }
  },
  data() {
    return {
      backIconClassNames: []
    };
  },
  methods: {
    translateAttrsToClassName() {
      const className = [];
      for (let [key, value] of Object.entries(this.$props)) {
        if (key === "fixed" && value) {
          className.push("yn-fixed");
        }
        if (key === "visible" && !value) {
          className.push("yn-hide");
        }
        if (key === "transparent" && !value) {
          className.push("yn-transparent");
        }
        if (key === "showBackIcon" && !value) {
          this.backIconClassNames.push("yn-hide");
        }
      }
      return className;
    },
    handleBackClick() {
      this.$emit("router-back");
    },
    createBackIcomElement(h, slots = {}) {
      if (slots["backIcon"] && typeof slots["backIcon"] === "function") {
        return slots["backIcon"]();
      } else {
        return h("div", {}, ["back"]);
      }
    },
    createTitleElement(h, slots = {}) {
      if (slots["title"] && typeof slots["title"] === "function") {
        return slots["title"]();
      } else {
        return h("div", { class: ["title"] }, [this.title]);
      }
    },
    createOptionButtonElement(h, slots = {}) {
      if (
        slots["optionButton"] &&
        typeof slots["optionButton"] === "function"
      ) {
        return slots["optionButton"]();
      } else {
        return h("div", {}, []);
      }
    }
  },
  render(h) {
    const scopedSlots = this.$scopedSlots;
    const className = this.translateAttrsToClassName();
    return h(
      "transition",
      {
        props: {
          name: "slide-fade-top"
        }
      },
      [
        h(
          "div",
          {
            class: ["yn-dynamic-header", ...className]
          },
          [
            h(
              "div",
              {
                class: ["icon-back-box", ...this.backIconClassNames],
                on: { click: this.handleBackClick }
              },
              [this.createBackIcomElement(h, scopedSlots)]
            ),
            h("div", { class: ["header-title-box"] }, [
              this.createTitleElement(h, scopedSlots)
            ]),
            h("div", { class: ["options-button-box"] }, [
              this.createOptionButtonElement(h, scopedSlots)
            ])
          ]
        )
      ]
    );
  }
};
