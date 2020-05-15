/*
 * @Author: Just be free
 * @Date:   2020-04-28 15:42:16
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-15 15:06:19
 * @E-mail: justbefree@126.com
 */

import { defineComponent, genComponentName } from "../modules/component";
import { slotsMixins } from "../mixins/slots";
import { touchMixins } from "../mixins/touch";
import Spin from "../spin";
export default defineComponent({
  name: "PullRefresh",
  mixins: [slotsMixins, touchMixins],
  components: { Spin },
  props: {
    loadingText: String,
    draggingTip: {
      type: String,
      default: "松手下拉刷新"
    },
    loading: Boolean
  },
  data() {
    return {
      className: "",
      dragging: false
    };
  },
  mounted() {
    this.pull();
  },
  methods: {
    pull() {
      const that = this;
      this.bindEvent(this.$el, {
        dragging(event) {
          const { target } = event;
          if (!that.loading && that.deltaY > 0) {
            that.dragging = true;
            that.className = "none";
            target.style.transform = `translate3D(0, ${that.bounceDeltaY}px, 0)`;
          }
        },
        stop(event) {
          if (!that.loading && that.deltaY > 0) {
            that.$emit("pullRefresh", true);
            const { target } = event;
            that.className = "";
            that.dragging = false;
            target.style.transform = "translate3D(0, 0, 0)";
          }
        }
      });
    },
    genLoading(h) {
      if (this.loading) {
        return h("div", { class: ["yn-pull-refresh-loading"] }, [
          h("span", {}, [this.loadingText]),
          h(genComponentName("spin"), { props: { type: "tripleBounce" } }, [])
        ]);
      }
    },
    genDraggingText(h) {
      if (this.dragging && this.deltaY >= 20) {
        return h("div", { class: ["yn-pull-refresh-draggin-text"] }, [
          h("span", {}, [this.draggingTip])
        ]);
      }
    }
  },
  render(h) {
    return h("div", { class: ["yn-pull-refresh", this.className] }, [
      this.genLoading(h),
      this.genDraggingText(h),
      this.slots()
    ]);
  }
});
