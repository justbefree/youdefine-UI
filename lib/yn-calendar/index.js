/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:16:10
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:06:48
 */

import YnCalendar from "./yn-calendar.js";
YnCalendar.install = Vue => {
  Vue.component(YnCalendar.name, YnCalendar);
}
export default YnCalendar;
