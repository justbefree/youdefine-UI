/*
* @Author: Just be free
* @Date:   2020-05-13 18:08:08
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-20 11:21:51
* @E-mail: justbefree@126.com
*/
import { getConfig } from "./config";
const prefix = getConfig("VUE_APP_PREFIX");
console.log("组件库前缀是", prefix);
import { capitalize } from "../utils";
export const defineComponent = (options = {}) => {
  options.name = genComponentName(options.name);
  if (options.components) {
    options.components = dependanceComponent(options.components);
  }
  return options;
};
export const install = (component) => {
  component.install = (Vue) => {
    Vue.component(component.name, component);
  }
  return component;
};
const dependanceComponent = (dependance = {}) => {
  const components = {};
  Object.keys(dependance).forEach(key => {
    components[genComponentName(key)] = dependance[key];
  });
  return components;
};
export const genComponentName = (name) => {
  if (prefix !== "") {
    return `${prefix.toLocaleLowerCase()}-${capitalize(name)}`;
  } else {
    return capitalize(name);
  }
};
