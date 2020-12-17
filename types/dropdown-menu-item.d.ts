/*
* @Author: Just be free
* @Date:   2020-12-17 16:41:13
* @Last Modified by:   Just be free
* @Last Modified time: 2020-12-17 16:43:52
* @E-mail: justbefree@126.com
*/

import { YnComponents } from "./component";
export interface ToggleOptions {
  disableEmit: boolean;
}
export class YnDropdownMenuItem extends YnComponents {
  closeTab(): void;
  toggle(args: ToggleOptions): void;
}
