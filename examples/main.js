/*
 * @Author: Just be free
 * @Date:   2020-01-20 17:15:01
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-07 09:51:20
 * @E-mail: justbefree@126.com
 */

import Vue from "vue";
import App from "./App";
import router from "./router";
import "./less/style.less";
// import YnComponent from "@/components/index";
// console.log("全量引入是什么概念", YnComponent);
// Vue.use(YnComponent);
import {
  YnToast,
  YnSpin,
  YnIndicator,
  YnIconfont,
  YnCheckbox,
  YnRadiobox,
  YnCalendar,
  YnPopup,
  YnButton,
  YnFlex,
  YnFlexItem,
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
} from "@/components/index";
Vue.component(YnSpin.name, YnSpin);
Vue.component(YnIconfont.name, YnIconfont);
Vue.component(YnCheckbox.name, YnCheckbox);
Vue.component(YnRadiobox.name, YnRadiobox);
Vue.component(YnCalendar.name, YnCalendar);
Vue.component(YnPopup.name, YnPopup);
Vue.component(YnButton.name, YnButton);
Vue.component(YnFlex.name, YnFlex);
Vue.component(YnFlexItem.name, YnFlexItem);
Vue.component(YnActionSheet.name, YnActionSheet);
Vue.component(YnField.name, YnField);
Vue.component(YnFieldGroup.name, YnFieldGroup);
Vue.component(YnLayout.name, YnLayout);
Vue.component(YnCityPicker.name, YnCityPicker);
Vue.component(YnSticky.name, YnSticky);
Vue.component(YnDialog.name, YnDialog);
Vue.component(YnPickyStepper.name, YnPickyStepper);
Vue.component(YnDropdownMenu.name, YnDropdownMenu);
Vue.component(YnDropdownMenuItem.name, YnDropdownMenuItem);
Vue.component(YnPicker.name, YnPicker);
Vue.component(YnSwipe.name, YnSwipe);
Vue.component(YnSwipeItem.name, YnSwipeItem);
Vue.component(YnTabs.name, YnTabs);
Vue.component(YnTabItem.name, YnTabItem);
Vue.component(YnSlider.name, YnSlider);
Vue.component(YnSubmitAction.name, YnSubmitAction);
Vue.component(YnSubmitActionPopupContent.name, YnSubmitActionPopupContent);
Vue.component(YnSubmitActionValue.name, YnSubmitActionValue);
Vue.component(YnPullRefresh.name, YnPullRefresh);
Vue.component(YnDatePicker.name, YnDatePicker);
Vue.prototype.Toast = YnToast;
Vue.prototype.Indicator = YnIndicator;
Vue.prototype.Dialog = YnDialog;
new Vue({
  router,
  render: h => h(App)
}).$mount("#example");
