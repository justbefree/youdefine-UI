/*
 * @Author: Just be free
 * @Date:   2020-01-03 16:34:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-06-04 17:51:35
 */
import { getConfig } from "./modules/component/config";
const version = getConfig("VUE_APP_VERSION");
const prefix = getConfig("VUE_APP_PREFIX");
import "./sass.js";
// import "./index.less";
import Button from "./button";
import Flex from "./flex";
import FlexItem from "./flex-item";
import Header from "./header";
import Iconfont from "./iconfont";
import Toast from "./toast";
import Spin from "./spin";
import Indicator from "./indicator";
import Checkbox from "./checkbox";
import Radiobox from "./radiobox";
import Calendar from "./calendar";
import Popup from "./popup";
import ActionSheet from "./action-sheet";
import Field from "./field";
import FieldGroup from "./field-group";
import Layout from "./layout";
import CityPicker from "./city-picker";
import Sticky from "./sticky";
import Dialog from "./dialog";
import PickyStepper from "./picky-stepper";
import DropdownMenu from "./dropdown-menu";
import DropdownMenuItem from "./dropdown-menu-item";
import Picker from "./picker";
import Swipe from "./swipe";
import SwipeItem from "./swipe-item";
import Tabs from "./tabs";
import TabItem from "./tab-item";
import Slider from "./slider";
import PullRefresh from "./pull-refresh";
import DatePicker from "./date-picker";
import SubmitAction from "./submit-action";
import SubmitActionPopupContent from "./submit-action-popup-content";
import SubmitActionValue from "./submit-action-value";
const components = [
  Button,
  Flex,
  FlexItem,
  Header,
  Iconfont,
  Spin,
  Checkbox,
  Radiobox,
  Calendar,
  Popup,
  ActionSheet,
  Field,
  FieldGroup,
  Layout,
  CityPicker,
  Sticky,
  Dialog,
  PickyStepper,
  DropdownMenu,
  DropdownMenuItem,
  Picker,
  Swipe,
  SwipeItem,
  Tabs,
  TabItem,
  Slider,
  SubmitAction,
  SubmitActionPopupContent,
  SubmitActionValue,
  PullRefresh,
  DatePicker,
];
const install = (Vue) => {
  if (install.installed) return;
  components.map((component) => {
    Vue.component(component.name, component);
  });
  Vue.prototype.Toast = Toast;
  Vue.prototype.Dialog = Dialog;
  Vue.prototype.Indicator = Indicator;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export { install, version, prefix };
export default {
  install,
  version,
  prefix,
};

export { ActionSheet as YuiActionSheet };
export { Button as YuiButton };
export { Calendar as YuiCalendar };
export { Checkbox as YuiCheckbox };
export { CityPicker as YuiCityPicker };
export { DatePicker as YuiDatePicker };
export { Dialog as YuiDialog };
export { DropdownMenu as YuiDropdownMenu };
export { DropdownMenuItem as YuiDropdownMenuItem };
export { Field as YuiField };
export { FieldGroup as YuiFieldGroup };
export { Flex as YuiFlex };
export { FlexItem as YuiFlexItem };
export { Header as YuiHeader };
export { Iconfont as YuiIconfont };
export { Indicator as YuiIndicator };
export { Layout as YuiLayout };
export { Picker as YuiPicker };
export { PickyStepper as YuiPickyStepper };
export { Popup as YuiPopup };
export { PullRefresh as YuiPullRefresh };
export { Radiobox as YuiRadiobox };
export { Slider as YuiSlider };
export { Spin as YuiSpin };
export { Sticky as YuiSticky };
export { SubmitAction as YuiSubmitAction };
export { SubmitActionPopupContent as YuiSubmitActionPopupContent };
export { SubmitActionValue as YuiSubmitActionValue };
export { Swipe as YuiSwipe };
export { SwipeItem as YuiSwipeItem };
export { TabItem as YuiTabItem };
export { Tabs as YuiTabs };
export { Toast as YuiToast };
