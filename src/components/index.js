/*
 * @Author: Just be free
 * @Date:   2020-01-03 16:34:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 15:40:38
 */
import YnButton from "./display/yn-button";
import { YnFlex, YnFlexItem } from "./layout/yn-flex";
import YnHeader from "./display/yn-header";
import YnIconfont from "./display/yn-icon";
import YnToast from "./display/yn-toast";
import YnSpin from "./display/yn-spin";
import YnIndicator from "./display/yn-indicator";
import YnCheckbox from "./interactive/yn-checkbox";
import YnRadiobox from "./interactive/yn-radiobox";
import YnCalendar from "./display/yn-calendar";
import YnPopup from "./display/yn-popup";
import YnActionSheet from "./display/yn-action-sheet";
import { YnField, YnFieldGroup } from "./interactive/yn-field";
import YnLayout from "./layout/yn-layout";
import YnCityPicker from "./display/yn-city-picker";
import YnSticky from "./display/yn-sticky";
import YnDialog from "./display/yn-dialog";
import YnPickyStepper from "./interactive/yn-picky-stepper";
import { YnDropdownMenu, YnDropdownMenuItem } from "./display/yn-dropdown-menu";
import YnPicker from "./display/yn-picker";
import { YnSwipe, YnSwipeItem } from "./display/yn-swipe";
import { YnTabs, YnTabItem } from "./display/yn-tabs";
import YnSlider from "./display/yn-slider";
import YnPullRefresh from "./display/yn-pull-refresh";
import YnDatePicker from "./display/yn-date-picker";
import {
  YnSubmitAction,
  YnSubmitActionPopupContent,
  YnSubmitActionValue
} from "./display/yn-submit-action";
const components = [
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
];
const install = (Vue) => {
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default { install };
export {
  // install,
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
