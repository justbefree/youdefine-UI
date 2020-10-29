/*
 * @Author: Just be free
 * @Date:   2020-03-23 11:34:48
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-10-29 14:45:18
 * @E-mail: justbefree@126.com
 */
import { install } from "../modules/component";
import { extend } from "../mixins/rendered";
import YnDialog from "./dialog";
install(YnDialog);
const YnDialogContructor = extend(YnDialog);
const getInstance = () => {
  return new YnDialogContructor({
    el: document.createElement("div"),
  });
};
const props = {
  callback: null,
  title: "",
  message: "",
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonText: "取消",
  cancelLoadingText: "取消",
  confirmButtonText: "确定",
  confirmLoadingText: "确定",
  loadingColor: "",
  closeModelOnClick: false,
  zIndex: 2,
};
export default {
  alert(options = {}) {
    const args = { ...props, showCancelButton: false, ...options };
    const instance = getInstance();
    instance.$data.renderedAsComponent = false;
    instance.title = args.title;
    instance.message = args.message;
    // instance.callback = args.beforeClose;
    instance.showCancelButton = args.showCancelButton;
    instance.showConfirmButton = args.showConfirmButton;
    instance.cancelButtonText = args.cancelButtonText;
    instance.confirmButtonText = args.confirmButtonText;
    instance.cancelLoadingText = args.cancelLoadingText;
    instance.confirmLoadingText = args.confirmLoadingText;
    instance.loadingColor = args.loadingColor;
    instance.closeModelOnClick = args.closeModelOnClick;
    instance.zIndex = args.zIndex;
    instance.className = args.className;
    instance.beforeOpen = args.beforeOpen;
    instance.afterOpen = args.afterOpen;
    instance.beforeClose = args.beforeClose;
    instance.afterClose = args.afterClose;
    document.body.appendChild(instance.$el);
    instance.rendered(() => {
      instance.show = true;
    });
  },
  confirm(options = {}) {
    const args = { ...props, ...options };
    this.alert(args);
  },
  ...YnDialog,
};
