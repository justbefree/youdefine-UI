/*
 * @Author: Just be free
 * @Date:   2020-04-27 14:47:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 12:55:58
 * @E-mail: justbefree@126.com
 */
const noneNodes = [];
const nodeStyle = [];
const getStyle = element => {
  return window.getComputedStyle(element);
};
const getNode = element => {
  const display = getStyle(element).getPropertyValue("display");
  const tagName = element.nodeName.toLowerCase();
  if (display !== "none" && tagName !== "body") {
    getNode(element.parentNode);
  } else {
    if (display === "none") {
      noneNodes.push(element);
    }
    if (tagName !== "body") {
      getNode(element.parentNode);
    }
  }
};
const setNodeStyle = () => {
  noneNodes.forEach((node, index) => {
    const visibility = node.style.visibility;
    const display = node.style.display;
    const style = node.getAttribute("style");
    node.setAttribute(
      "style",
      "visibility: hidden;display: block !important;" + style
    );
    nodeStyle[index] = {
      visibility: visibility,
      display: display
    };
  });
};
const restoreNodeStyle = () => {
  noneNodes.forEach((node, index) => {
    node.style.visibility = nodeStyle[index].visibility;
    node.style.display = nodeStyle[index].display;
  });
};
const actualSize = element => {
  getNode(element);
  setNodeStyle();
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  restoreNodeStyle();
  return {
    width,
    height
  };
};

export const actualWidth = element => {
  return actualSize(element).width;
};

export const actualHeight = element => {
  return actualSize(element).height;
};
