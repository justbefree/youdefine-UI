/*
* @Author: Just be free
* @Date:   2020-08-25 11:35:55
* @Last Modified by:   Just be free
* @Last Modified time: 2020-08-25 11:52:04
* @E-mail: justbefree@126.com
*/

import Vue from "vue";
type IndicatorText = string;
type IndicatorSpinType = "doubleBounce" | "fadingCircle" | "rotate" | "snake" | "rotateSvg" | "tripleBounce";
type IndicatorSpinColor = string;
type IndicatorBackground = string;
type IndicatorSize = number | string;
type IndicatorLockScreen = boolean;
type IndicatorTransparent = boolean;
export type IndicatorOptions = {
  lockScreen?: IndicatorLockScreen;
  transparent?: IndicatorTransparent;
  text?: IndicatorText;
  spinType?: IndicatorSpinType;
  background?: IndicatorBackground;
  size?: IndicatorSize;
  spinColor?: IndicatorSpinColor;
}
export interface Indicator {
  open(options: IndicatorOptions): void;
  close(): void;
}
declare module 'vue/types/vue' {
  interface Vue {
    Indicator: Indicator;
  }
}
