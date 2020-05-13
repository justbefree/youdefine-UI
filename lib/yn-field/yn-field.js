/*
 * @Author: Just be free
 * @Date:   2020-01-16 15:50:12
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 19:06:52
 */

import "./style/index.less";
import { encrypt } from "../modules/utils";
import { YnFlex, YnFlexItem } from "../yn-flex";
import YnIconfont from "../yn-iconfont";
const VALID_TYPE = ["number", "textarea", "password", "text", "email"];
export default {
  name: "YnField",
  components: { YnFlex, YnFlexItem, YnIconfont },
  props: {
    value: {
      type: [Number, String],
      default: ""
    },
    label: String,
    placeholder: String,
    maxlength: [Number, String],
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    interactive: {
      type: String,
      default: "address",
      require: false
    },
    type: {
      type: String,
      default: "text"
    },
    iconName: String,
    showTextareaCounter: {
      type: Boolean,
      default: false
    },
    encrypted: {
      type: Boolean,
      default: false
    },
    pattern: String
  },
  data() {
    return {
      target: null,
      showIcon: false,
      showEncryptInput: false
    };
  },
  methods: {
    handleOnFocus(e) {
      this.target = e.target;
      this.$emit("focus", e);
      this.$emit("click", e);
      if (this.encrypted) {
        e.target.value = "";
        this.$emit("input", "");
      }
    },
    handleOnBlur(e) {
      this.$emit("blur", e);
    },
    handleInput(e) {
      if (this.clearable && e.target.value) {
        this.showIcon = true;
      } else {
        this.showIcon = false;
      }
      this.$emit("input", e.target.value);
    },
    handleIconClick() {
      if (this.clearable) {
        this.target.value = "";
        this.$emit("input", "");
        this.showIcon = false;
        return false;
      }
    },
    createInput(h) {
      const maxlength = this.maxlength ? Number(this.maxlength) : null;
      const area = [];
      const attrs = {
        readonly: this.readonly,
        placeholder: this.placeholder,
        autofocus: this.autofocus,
        value: this.encrypted ? encrypt(this.value) : this.value,
        required: this.required,
        disabled: this.disabled,
        maxlength,
        pattern: this.pattern
      };
      if (this.encrypted) {
        attrs["realValue"] = this.value;
        attrs["encryptedValue"] = encrypt(this.value);
      }
      const events = {
        focus: this.handleOnFocus,
        blur: this.handleOnBlur,
        input: this.handleInput
      };
      const className = [];
      if (this.disabled) {
        className.push("disable");
      }
      if (VALID_TYPE.indexOf(this.type) > -1) {
        if (this.type === "textarea") {
          area.push(
            h(
              "yn-flex-item",
              { class: ["yn-field-textarea"], props: { flex: 1 } },
              [
                h(
                  "textarea",
                  {
                    class: ["textarea-ele", ...className],
                    on: { ...events },
                    attrs: { ...attrs }
                  },
                  []
                ),
                h(
                  "div",
                  {
                    directives: [
                      { name: "show", value: this.showTextareaCounter }
                    ],
                    class: ["yn-field-textarea-counter"]
                  },
                  [h("span", {}, `${this.value.length}/${this.maxlength}`)]
                )
              ]
            )
          );
        } else {
          area.push(
            h(
              "yn-flex-item",
              { class: ["yn-field-input"], props: { flex: 1 } },
              [
                h(
                  "input",
                  {
                    on: { ...events },
                    class: ["input-ele", ...className],
                    attrs: { ...attrs, type: this.type },
                    domProps: {
                      value: this.value
                    }
                  },
                  []
                )
              ]
            )
          );
        }
      }
      return area;
    },
    createIcon(h) {
      const icon = [];
      const name = this.clearable ? "iconclear-button" : this.iconName;
      const directives = this.clearable
        ? [{ name: "show", value: this.showIcon }]
        : [];
      if (this.clearable || this.iconName) {
        icon.push(
          h(
            "yn-flex-item",
            {
              directives,
              on: { click: this.handleIconClick }
            },
            [h("yn-iconfont", { props: { name, size: "16" } }, [])]
          )
        );
      }
      return icon;
    }
  },
  render(h) {
    // const slots = this.$scopedSlots;
    const label = [];
    if (this.label) {
      label.push(
        h("yn-flex-item", { class: ["yn-field-label"] }, [
          h("span", {}, this.label)
        ])
      );
    }
    return h("div", { class: ["yn-field-base", "border-top-bottom"] }, [
      h("yn-flex", { class: ["yn-field-container"] }, [
        ...label,
        ...this.createInput(h),
        ...this.createIcon(h)
      ])
    ]);
  }
};
