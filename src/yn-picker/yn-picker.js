/*
 * @Author: Just be free
 * @Date:   2020-03-27 11:10:13
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-14 18:09:23
 * @E-mail: justbefree@126.com
 */
import { defineComponent } from "../modules/component";
import YnPopup from "../yn-popup";
import YnBlockHeader from "../block/header";
import YnFlex from "../yn-flex";
import YnFlexItem from "../yn-flex-item";
import YnPickerColumn from "./pickerColumn";
export default defineComponent({
  name: "Picker",
  components: { YnPopup, YnBlockHeader, YnFlex, YnFlexItem, YnPickerColumn },
  props: {
    value: Boolean,
    itemHeight: {
      type: [String, Number],
      default: 44
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    title: {
      type: String,
      default: "请选择日期"
    }
  },
  data() {
    return {
      pickColumns: {}
    };
  },
  methods: {
    confirm() {
      for (const [key] of Object.entries(this.pickColumns)) {
        this.pickColumns[key] = this.$refs[key].getSelectedItem();
      }
      this.$emit("confirm", this.pickColumns);
      this.$emit("input", false);
    },
    close() {
      this.$emit("close", false);
      this.$emit("input", false);
    },
    change(...args) {
      this.$emit("change", ...args);
    },
    createHeaderArea(h) {
      return h(
        "yn-block-header",
        {
          on: { close: this.confirm, back: this.close },
          props: { showBack: true, title: this.title },
          scopedSlots: {
            close: props =>
              h("span", { class: ["yn-picker-confirm"], props: { ...props } }, this.confirmText),
            back: props =>
              h("span", { class: ["yn-picker-cancel"], props: { ...props } }, this.cancelText)
          }
        },
        []
      );
    },
    getData() {
      const { columns } = this;
      if (columns.length > 0) {
        const item = columns[0];
        if (item.value && item.value.length > 0) {
          return columns;
        } else {
          return [{ value: columns, defaultIndex: 0 }];
        }
      } else {
        return [];
      }
    },
    getColumns(h) {
      const data = this.getData();
      const columns = [];
      data.forEach((column, key) => {
        this.pickColumns[`picker_${key}`] = key;
        columns.push(
          h(
            "yn-flex-item",
            {
              ref: `scrollColumn_${key}`,
              class: ["yn-picker-column-wapper"],
              key,
              props: { flex: 1 }
            },
            [
              h(
                "yn-picker-column",
                {
                  ref: `picker_${key}`,
                  on: {
                    change: (...args) => {
                      this.change(...args, key);
                    }
                  },
                  props: {
                    defaultIndex: column.defaultIndex || 0,
                    columns: column.value,
                    itemHeight: this.itemHeight
                  }
                },
                []
              )
            ]
          )
        );
      });
      return columns;
    },
    createScrollArea(h) {
      return h("div", { class: ["yn-picker-container"] }, [
        h(
          "yn-flex",
          {
            style: { height: "100%" },
            props: {
              justifyContent: "spaceBetween",
              alignContent: "center",
              alignItems: "center"
            }
          },
          this.getColumns(h)
        ),
        h(
          "div",
          { class: ["yn-picker-mask"], style: {}, ref: "pickerMask" },
          []
        ),
        h("div", { class: ["scroll-viewer-window"] }, [])
      ]);
    }
  },
  mounted() {
    this.$refs.pickerMask.style = `background-size: 100% ${this.itemHeight *
      2}px`;
  },
  render(h) {
    return h("div", { class: ["yn-picker"] }, [
      h(
        "yn-popup",
        {
          props: { position: "bottom" },
          directives: [{ name: "show", value: this.value }]
        },
        [this.createHeaderArea(h), this.createScrollArea(h)]
      )
    ]);
  }
});
