/*
 * @Author: Just be free
 * @Date:   2020-06-04 17:52:38
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-06-05 15:36:32
 * @E-mail: justbefree@126.com
 */

// BLOCK
/**
Block names may consist of Latin letters, digits, and dashes. 
To form a CSS class, add a short prefix for namespacing: .block
**/

// ELEMENT
/**
Element names may consist of Latin letters, digits, 
dashes and underscores. CSS class is formed as block name 
plus two underscores plus element name: .block__elem
**/

// MODIFIER
/**
Modifier names may consist of Latin letters, digits, 
dashes and underscores. CSS class is formed as block’s or 
element’s name plus two dashes: .block--mod or .block__elem--mod 
and .block--color-black with .block--color-red. 
Spaces in complicated modifiers are replaced by dash.
**/

import { isObject } from "../utils";
const parse = (name) => {
  if (isObject(name)) {
    const key = Object.keys(name)[0];
    const value = name[key];
    if (isObject(value)) {
      const attr = Object.keys(value)[0];
      return `${key}--${attr}--${value[attr]}`;
    } else {
      return `${key}--${value}`;
    }
  } else {
    return name;
  }
};
export const createBem = (...args) => {
  const [b = "", e = ""] = args;
  const block = parse(b);
  const element = parse(e);
  return element === "" ? block : `${block}__${element}`;
};

// bem("block"); => .block {}
// bem({ block: "green" }) => .block--green {}
// bem("block", "input") => .block__input {}
// bem("block", { input: "active" }) => block__input--active
// bem({ block: "disabled" }, { input: "active" }) => block--disabled__input--active
