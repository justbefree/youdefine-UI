/*
 * @Author: Just be free
 * @Date:   2020-01-03 16:34:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-09-11 11:47:48
 */
 const EVENTS = {};
 import { getConfig } from "./modules/component/config";
 import { capitalize } from "./modules/utils";
 const version = getConfig("VUE_APP_VERSION");
 import "./index.less";
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
 import Counter from "./counter";
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
   Counter
 ];
 const install = (Vue) => {
   if (install.installed) return;
   components.map(component => {
     const eventName = capitalize(component.name);
     if (EVENTS[eventName] && typeof EVENTS[eventName] === "function") {
        Vue.component(component.name, EVENTS[eventName]());
     } else {
        Vue.component(component.name, component);
     }
   });
   Vue.prototype.Toast = Toast;
   Vue.prototype.Dialog = Dialog;
   Vue.prototype.Indicator = Indicator;
 };
 if (typeof window !== "undefined" && window.Vue) {
   install(window.Vue);
 }
 const config = (options = {}) => {
   Object.keys(options).forEach(componentName => {
    const ca = capitalize(componentName);
    components.forEach((component) => {
      if (ca === component.name) {
        if (component.callback && (typeof component.callback === "function")) {
          EVENTS[ca] = () => {
            return component.callback(options[componentName]);
          }
        }
      }
    });
   });
 };
 export { install, version, config };
 export default {
   install,
   version,
   config
 };

export { ActionSheet as YnActionSheet };
export { Button as YnButton };
export { Calendar as YnCalendar };
export { Checkbox as YnCheckbox };
export { CityPicker as YnCityPicker };
export { Counter as YnCounter };
export { DatePicker as YnDatePicker };
export { Dialog as YnDialog };
export { DropdownMenu as YnDropdownMenu };
export { DropdownMenuItem as YnDropdownMenuItem };
export { Field as YnField };
export { FieldGroup as YnFieldGroup };
export { Flex as YnFlex };
export { FlexItem as YnFlexItem };
export { Header as YnHeader };
export { Iconfont as YnIconfont };
export { Indicator as YnIndicator };
export { Layout as YnLayout };
export { Picker as YnPicker };
export { PickyStepper as YnPickyStepper };
export { Popup as YnPopup };
export { PullRefresh as YnPullRefresh };
export { Radiobox as YnRadiobox };
export { Slider as YnSlider };
export { Spin as YnSpin };
export { Sticky as YnSticky };
export { SubmitAction as YnSubmitAction };
export { SubmitActionPopupContent as YnSubmitActionPopupContent };
export { SubmitActionValue as YnSubmitActionValue };
export { Swipe as YnSwipe };
export { SwipeItem as YnSwipeItem };
export { TabItem as YnTabItem };
export { Tabs as YnTabs };
export { Toast as YnToast };
