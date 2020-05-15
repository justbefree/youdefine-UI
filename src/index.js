/*
 * @Author: Just be free
 * @Date:   2020-01-03 16:34:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-15 10:10:02
 */
import "./index.less";
import YnButton from "./button";
import YnFlex from "./flex";
import YnFlexItem from "./flex-item";
import YnHeader from "./header";
import YnIconfont from "./iconfont";
import YnToast from "./toast";
import YnSpin from "./spin";
import YnIndicator from "./indicator";
import YnCheckbox from "./checkbox";
import YnRadiobox from "./radiobox";
import YnCalendar from "./calendar";
import YnPopup from "./popup";
import YnActionSheet from "./action-sheet";
import YnField from "./field";
import YnFieldGroup from "./field-group";
import YnLayout from "./layout";
import YnCityPicker from "./city-picker";
import YnSticky from "./sticky";
import YnDialog from "./dialog";
import YnPickyStepper from "./picky-stepper";
import YnDropdownMenu from "./dropdown-menu";
import YnDropdownMenuItem from "./dropdown-menu-item";
import YnPicker from "./picker";
import YnSwipe from "./swipe";
import YnSwipeItem from "./swipe-item";
import YnTabs from "./tabs";
import YnTabItem from "./tab-item";
import YnSlider from "./slider";
import YnPullRefresh from "./pull-refresh";
import YnDatePicker from "./date-picker";
import YnSubmitAction from "./submit-action";
import YnSubmitActionPopupContent from "./submit-action-popup-content";
import YnSubmitActionValue from "./submit-action-value";
const components = [
  YnButton,
  YnFlex,
  YnFlexItem,
  YnHeader,
  YnIconfont,
  YnSpin,
  YnCheckbox,
  YnRadiobox,
  YnCalendar,
  YnPopup,
  YnActionSheet,
  YnField,
  YnFieldGroup,
  YnLayout,
  YnCityPicker,
  YnSticky,
  YnDialog,
  YnPickyStepper,
  YnDropdownMenu,
  YnDropdownMenuItem,
  YnPicker,
  YnSwipe,
  YnSwipeItem,
  YnTabs,
  YnTabItem,
  YnSlider,
  YnSubmitAction,
  YnSubmitActionPopupContent,
  YnSubmitActionValue,
  YnPullRefresh,
  YnDatePicker
];
const install = (Vue) => {
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.Toast = YnToast;
  Vue.prototype.Dialog = YnDialog;
  Vue.prototype.Indicator = YnIndicator;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export {
  install,
  YnButton,
  YnFlex,
  YnFlexItem,
  YnHeader,
  YnIconfont,
  YnToast,
  YnSpin,
  YnIndicator,
  YnCheckbox,
  YnRadiobox,
  YnCalendar,
  YnPopup,
  YnActionSheet,
  YnField,
  YnFieldGroup,
  YnLayout,
  YnCityPicker,
  YnSticky,
  YnDialog,
  YnPickyStepper,
  YnDropdownMenu,
  YnDropdownMenuItem,
  YnPicker,
  YnSwipe,
  YnSwipeItem,
  YnTabs,
  YnTabItem,
  YnSlider,
  YnSubmitAction,
  YnSubmitActionPopupContent,
  YnSubmitActionValue,
  YnPullRefresh,
  YnDatePicker
};
export default {
  install
};
