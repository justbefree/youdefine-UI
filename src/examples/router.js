/*
 * @Author: Just be free
 * @Date:   2020-02-07 13:50:45
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-04-29 11:11:02
 */
import Router from "vue-router";
import Vue from "vue";
Vue.use(Router);
import Content from "./Content.vue";
import YnToast from "./yn-toast/toast.vue";
import YnIndicator from "./yn-indicator/indicator.vue";
import YnSpin from "./yn-spin/spin.vue";
import YnIconfont from "./yn-iconfont/iconfont.vue";
import YnCheckbox from "./yn-checkbox/checkbox.vue";
import YnRadiobox from "./yn-radiobox/radiobox.vue";
import YnCalendar from "./yn-calendar/calendar.vue";
import YnPopup from "./yn-popup/popup.vue";
import YnButton from "./yn-button/button.vue";
import YnFlex from "./yn-flex/flex.vue";
import YnActionSheet from "./yn-action-sheet/actionSheet.vue";
import YnField from "./yn-field/field.vue";
import YnLayout from "./yn-layout/layout.vue";
import YnCityPicker from "./yn-city-picker/cityPicker.vue";
import YnSticky from "./yn-sticky/sticky.vue";
import YnDialog from "./yn-dialog/dialog.vue";
import YnPickyStepper from "./yn-picky-stepper/pickyStepper.vue";
import YnDropdownMenu from "./yn-dropdown-menu/dropdownMenu.vue";
import YnPicker from "./yn-picker/picker.vue";
import YnSwipe from "./yn-swipe/swipe.vue";
import YnTabs from "./yn-tabs/tabs.vue";
import YnSlider from "./yn-slider/slider.vue";
import YnSubmitAction from "./yn-submit-action/submitAction.vue";
import YnPullRefresh from "./yn-pull-refresh/pullRefresh.vue";
import YnDatePicker from "./yn-date-picker/datePicker.vue";
const router = new Router({
  routes: [
    {
      path: "/",
      name: "content",
      component: Content
    },
    {
      path: "/toast",
      name: "toast",
      component: YnToast
    },
    {
      path: "/indicator",
      name: "indicator",
      component: YnIndicator
    },
    {
      path: "/spin",
      name: "spin",
      component: YnSpin
    },
    {
      path: "/iconfont",
      name: "iconfont",
      component: YnIconfont
    },
    {
      path: "/checkbox",
      name: "checkbox",
      component: YnCheckbox
    },
    {
      path: "/radiobox",
      name: "radiobox",
      component: YnRadiobox
    },
    {
      path: "/calendar",
      name: "calendar",
      component: YnCalendar
    },
    {
      path: "/popup",
      name: "popup",
      component: YnPopup
    },
    {
      path: "/button",
      name: "button",
      component: YnButton
    },
    {
      path: "/flex",
      name: "flex",
      component: YnFlex
    },
    {
      path: "/actionSheet",
      name: "actionSheet",
      component: YnActionSheet
    },
    {
      path: "/field",
      name: "field",
      component: YnField
    },
    {
      path: "/layout",
      name: "layout",
      component: YnLayout
    },
    {
      path: "/cityPicker",
      name: "cityPicker",
      component: YnCityPicker
    },
    {
      path: "/sticky",
      name: "sticky",
      component: YnSticky
    },
    {
      path: "/dialog",
      name: "dialog",
      component: YnDialog
    },
    {
      path: "/pickyStepper",
      name: "pickyStepper",
      component: YnPickyStepper
    },
    {
      path: "/dropdownMenu",
      name: "dropdownMenu",
      component: YnDropdownMenu
    },
    {
      path: "/picker",
      name: "picker",
      component: YnPicker
    },
    {
      path: "/swipe",
      name: "swipe",
      component: YnSwipe
    },
    {
      path: "/tabs",
      name: "tabs",
      component: YnTabs
    },
    {
      path: "/slider",
      name: "slider",
      component: YnSlider
    },
    {
      path: "/submitAction",
      name: "submitAction",
      component: YnSubmitAction
    },
    {
      path: "/pullRefresh",
      name: "pullRefresh",
      component: YnPullRefresh
    },
    {
      path: "/datePicker",
      name: "datePicker",
      component: YnDatePicker
    }
  ]
});
export default router;
