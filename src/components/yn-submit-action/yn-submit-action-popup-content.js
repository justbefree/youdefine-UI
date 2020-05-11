/*
 * @Author: Just be free
 * @Date:   2020-04-24 17:12:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-11 18:19:49
 * @E-mail: justbefree@126.com
 */
import { slotsMixins } from "../mixins/slots";
export default {
  name: "YnSubmitActionPopupContent",
  mixins: [slotsMixins],
  render(h) {
    return h("div", { class: "yn-submit-action-popup-content" }, [
      this.slots()
    ]);
  }
};
