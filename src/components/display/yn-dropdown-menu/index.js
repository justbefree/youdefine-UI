/*
 * @Author: Just be free
 * @Date:   2020-04-02 15:11:14
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:08:27
 * @E-mail: justbefree@126.com
 */

import YnDropdownMenu from "./dropdown-menu";
import YnDropdownMenuItem from "./dropdown-menu-item";
YnDropdownMenu.install = Vue => {
  Vue.component(YnDropdownMenu.name, YnDropdownMenu);
}
YnDropdownMenuItem.install = Vue => {
  Vue.component(YnDropdownMenuItem.name, YnDropdownMenuItem);
}
export { YnDropdownMenu, YnDropdownMenuItem };
