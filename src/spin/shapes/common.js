/*
 * @Author: Just be free
 * @Date:   2020-02-14 17:47:57
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-07-02 17:18:10
 */

export default {
  computed: {
    spinColor() {
      return this.color || this.$parent.color || "#ccc";
    },
    spinSize() {
      return (this.size || this.$parent.size || 28) + "px";
    }
  },
  props: {
    size: [String, Number],
    color: String
  }
};
