/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:20:18
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-09-11 11:54:13
 */
import { install } from "../modules/component";
import YnIconfont from "./iconfont";
YnIconfont.callback = (options = {}) => {
  const defaultData = YnIconfont.data();
  YnIconfont.data = () => {
    return {
      ...defaultData,
      ...options
    };
  }
  return install(YnIconfont);
};
export default install(YnIconfont);
