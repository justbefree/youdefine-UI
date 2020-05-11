/*
 * @Author: Just be free
 * @Date:   2020-04-21 14:19:38
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:14:26
 * @E-mail: justbefree@126.com
 */

import YnTabs from "./yn-tabs";
import YnTabItem from "./yn-tab-item";
export { YnTabs, YnTabItem };
YnTabs.install = Vue => {
  Vue.component(YnTabs.name, YnTabs);
}
YnTabItem.install = Vue => {
  Vue.component(YnTabItem.name, YnTabItem);
}
