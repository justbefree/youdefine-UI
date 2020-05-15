/*
* @Author: Just be free
* @Date:   2020-05-13 18:08:08
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-13 18:25:56
* @E-mail: justbefree@126.com
*/
const prefix = "Yn";
import { capitalize } from "../utils";
export const defineComponent = (options = {}) => {
  options.name = genComponentName(options.name);
  return options;
};
export const install = (component) => {
  component.install = (Vue) => {
    Vue.component(component.name, component);
  }
  return component;
};
const genComponentName = (name) => {
  if (prefix !== "") {
    return `${prefix.toLocaleLowerCase()}-${capitalize(name)}`;
  } else {
    return capitalize(name);
  }
};
