/*
 * @Author: Just be free
 * @Date:   2020-02-25 14:34:04
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-04-28 10:02:42
 */
const hasClass = (dom, className) => {
  return dom.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};
export const addClass = (dom, className) => {
  if (!hasClass(dom, className)) {
    dom.className += " " + className;
  }
};
const remove = (dom, className) => {
  if (hasClass(dom, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    dom.className = dom.className.replace(reg, " ");
  }
};
export const removeClass = (dom, className) => {
  if (Array.isArray(className)) {
    className.forEach(c => {
      remove(dom, c);
    });
  } else {
    remove(dom, className);
  }
};
// 获取scrollTop值
export const getScrollTop = element => {
  let t = element.scrollTop;
  while (element.offsetParent) {
    element = element.offsetParent;
    t += element.scrollTop;
  }
  return t;
};
export const getOffset = element => {
  let top = element.offsetTop;
  let left = element.offsetLeft;
  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }
  left = left + getElementsTranslate(element).x;
  top = top + getElementsTranslate(element).y;
  return { top, left };
};
// 获取translateY的值
export const getElementsTranslate = element => {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;
  if (transform !== "none") {
    const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
    const translateX = transform.slice(7, transform.length - 1).split(", ")[4];
    return { y: Number(translateY), x: Number(translateX) };
  } else {
    return { y: 0, x: 0 };
  }
};
