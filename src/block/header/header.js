/*
 * @Author: Just be free
 * @Date:   2020-03-30 09:47:03
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-13 09:58:28
 * @E-mail: justbefree@126.com
 */
import "./style.less";
import YnIconfont from "../../yn-iconfont";
import YnFlex from "../../yn-flex";
import YnFlexItem from "../../yn-flex-item";
import { slotsMixins } from "../../mixins/slots";
export default {
  name: "YnBlockHeader",
  mixins: [slotsMixins],
  components: { YnIconfont, YnFlexItem, YnFlex },
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick(type) {
      this.$emit(type);
    },
    getContent(h, type) {
      if (type === "title") {
        return this.title || this.slots("title");
      } else if (type === "back") {
        return (
          this.slots("back") || [
            h("yn-iconfont", { props: { name: "iconpop_back", size: 20 } }, [])
          ]
        );
      } else if (type === "close") {
        return (
          this.slots("close") || [
            h(
              "yn-iconfont",
              { props: { name: "iconcancle_circle", size: 24 } },
              []
            )
          ]
        );
      }
    }
  },
  render(h) {
    return h("div", { class: ["yn-block-header"] }, [
      h("yn-flex", { props: { justifyContent: "spaceBetween" } }, [
        h(
          "yn-flex-item",
          {
            on: { click: this.handleClick.bind(this, "back") },
            class: ["yn-block-header-back"],
            directives: [{ name: "show", value: this.showBack }]
          },
          this.getContent(h, "back")
        ),
        h(
          "yn-flex-item",
          {
            class: [
              "yn-block-header-title",
              this.showBack ? "" : "ml30",
              this.showClose ? "" : "mr30"
            ],
            props: { flex: 1 }
          },
          this.getContent(h, "title")
        ),
        h(
          "yn-flex-item",
          {
            on: { click: this.handleClick.bind(this, "close") },
            class: ["yn-block-header-close"],
            directives: [{ name: "show", value: this.showClose }]
          },
          this.getContent(h, "close")
        )
      ])
    ]);
  }
};
