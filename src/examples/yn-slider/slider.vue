<template>
  <div>
    <h2>yn-slider</h2>
    <div class="box">
      <h3>基础用法</h3>
      <span class="display">当前值是 {{ value }}</span>
      <yn-slider v-model="value"></yn-slider>
    </div>
    <div class="box">
      <h3>设置步长为10</h3>
      <span class="display">当前值是 {{ value2 }}</span>
      <yn-slider v-model="value2" step="10"></yn-slider>
    </div>
    <div class="box">
      <h3>自定义拖拽icon</h3>
      <span class="display"></span>
      <yn-slider
        v-model="value3"
        :dragIcon="dragIcon"
        :parse="parse"
        tip
      ></yn-slider>
    </div>
    <div class="box">
      <h3>显示tip {{ value4 }}</h3>
      <span @click="update" class="update">更新</span>
      <span @click="set" class="update">自定义</span>
      <span class="display"></span>
      <yn-slider ref="slider4" v-model="value4" tip></yn-slider>
    </div>
    <span @click="handlePopup">弹框案例</span>
    <yn-popup v-model="visiable">
      <div class="box">
        <yn-slider v-if="visiable" v-model="value5" tip></yn-slider>
      </div>
    </yn-popup>
  </div>
</template>
<script type="text/javascript">
const dragIcon = require("./drag.svg");
export default {
  name: "YnSliderPage",
  data() {
    return {
      visiable: false,
      value: 10,
      value2: 50,
      value3: 0,
      value4: {
        start: 4,
        end: 25
      },
      value5: {
        start: 0,
        end: 100
      },
      dragIcon
    };
  },
  methods: {
    handlePopup() {
      this.visiable = !this.visiable;
    },
    parse(e) {
      if (e === 0) {
        return "最小值";
      } else if (e === 100) {
        return "最大值";
      }
      return `自定义值${e}`;
    },
    update() {
      this.value4 = { start: 0, end: 100 };
    },
    set() {
      this.$refs.slider4.set({ start: 10, end: 50 });
    }
  }
};
</script>
<style type="text/css" scoped="scoped">
.box {
  width: 90%;
  margin: 30px auto;
}
.box .display {
  display: block;
  margin-bottom: 20px;
}
.update {
  display: inline-block;
  margin: 20px 10px;
}
</style>
