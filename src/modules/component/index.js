/*
* @Author: Just be free
* @Date:   2020-05-13 18:08:08
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-27 19:47:20
* @E-mail: justbefree@126.com
*/
import { getConfig } from "./config";
const prefix = getConfig("VUE_APP_PREFIX");
console.log("组件库前缀是", prefix);
import { capitalize } from "../utils";
export const defineComponent = (options = {}) => {
  options.name = genComponentName(options.name);
  let data = typeof options.data === "function" && options.data() || {};
  if (options.components) {
    options.components = dependanceComponent(options.components);
  }
  options.data = function () {
    const propsToData = options.initPropsToData && typeof options.initPropsToData === "function" && options.initPropsToData();
    const result = { ...data, VUE_APP_PREFIX: prefix };
    if (Array.isArray(propsToData)) {
      propsToData.forEach(prop => {
        const { key, value, parse } = prop;
        if (parse && typeof parse === "function") {
          result[key] = parse(this[value]);
        } else {
          result[key] = this[value];
        }
      });
    }
    return result;
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
