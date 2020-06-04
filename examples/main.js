/*
 * @Author: Just be free
 * @Date:   2020-01-20 17:15:01
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-06-04 17:21:46
 * @E-mail: justbefree@126.com
 */

import Vue from "vue";
import App from "./App";
import router from "./router";
import "./less/style.less";
import YuiComponent from "@";
Vue.use(YuiComponent);

// import {
//   YuiLayout,
//   YuiToast,
//   YuiSpin,
//   YuiIndicator,
//   YuiIconfont,
//   YuiCheckbox,
//   YuiRadiobox,
//   YuiCalendar,
//   YuiPopup,
//   YuiButton,
//   YuiFlex,
//   YuiFlexItem,
//   YuiActionSheet,
//   YuiField,
//   YuiFieldGroup,
//   YuiCityPicker,
//   YuiSticky,
//   YuiDialog,
//   YuiPickyStepper,
//   YuiDropdownMenu,
//   YuiDropdownMenuItem,
//   YuiPicker,
//   YuiSwipe,
//   YuiSwipeItem,
//   YuiTabs,
//   YuiTabItem,
//   YuiSlider,
//   YuiSubmitAction,
//   YuiSubmitActionPopupContent,
//   YuiSubmitActionValue,
//   YuiPullRefresh,
//   YuiDatePicker
// } from "@";
// Vue.component(YuiLayout.name, YuiLayout);
// Vue.component(YuiSpin.name, YuiSpin);
// Vue.component(YuiIconfont.name, YuiIconfont);
// Vue.component(YuiCheckbox.name, YuiCheckbox);
// Vue.component(YuiRadiobox.name, YuiRadiobox);
// Vue.component(YuiCalendar.name, YuiCalendar);
// Vue.component(YuiPopup.name, YuiPopup);
// Vue.component(YuiButton.name, YuiButton);
// Vue.component(YuiFlex.name, YuiFlex);
// Vue.component(YuiFlexItem.name, YuiFlexItem);
// Vue.component(YuiActionSheet.name, YuiActionSheet);
// Vue.component(YuiField.name, YuiField);
// Vue.component(YuiFieldGroup.name, YuiFieldGroup);
// Vue.component(YuiCityPicker.name, YuiCityPicker);
// Vue.component(YuiSticky.name, YuiSticky);
// Vue.component(YuiDialog.name, YuiDialog);
// Vue.component(YuiPickyStepper.name, YuiPickyStepper);
// Vue.component(YuiDropdownMenu.name, YuiDropdownMenu);
// Vue.component(YuiDropdownMenuItem.name, YuiDropdownMenuItem);
// Vue.component(YuiPicker.name, YuiPicker);
// Vue.component(YuiSwipe.name, YuiSwipe);
// Vue.component(YuiSwipeItem.name, YuiSwipeItem);
// Vue.component(YuiTabs.name, YuiTabs);
// Vue.component(YuiTabItem.name, YuiTabItem);
// Vue.component(YuiSlider.name, YuiSlider);
// Vue.component(YuiSubmitAction.name, YuiSubmitAction);
// Vue.component(YuiSubmitActionPopupContent.name, YuiSubmitActionPopupContent);
// Vue.component(YuiSubmitActionValue.name, YuiSubmitActionValue);
// Vue.component(YuiPullRefresh.name, YuiPullRefresh);
// Vue.component(YuiDatePicker.name, YuiDatePicker);
// Vue.prototype.Toast = YuiToast;
// Vue.prototype.Indicator = YuiIndicator;
// Vue.prototype.Dialog = YuiDialog;

new Vue({
  router,
  render: h => h(App)
}).$mount("#example");
