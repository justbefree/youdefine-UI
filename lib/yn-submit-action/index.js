/*
 * @Author: Just be free
 * @Date:   2020-04-24 12:03:59
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:12:42
 * @E-mail: justbefree@126.com
 */

import YnSubmitAction from "./yn-submit-action";
import YnSubmitActionPopupContent from "./yn-submit-action-popup-content";
import YnSubmitActionValue from "./yn-submit-action-value";
export { YnSubmitAction, YnSubmitActionPopupContent, YnSubmitActionValue };
YnSubmitAction.install = Vue => {
  Vue.component(YnSubmitAction.name, YnSubmitAction);
}
YnSubmitActionPopupContent.install = Vue => {
  Vue.component(YnSubmitActionPopupContent.name, YnSubmitActionPopupContent);
}
