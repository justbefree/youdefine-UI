/*
 * @Author: Just be free
 * @Date:   2020-03-27 11:10:13
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-14 19:26:21
 * @E-mail: justbefree@126.com
 */
import { defineComponent } from "../modules/component";
import YnIconfont from "../yn-iconfont";
import YnPopup from "../yn-popup";
import { slotsMixins } from "../mixins/slots";
import YnFlex from "../yn-flex";
import YnFlexItem from "../yn-flex-item";
import YnPickerColumn from "./pickerColumn";
export default defineComponent({
  name: "Picker",
  mixins: [slotsMixins],
  components: { YnPopup, YnFlex, YnFlexItem, YnPickerColumn, YnIconfont },
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
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
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
    getContent(h, type) {
      if (type === "back") {
        return [h("span", { class: ["yn-picker-cancel"] }, this.cancelText)];
      } else if (type === "close") {
        return [h("span", { class: ["yn-picker-confirm"] }, this.confirmText)];
      }
    },
    createHeaderArea(h) {
      return h("div", { class: ["yn-picker-header"] }, [
        h("yn-flex", { props: { justifyContent: "spaceBetween" } }, [
          h(
            "yn-flex-item",
            {
              on: { click: this.close },
              class: ["yn-picker-header-back"],
              directives: [{ name: "show", value: this.showBack }]
            },
            this.getContent(h, "back")
          ),
          h(
            "yn-flex-item",
            {
              class: [
                "yn-picker-header-title",
                this.showBack ? "" : "ml30",
                this.showClose ? "" : "mr30"
              ],
              props: { flex: 1 }
            },
            this.title
          ),
          h(
            "yn-flex-item",
            {
              on: { click: this.confirm },
              class: ["yn-picker-header-close"],
              directives: [{ name: "show", value: this.showClose }]
            },
            this.getContent(h, "close")
          )
        ])
      ]);
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
          directives: [{ name: "show", value: this.value }],
          on: { input: this.close }
        },
        [this.createHeaderArea(h), this.createScrollArea(h)]
      )
    ]);
  }
});
