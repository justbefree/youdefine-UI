/*
 * @Author: Just be free
 * @Date:   2020-01-03 16:34:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-13 17:47:29
 */
import "./index.less";
import YnButton from "./yn-button";
import YnFlex from "./yn-flex";
import YnFlexItem from "./yn-flex-item";
import YnHeader from "./yn-header";
import YnIconfont from "./yn-iconfont";
import YnToast from "./yn-toast";
import YnSpin from "./yn-spin";
import YnIndicator from "./yn-indicator";
import YnCheckbox from "./yn-checkbox";
import YnRadiobox from "./yn-radiobox";
import YnCalendar from "./yn-calendar";
import YnPopup from "./yn-popup";
import YnActionSheet from "./yn-action-sheet";
import YnField from "./yn-field";
import YnFieldGroup from "./yn-field-group";
import YnLayout from "./yn-layout";
import YnCityPicker from "./yn-city-picker";
import YnSticky from "./yn-sticky";
import YnDialog from "./yn-dialog";
import YnPickyStepper from "./yn-picky-stepper";
import YnDropdownMenu from "./yn-dropdown-menu";
import YnDropdownMenuItem from "./yn-dropdown-menu-item";
import YnPicker from "./yn-picker";
import YnSwipe from "./yn-swipe";
import YnSwipeItem from "./yn-swipe-item";
import YnTabs from "./yn-tabs";
import YnTabItem from "./yn-tab-item";
import YnSlider from "./yn-slider";
import YnPullRefresh from "./yn-pull-refresh";
import YnDatePicker from "./yn-date-picker";
import YnSubmitAction from "./yn-submit-action";
import YnSubmitActionPopupContent from "./yn-submit-action-popup-content";
import YnSubmitActionValue from "./yn-submit-action-value";
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
