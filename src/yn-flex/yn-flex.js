/*
 * @Author: Just be free
 * @Date:   2020-01-02 11:01:34
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 18:06:02
 * @E-mail: justbefree@126.com
 */
import "./style/index.less";
import { capitalize, camelize, isString } from "@/modules/utils";
import { slotsMixins } from "../mixins/slots";
const VALID_CHILD_COMPONENT = "yn-flex-item";
export default {
  name: "YnFlex",
  mixins: [slotsMixins],
  props: {
    flexDirection: String,
    flexWrap: String,
    justifyContent: String,
    alignItems: String,
    alignContent: String,
    xs: String,
    sm: String,
    md: String,
    lg: String,
    fixBottomLine: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isValidColumnsAttribute(key = "") {
      const validates = ["xs", "sm", "md", "lg"];
      return validates.indexOf(key) > -1;
    },
    isValidColumnNumber(value = 0) {
      value = Math.abs(parseInt(value));
      return value >= 1 && value <= 12;
    },
    isValidFlexAttributeAndValue(key = "", value = "") {
      const argsLength = arguments.length;
      const validates = {
        flexDirection: ["row", "rowReverse", "column", "columnReverse"],
        flexWrap: ["nowrap", "wrap", "wrapReverse"],
        justifyContent: [
          "flexStart",
          "flexEnd",
          "center",
          "spaceBetween",
          "spaceAround"
        ],
        alignItems: ["flexStart", "flexEnd", "center", "baseline", "stretch"],
        alignContent: [
          "flexStart",
          "flexEnd",
          "center",
          "spaceBetween",
          "spaceAround",
          "stretch"
        ]
      };
      if (argsLength === 1) {
        return key in validates;
      } else if (argsLength === 2) {
        return key in validates && validates[key].indexOf(value) > -1;
      } else {
        return false;
      }
    },
    translateAttrsToClassName(prefix = "yn-") {
      const className = [];
      for (let [key, value] of Object.entries(this.$props)) {
        if (
          value &&
          isString(value) &&
          this.isValidFlexAttributeAndValue(key, camelize(value))
        ) {
          className.push(`${prefix}${capitalize(key)}-${capitalize(value)}`);
        }
        if (
          this.isValidColumnsAttribute(key) &&
          value &&
          this.isValidColumnNumber(value)
        ) {
          className.push(`${prefix}${key}-col-${value}`);
        }
      }
      return className;
    }
  },
  render(h) {
    const slots = this.slots("default", {}, VALID_CHILD_COMPONENT);
    const className = this.translateAttrsToClassName();
    const fix = this.fixBottomLine ? "yn-flex-fix-bottom-line" : "";
    return h(
      "div",
      {
        class: ["yn-flex", ...className, fix]
      },
      slots
    );
  }
};
