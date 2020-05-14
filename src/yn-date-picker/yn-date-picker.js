/*
 * @Author: Just be free
 * @Date:   2020-04-29 10:58:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-13 18:34:32
 * @E-mail: justbefree@126.com
 */
import { defineComponent } from "../modules/component";
import YnPicker from "../yn-picker";
import { YnDate, validateFormatedDate } from "../modules/date";
const now = YnDate().getToday();
const year = now.getFullYear();
const m = now.getMonth();
const month = m < 10 ? `0${m}` : m;
const d = now.getDate();
const date = d < 10 ? `0${d}` : d;
export default defineComponent({
  name: "DatePicker",
  components: { YnPicker },
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
      isLastYear: false,
      isFirstYear: false
    };
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
    updateMonth() {
      this.dayCount = YnDate(this.year, this.month, "01").getDaysCountOfMonth();
    },
    handleChange(e, i, key) {
      const [startYear, startMonth, startDate] = this.start.split("-");
      const [endYear, endMonth, endDate] = this.end.split("-");
      if (key === 0) {
        this.year = e;
        this.updateMonth();
        if (Number(e) === Number(startYear)) {
          // 第一年
          this.isFirstYear = true;
          this.isLastYear = false;
          this.monthStart = Number(startMonth);
          this.monthEnd = 12;
          if (Number(this.month) < Number(startMonth)) {
            // 如果是第一个月，则需要
            this.month = Number(startMonth);
            this.startMonth = Number(startMonth);
            this.updateMonth();
          } else if (Number(this.month) === Number(startMonth)) {
            if (Number(startDate) > Number(this.date)) {
              this.date = startDate;
              this.dateStart = Number(startDate);
            }
          }
        } else if (Number(e) === Number(endYear)) {
          // 最后一年
          this.isLastYear = true;
          this.isFirstYear = false;
          this.monthStart = 1;
          this.monthEnd = Number(endMonth);
          if (Number(this.month) > Number(endMonth)) {
            this.month = Number(endMonth);
            this.updateMonth();
          } else if (Number(this.month) === Number(endMonth)) {
            if (endDate < this.date) {
              this.date = endDate;
            }
          }
        } else {
          this.isFirstYear = false;
          this.isLastYear = false;
          this.monthStart = 1;
          this.monthEnd = 12;
        }
      }
      if (key === 1) {
        this.month = e;
        this.updateMonth();
        if (this.isFirstYear && Number(e) === Number(startMonth)) {
          this.dateStart = Number(startDate);
        } else {
          this.dateStart = 1;
        }
        if (this.isLastYear && Number(e) === Number(endMonth)) {
          this.dateStart = 1;
          this.dateEnd = Number(endDate);
        } else {
          this.dateStart = 1;
          this.dateEnd = this.dayCount;
        }
      }
      if (key === 2) {
        this.date = e;
      }
    },
    getDefaultIndex(arr, type) {
      const index = arr.indexOf(Number(this[type]));
      return index > -1 ? index : 0;
    },
    genColumns() {
      if (
        !validateFormatedDate(this.start) ||
        !validateFormatedDate(this.end)
      ) {
        return;
      }
      if (validateFormatedDate(this.defaultDate)) {
        const [y, m, d] = this.defaultDate.split("-");
        this.year = y;
        this.month = m;
        this.date = d;
      } else {
        const [y, m, d] = this.end.split("-");
        this.year = y;
        this.month = m;
        this.date = d;
      }
      const year = [];
      const month = [];
      const date = [];
      const [startY] = this.start.split("-");
      const [endY] = this.end.split("-");
      for (let i = startY; i <= endY; i++) {
        // 创建年集合
        year.push(i);
      }
      for (let i = this.monthStart; i <= this.monthEnd; i++) {
        month.push(i);
      }
      // this.dateEnd = YnDate(this.year, this.month, "01").getDaysCountOfMonth();
      for (let i = this.dateStart; i <= this.dateEnd; i++) {
        date.push(i);
      }
      return [
        { value: year, defaultIndex: this.getDefaultIndex(year, "year") },
        { value: month, defaultIndex: this.getDefaultIndex(month, "month") },
        { value: date, defaultIndex: this.getDefaultIndex(date, "date") }
      ];
    }
  },
  render(h) {
    return h("div", { class: ["yn-date-picker"] }, [
      h(
        "yn-picker",
        {
          on: {
            confirm: this.handleOnConfirm,
            close: this.close,
            change: this.handleChange
          },
          props: { columns: this.genColumns(), value: this.value }
        },
        []
      )
    ]);
  }
});
