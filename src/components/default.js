/*
* @Author: Just be free
* @Date:   2020-05-06 13:44:12
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-06 15:41:07
* @E-mail: justbefree@126.com
*/

import YnButton from "./display/yn-button";
import { YnFlex, YnFlexItem } from "./layout/yn-flex";
import YnHeader from "./display/yn-header";
import YnIconfont from "./display/yn-icon";
import YnToast from "./display/yn-toast";
import YnSpin from "./display/yn-spin";
import YnIndicator from "./display/yn-indicator";
import YnCheckbox from "./interactive/yn-checkbox";
import YnRadiobox from "./interactive/yn-radiobox";
import YnCalendar from "./display/yn-calendar";
const components = [
  YnButton,
  YnFlex,
  YnFlexItem,
  YnHeader,
  YnIconfont,
  YnToast,
  YnSpin,
  YnIndicator,
  YnCheckbox,
  YnRadiobox,
  YnCalendar,
];
const install = (Vue) => {
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export { YnButton, YnFlex, YnFlexItem, YnHeader, YnIconfont, YnToast, YnSpin, YnIndicator, YnCheckbox, YnRadiobox, YnCalendar };
export default { install };
