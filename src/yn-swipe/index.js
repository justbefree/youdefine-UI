/*
 * @Author: Just be free
 * @Date:   2020-04-09 09:19:25
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-06 13:13:39
 * @E-mail: justbefree@126.com
 */

import YnSwipe from "./yn-swipe";
import YnSwipeItem from "./yn-swipe-item";
export { YnSwipe, YnSwipeItem };
YnSwipe.install = Vue => {
  Vue.component(YnSwipe.name, YnSwipe);
}
YnSwipeItem.install = Vue => {
  Vue.component(YnSwipeItem.name, YnSwipeItem);
}
