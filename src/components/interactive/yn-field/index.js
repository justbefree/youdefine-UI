/*
 * @Author: Just be free
 * @Date:   2020-01-16 15:50:02
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:34:44
 */
import YnField from "./yn-field";
import YnFieldGroup from "./yn-field-group";
YnField.install = Vue => {
  Vue.component(YnField.name, YnField);
}
YnFieldGroup.install = Vue => {
  Vue.component(YnFieldGroup.name, YnFieldGroup);
}
export { YnField, YnFieldGroup };
