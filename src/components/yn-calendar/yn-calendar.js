/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:16:27
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-12 16:17:24
 */
import { drop, push } from "@/modules/utils";
import { YnDate } from "@/modules/date";
import "./style.less";
import YnPopup from "../yn-popup";
import YnIconfont from "../yn-iconfont";
import { YnFlex, YnFlexItem } from "../yn-flex";
import { renderedMixins } from "../mixins/rendered";
import { getOffset } from "@/modules/dom";
export default {
  name: "YnCalendar",
  mixins: [renderedMixins],
  components: { YnFlex, YnFlexItem, YnPopup, YnIconfont },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Array],
      default: "日历"
    },
    mode: {
      type: String,
      default: "single"
    },
    doubleModeAllowSameDate: {
      type: Boolean,
      default: true
    },
    before: {
      type: [Number, String],
      default: 1
    },
    after: {
      type: [Number, String],
      default: 1
    },
    unit: {
      type: String,
      default: "days"
    },
    weekText: {
      type: Array,
      default: () => {
        return ["日", "一", "二", "三", "四", "五", "六"];
      }
    },
    defaultDate: {
      type: String,
      default: YnDate().format()
    },
    defaultStartDate: {
      type: String,
      default: YnDate().format()
    },
    defaultEndDate: {
      type: String,
      default: YnDate()
        .add(1, "day")
        .format()
    },
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    fromDateMark: {
      type: String,
      default: "入住"
    },
    toDateMark: {
      type: String,
      default: "离店"
    },
    todayMark: {
      type: String,
      default: "今天"
    }
  },
  data() {
    return {
      changedNode: {},
      fromDate: null,
      toDate: null,
      date: null,
      beginDate: null,
      endDate: null,
      confirmButtonClassName: "active"
    };
  },
  watch: {
    mode: "highLightDefault"
  },
  methods: {
    handleClick(date) {
      if (date.className.indexOf("clickable") < 0) {
        return false;
      }
      if (this.mode === "double") {
        this.haneleDoubleMode(date);
      } else {
        this.haneleSingleMode(date);
      }
    },
    haneleSingleMode(date) {
      this.changedNode = {};
      push(date.className, ["active", "single-mode"]);
      this.changedNode = { ...this.changedNode, [date.key]: date };
      this.date = date;
      if (!this.showConfirmButton) {
        this.handleOnConfirm();
      }
    },
    haneleDoubleMode(date) {
      if (!this.fromDate) {
        this.confirmButtonClassName = "disable";
        push(date.className, ["start", "active"]);
        this.setDateValue(date, "mark", this.fromDateMark);
        this.changedNode = { ...this.changedNode, [date.key]: date };
        this.fromDate = date;
      } else {
        if (!this.toDate) {
          if (date.key === this.fromDate.key) {
            if (this.doubleModeAllowSameDate) {
              this.confirmButtonClassName = "active";
              push(this.changedNode[this.fromDate.key].className, "end");
              this.setDateValue(date, "mark", this.toDateMark);
              this.toDate = date;
              if (!this.showConfirmButton) {
                this.handleOnConfirm();
              }
            } else {
              this.confirmButtonClassName = "disable";
              drop(date.className, ["active", "start"]);
              // this.changedNode = { ...this.changedNode, [date.key]: date };
              this.changedNode = {};
              this.fromDate = null;
            }
          } else {
            this.confirmButtonClassName = "active";
            if (this.fromDate.ynDate.isAfter(date.ynDate)) {
              drop(this.changedNode[this.fromDate.key].className, "start");
              push(this.changedNode[this.fromDate.key].className, "end");
              this.setDateValue(
                this.changedNode[this.fromDate.key],
                "mark",
                this.toDateMark
              );
              this.toDate = this.fromDate;
              this.fromDate = date;
              push(date.className, "start");
              this.setDateValue(date, "mark", this.fromDateMark);
            } else {
              push(date.className, "end");
              this.setDateValue(date, "mark", this.toDateMark);
              this.toDate = date;
            }
            push(date.className, "active");
            this.changedNode = { ...this.changedNode, [date.key]: date };
            if (!this.showConfirmButton) {
              this.handleOnConfirm();
            }
          }
        } else {
          this.confirmButtonClassName = "disable";
          this.toDate = null;
          drop(date.className, "during-active");
          push(date.className, ["start", "active"]);
          this.setDateValue(date, "mark", this.fromDateMark);
          this.fromDate = date;
          this.changedNode = { [date.key]: date };
        }
      }
    },
    handleOnConfirm() {
      if (this.confirmButtonClassName !== "active") {
        return false;
      }
      this.close();
      if (this.mode === "double") {
        this.$emit("getDate", { fromDate: this.fromDate, toDate: this.toDate });
      } else {
        this.$emit("getDate", { date: this.date });
      }
    },
    getTimePeriod() {
      const beginDate = YnDate().substract(Number(this.before), this.unit);
      const endDate = YnDate().add(Number(this.after), this.unit);
      this.beginDate = beginDate.format();
      this.endDate = endDate.format();
      return YnDate().getMonthPeriod(beginDate, endDate);
    },
    generateDate() {
      const caculatedMonth = this.getTimePeriod();
      const caculatedDates = [];
      caculatedMonth.forEach(item => {
        const monthObject = {
          dates: []
        };
        const [year, month] = item.split("-");
        const daysOfMonth = YnDate(year, month).getDaysCountOfMonth();
        for (let i = 1; i <= daysOfMonth; i++) {
          let j = i < 10 ? `0${i}` : String(i);
          if (j === "01") {
            for (let k = 0; k < YnDate(year, month, j).getDay(); k++) {
              monthObject["dates"].push({
                className: [],
                key: `year_month_date_${k}`
              });
            }
          }
          const className = [];
          const ynDate = YnDate(year, month, j);
          push(
            className,
            YnDate().isAfter(year, month, j) ? "disable" : "clickable"
          );
          if (this.mode === "double" && this.fromDate && this.toDate) {
            push(
              className,
              YnDate(year, month, j).isBetween(
                this.fromDate.ynDate,
                this.toDate.ynDate
              )
                ? "during-active"
                : ""
            );
          }
          if (this.beginDate && this.endDate) {
            if (
              YnDate(year, month, j).isBetweenIncludeBoth(
                this.beginDate,
                this.endDate
              )
            ) {
              push(className, ["open-days", "clickable"]);
              drop(className, "disable");
            } else {
              push(className, "disable");
              drop(className, "clickable");
            }
          }
          monthObject["key"] = `${year}-${month}`;
          monthObject["month"] = month;
          monthObject["year"] = year;
          const festival = YnDate().isSame(year, month, j)
            ? this.todayMark
            : "";
          const key = `${year}-${month}-${j}`;
          if (this.changedNode[key]) {
            monthObject["dates"].push({ ...this.changedNode[key] });
          } else {
            monthObject["dates"].push({
              key,
              year,
              month,
              day: j,
              week: ynDate.getDay(),
              date: key,
              className,
              ynDate,
              mark: "",
              festival
            });
          }
        }
        caculatedDates.push(monthObject);
      });
      return caculatedDates;
    },
    getDefaultNodeFromProps(prop, className = []) {
      const key = this[prop];
      const [year, month, day] = key.split("-");
      const festival = YnDate().isSame(year, month, day) ? this.todayMark : "";
      const ynDate = YnDate(year, month, day);
      return {
        key,
        ynDate,
        year,
        month,
        day,
        date: key,
        week: ynDate.getDay(),
        className: ["active", "clickable", ...className],
        mark: "",
        festival
      };
    },
    setDateValue(date, attr, value) {
      date[attr] = value;
    },
    highLightDefault() {
      if (this.mode === "double") {
        const startNode = this.getDefaultNodeFromProps("defaultStartDate", [
          "start"
        ]);
        this.setDateValue(startNode, "mark", this.fromDateMark);
        const endNode = this.getDefaultNodeFromProps("defaultEndDate", ["end"]);
        this.setDateValue(endNode, "mark", this.toDateMark);
        this.changedNode = {
          [startNode.key]: startNode,
          [endNode.key]: endNode
        };
        this.fromDate = startNode;
        this.toDate = endNode;
      } else {
        const node = this.getDefaultNodeFromProps("defaultDate", [
          "single-mode",
          "open-days"
        ]);
        this.changedNode = { [node.key]: node };
      }
    },
    setPosition() {
      this.rendered(() => {
        const el = this.$refs.scrollPosition.$el;
        const parent = this.$refs.popup.$el;
        this.$refs.scroller.$el.scrollTop =
          getOffset(el).top -
          this.$refs.header.$el.offsetHeight -
          getOffset(parent).top;
      });
    },
    handleBeforeEnter() {
      this.$emit("beforeEnter");
    },
    handleAfterEnter() {
      this.$emit("afterEnter");
      this.setPosition();
    },
    handleBeforeLeave() {
      this.$emit("beforeLeave");
    },
    handleAfterLeave() {
      this.$emit("afterLeave");
    },
    createDate(h) {
      const dates = this.generateDate();
      const caculateDOM = [];
      dates.forEach(monthItem => {
        caculateDOM.push(
          h(
            "div",
            {
              class: ["yn-calendar-month", monthItem.month],
              key: monthItem.key
            },
            [
              h(
                "h4",
                {
                  class: ["yn-calendar-month-title"],
                  domProps: {
                    innerHTML: `${monthItem.year}-${monthItem.month}`
                  }
                },
                []
              ),
              h(
                "yn-flex",
                {
                  key: `yn_flex_${monthItem.key}`,
                  class: ["yn-calendar-flex"],
                  props: {
                    flexWrap: "wrap",
                    justifyContent: "spaceAround",
                    fixBottomLine: true
                  }
                },
                [
                  (() => {
                    const dateDom = [];
                    monthItem.dates.forEach(date => {
                      // console.log(date.className);
                      let ref = null;
                      if (
                        date.className.indexOf("single-mode") > -1 ||
                        date.className.indexOf("start") > -1
                      ) {
                        ref = "scrollPosition";
                      }
                      dateDom.push(
                        h(
                          "yn-flex-item",
                          {
                            key: date.key,
                            class: ["yn-calendar-date", ...date.className],
                            // domProps: { innerHTML: date.day },
                            ref,
                            nativeOn: {
                              click: this.handleClick.bind(this, date)
                            }
                          },
                          [
                            h(
                              "yn-flex",
                              {
                                props: {
                                  flexDirection: "column",
                                  justifyContent: "spaceBetween"
                                }
                              },
                              [
                                h(
                                  "yn-flex-item",
                                  { class: ["yn-calendar-date-festival"] },
                                  date.festival
                                ),
                                h(
                                  "yn-flex-item",
                                  { class: ["yn-calendar-date-text"] },
                                  date.day
                                ),
                                h(
                                  "yn-flex-item",
                                  { class: ["yn-calendar-date-mark"] },
                                  date.mark
                                )
                              ]
                            )
                          ]
                        )
                      );
                    });
                    return dateDom;
                  })()
                ]
              )
            ]
          )
        );
      });
      return caculateDOM;
    },
    createHeaderArea(h) {
      return h("div", {}, [
        this.createCloseIcon(h),
        this.createTitle(h),
        this.createWeekBar(h)
      ]);
    },
    createFooterArea(h) {
      if (this.showConfirmButton) {
        return h(
          "yn-flex-item",
          {
            class: ["yn-calendar-footer"]
          },
          [
            h("div", {
              class: [
                "yn-calendar-confirm-button",
                this.confirmButtonClassName
              ],
              on: { click: this.handleOnConfirm },
              domProps: { innerHTML: this.confirmText }
            })
          ]
        );
      } else {
        return [];
      }
    },
    createCloseIcon(h) {
      return h(
        "yn-iconfont",
        {
          class: ["yn-calendar-close"],
          props: { name: "iconcancle_circle", size: 24 },
          nativeOn: { click: this.close }
        },
        []
      );
    },
    close() {
      this.$emit("input", false);
    },
    getTitle() {
      const title = Array.isArray(this.title) ? this.title : [this.title];
      const [defaultTitle = "", firstClickTitle = "", secondClickTitle] = title;
      if (this.mode === "single") {
        return defaultTitle;
      } else {
        if (!this.fromDate && !this.toDate) {
          return firstClickTitle || defaultTitle;
        } else if (this.fromDate && !this.toDate) {
          return secondClickTitle || defaultTitle;
        } else if (this.fromDate && this.toDate) {
          return defaultTitle;
        }
      }
    },
    createTitle(h) {
      return h(
        "div",
        {
          class: ["yn-calendar-header-title"],
          domProps: { innerHTML: this.getTitle() }
        },
        []
      );
    },
    createWeekBar(h) {
      const bar = [];
      for (let i = 0; i < 7; i++) {
        bar.push(
          h("yn-flex-item", { key: i }, [
            h("span", { domProps: { innerHTML: this.weekText[i] } }, [])
          ])
        );
      }
      return h("div", { class: ["yn-calendar-week-bar"] }, [
        h(
          "yn-flex",
          { key: "yn_flex_week_bar", props: { justifyContent: "spaceAround" } },
          bar
        )
      ]);
    },
    handleChange(e) {
      this.$emit("input", e);
    }
  },
  created() {
    this.highLightDefault();
  },
  render(h) {
    return h("div", { class: ["yn-calendar"] }, [
      h(
        "yn-popup",
        {
          on: {
            input: this.handleChange,
            beforeEnter: this.handleBeforeEnter,
            afterEnter: this.handleAfterEnter,
            beforeLeave: this.handleBeforeLeave,
            afterLeave: this.handleAfterLeave
          },
          directives: [{ name: "show", value: this.value }],
          props: { position: "bottom" },
          style: { height: "90%" },
          ref: "popup"
        },
        [
          h(
            "yn-flex",
            {
              class: ["yn-calendar-content"],
              props: { flexDirection: "column" }
            },
            [
              h(
                "yn-flex-item",
                { class: ["yn-calendar-header"], ref: "header" },
                [this.createHeaderArea(h)]
              ),
              h(
                "yn-flex-item",
                {
                  ref: "scroller",
                  class: ["yn-calendar-body"],
                  props: { flex: 1 }
                },
                [h("div", {}, [this.createDate(h)])]
              ),
              this.createFooterArea(h)
            ]
          )
        ]
      )
    ]);
  }
};
