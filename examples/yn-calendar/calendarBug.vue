<template>
  <div>
    <h2>yn-calendar</h2>
    <ul>
      <li>
        <div>
          <yn-button @click="handleOpenCalendar('calendar9')"
            >一年前日期到一年后日期</yn-button
          >
        </div>
        <span>已选择时间：{{ calendar9Date }}</span>
        <hr />
      </li>
    </ul>
    <yn-calendar
      before="-1"
      after="4"
      v-model="calendar9"
      unit="days"
      mode="double"
    ></yn-calendar>
  </div>
</template>

<script>
const moment = require("moment");
export default {
  name: "YnCalendarBugPage",
  data() {
    return {
      calendar1: false,
      calendar1Date: "",
      calendar2: false,
      calendar2Date: "",
      calendar3: false,
      calendar3Date: "",
      defaultDate: moment()
        .add(1, "d")
        .format("YYYY-MM-DD"),
      calendar4: false,
      calendar4Date: "",
      defaultStartDate: moment()
        .add(-4, "d")
        .format("YYYY-MM-DD"),
      defaultEndDate: moment()
        .add(5, "d")
        .format("YYYY-MM-DD"),
      calendar5: false,
      calendar5Date: "",
      calendar6: false,
      calendar6Date: "",
      calendar7: false,
      calendar7Date: "",
      calendar8: false,
      single: false,
      double: true,
      calendar8Date: "",
      calendar9Date: "",
      calendar9: false
    };
  },
  computed: {
    getModel() {
      if (this.single) {
        return "single";
      } else if (this.double) {
        return "double";
      }
      return "";
    }
  },
  methods: {
    handleAfterLeave() {
      this.Toast("关闭完成的回调事件触发");
    },
    handleOpenCalendar(attr) {
      this[attr] = !this[attr];
    },
    handleOnGetDate1(date) {
      console.log(date);
      this.calendar1Date = date.date.date;
    },
    handleOnGetDate2(date) {
      this.calendar2Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleOnGetDate3(date) {
      console.log(date);
      this.calendar3Date = date.date;
    },
    handleOnGetDate4(date) {
      this.calendar4Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleOnGetDate5(date) {
      this.calendar5Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleOnGetDate6(date) {
      this.calendar6Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleOnGetDate7(date) {
      this.calendar7Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleOnGetDate8(date) {
      this.calendar8Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleOnGetDate9(date) {
      this.calendar9Date = date.fromDate.date + " ~ " + date.toDate.date;
      console.log(date);
    },
    handleChange(e, args) {
      if (args === "single") {
        if (e) {
          this.double = false;
        } else {
          this.single = true;
        }
      } else if (args === "double") {
        if (e) {
          this.single = false;
        } else {
          this.double = true;
        }
      }
    }
  }
};
</script>
<style type="text/css" scoped="scoped">
hr {
  border: 0.5px solid #e4e4e4;
}
ul {
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: none;
}
ul li {
  margin: 20px auto;
}
</style>
