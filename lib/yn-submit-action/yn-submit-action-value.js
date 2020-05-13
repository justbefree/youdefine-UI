/*
 * @Author: Just be free
 * @Date:   2020-04-24 17:18:29
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-11 18:19:44
 * @E-mail: justbefree@126.com
 */
import { slotsMixins } from "../mixins/slots";
export default {
  name: "YnSubmitActionValue",
  mixins: [slotsMixins],
  render(h) {
    return h("div", { class: ["yn-submit-action-value"] }, [this.slots()]);
  }
};
