/*
 * @Author: Just be free
 * @Date:   2020-01-02 10:58:54
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:35:39
 */
import YnFlex from "./yn-flex";
import YnFlexItem from "./yn-flex-item";
YnFlex.install = Vue => {
  Vue.component(YnFlex.name, YnFlex);
}
YnFlexItem.install = Vue => {
  Vue.component(YnFlexItem.name, YnFlexItem);
}
export { YnFlex, YnFlexItem };
