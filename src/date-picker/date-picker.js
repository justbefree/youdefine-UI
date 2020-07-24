/*
 * @Author: Just be free
 * @Date:   2020-04-29 10:58:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-07-24 14:16:29
 * @E-mail: justbefree@126.com
 */
import { defineComponent, genComponentName } from "../modules/component";
import Picker from "../picker";
import { YnDate, validateFormatedDate } from "../modules/date";
const now = YnDate().getToday();
const year = now.getFullYear();
const m = now.getMonth();
const month = m < 10 ? `0${m}` : m;
const d = now.getDate();
const date = d < 10 ? `0${d}` : d;
export default defineComponent({
  name: "DatePicker",
  components: { Picker },
  props: {
    value: Boolean,
    start: {
      type: String,
      default: `${year - 100}-${month}-${date}`
    },
    end: {
      type: String,
      default: `${year}-${month}-${date}`
    },
    defaultDate: String
  },
  data() {
    return {
      year: "",
      month: "",
      date: "",
      dayCount: YnDate(year - 30, month, date).getDaysCountOfMonth(),
      monthStart: 1,
      monthEnd: 12,
      dateStart: 1,
      dateEnd: 31,
      computedColumns: [],
      defaultDisplayDate: ""
    };
  },
  initPropsToData() {
    return [];
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    handleOnConfirm(e) {
      this.$emit("confirm", {
        e,
        month: this.month,
        date: this.date,
        year: this.year,
        dateInstance: YnDate(this.year, this.month, this.date)
      });
      this.close();
    },
    updateMonthDayCount() {
      this.dayCount = YnDate(this.year, this.month, "01").getDaysCountOfMonth();
    },
    genDate(startDate, endDate) {
      this.updateMonthDayCount();
      const defaultIndex = this.computedColumns[2].defaultIndex;
      const dates = [];
      for (let i = startDate; i <= endDate; i++) {
        dates.push(i);
      }
      if (defaultIndex < dates.length) {
        this.date = dates[defaultIndex];
      } else {
        this.computedColumns[2].defaultIndex = 0;
        this.date = dates[0];
      }
      this.computedColumns[2].value = dates;
    },
    genMonth(startMonth, endMonth, extendParams = {}) {
      const defaultIndex = this.computedColumns[1].defaultIndex;
      const months = [];
      for (let i = startMonth; i <= endMonth; i++) {
        months.push(i);
      }
      if (defaultIndex < months.length) {
        this.month = months[defaultIndex];
      } else {
        this.computedColumns[1].defaultIndex = 0;
        this.month = months[0];
      }
      this.computedColumns[1].value = months;
      if (extendParams.trigger) {
        if (extendParams.trigger === "start") {
          if (this.month === startMonth) {
            this.genDate(extendParams.startDate, this.dayCount);
          } else {
            this.genDate(1, this.dayCount);
          }
        } else if (extendParams.trigger === "end") {
          if (this.month === endMonth) {
            this.genDate(1, extendParams.endDate);
          } else {
            this.genDate(1, this.dayCount);
          }
        }
      } else {
        this.genDate(1, this.dayCount);
      }
    },
    handleChange(e, i, key) {
      const [startYear, startMonth, startDate] = this.start.split("-");
      const [endYear, endMonth, endDate] = this.end.split("-");
      if (key === 1) { // 月变化
        this.month = e;
        if (Number(e) === Number(startMonth)) {
          this.genDate(startDate, this.dayCount);
        } else if (Number(e) === Number(endMonth)) {
          this.genDate(1, endDate);
        } else {
          this.genDate(1, this.dayCount);
        }
      } else if (key === 0) { // 年变化
        this.year = e;
        if (Number(startYear) === Number(endYear)) {
          this.genMonth(startMonth, endMonth);
        } else {
          if (Number(e) === Number(startYear)) {
            this.genMonth(Number(startMonth), 12, { trigger: "start", startDate });
          } else if (Number(e) === Number(endYear)) {
            this.genMonth(1, Number(endMonth), { trigger: "end", endDate });
          } else {
            this.genMonth(1, 12);
          }
        }
      } else if (key === 2) { // 日变化
        this.date = e;
      }
    },
    getDefaultIndex(arr, type) {
      const index = arr.indexOf(Number(this[type]));
      if (index < 0) {
        this[type] = arr[0];
      }
      return index > -1 ? index : 0;
    },
    genColumns() {
      const columns = [];
      if (
        !validateFormatedDate(this.start) ||
        !validateFormatedDate(this.end)
      ) {
        return columns;
      }
      const year = [];
      const month = [];
      const date = [];
      const [startYear] = this.start.split("-");
      const [endYear] = this.end.split("-");
      for (let i = startYear; i <= endYear; i++) {
        // 创建年集合
        year.push(i);
      }
      columns.push({ value: year, defaultIndex: this.getDefaultIndex(year, "year") });
      for (let i = this.monthStart; i <= this.monthEnd; i++) {
        month.push(i);
      }
      columns.push({ value: month, defaultIndex: this.getDefaultIndex(month, "month") });
      for (let i = this.dateStart; i <= this.dateEnd; i++) {
        date.push(i);
      }
      columns.push({ value: date, defaultIndex: this.getDefaultIndex(date, "date") });
      return columns;
    },
    initData() {
      if (validateFormatedDate(this.defaultDate)) {
        this.defaultDisplayDate = this.defaultDate;
      } else {
        this.defaultDisplayDate = this.end;
      }
      const [y, m, d] = this.defaultDisplayDate.split("-");
      this.year = Number(y);
      this.month = Number(m);
      this.date = Number(d);
      // const [, startMonth, startDate] = this.start.split("-");
      // this.monthStart = 1;
      // this.dateStart = 1;
      const [, endMonth, endDate] = this.end.split("-");
      this.monthEnd = Number(endMonth);
      this.dateEnd = Number(endDate);
    },
    handleBeforeEnter() {
      this.$emit("beforeEnter");
    },
    handleEnter() {
      this.$emit("enter");
    },
    handleAfterEnter() {
      this.$emit("afterEnter");
    },
    handleBeforeLeave() {
      this.$emit("beforeLeave");
    },
    handleLeave() {
      this.$emit("leave");
    },
    handleAfterLeave() {
      this.$emit("afterLeave");
    }
  },
  created() {
    this.initData();
    this.computedColumns = this.genColumns();
  },
  render(h) {
    return h("div", { class: ["yn-date-picker"] }, [
      h(
        genComponentName("picker"),
        {
          on: {
            confirm: this.handleOnConfirm,
            close: this.close,
            change: this.handleChange,
            beforeEnter: this.handleBeforeEnter,
            enter: this.handleEnter,
            afterEnter: this.handleAfterEnter,
            beforeLeave: this.handleBeforeLeave,
            leave: this.handleLeave,
            afterLeave: this.handleAfterLeave
          },
          props: { columns: this.computedColumns, value: this.value }
        },
        []
      )
    ]);
  }
});
