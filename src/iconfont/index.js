/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:20:18
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-09-11 14:58:03
 */
import { install } from "../modules/component";
import YnIconfont from "./iconfont";
YnIconfont.callback = (options = {}) => {
  const defaultData = YnIconfont.data();
  const { svgs, svgPrefix } = options;
  YnIconfont.data = () => {
    return {
      ...defaultData,
      svgPrefix,
      svgs: { ...defaultData.svgs, ...svgs }
    };
  }
  return install(YnIconfont);
};
export default install(YnIconfont);
