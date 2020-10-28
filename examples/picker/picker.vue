<template>
  <div>
    <h2>yn-picker</h2>
    <ul>
      <li @click="handleClick(1)">single picker</li>
      <li @click="handleClick(2)">multiple picker</li>
      <li @click="handleClick(3)">multiple picker2</li>
      <li @click="handleClick(4)">只有一个数据</li>
    </ul>
    <yn-picker
      v-model="show1"
      :columns="columns1"
      @change="handleChange"
    ></yn-picker>
    <yn-picker
      v-model="show2"
      :columns="columns2"
      @change="handleChange"
    ></yn-picker>
    <yn-picker
      @confirm="handleConfirm"
      v-model="show3"
      :columns="columns3"
      @change="handleChange"
    ></yn-picker>
    <yn-picker
      v-model="show4"
      :columns="columns4"
      @change="handleChange"
    ></yn-picker>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "YnPickerPage",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      // columns1: ["Delaware", "Florida"]
      columns1: [
        "Delaware",
        "Florida",
        "Georqia",
        "Indiana",
        "Maine",
        "Amenda"
      ],
      columns2: [
        { value: ["Delaware", "Florida", "Georqia", "Indiana", "Maine"] },
        { value: ["Delaware", "Florida", "Georqia", "Indiana", "Maine"] }
      ],
      columns3: [
        { value: ["Delaware", "Florida", "Georqia", "Indiana", "Maine"] },
        { value: ["Delaware", "Florida", "Georqia", "Indiana", "Maine"] },
        { value: ["Delaware", "Florida", "Georqia", "Indiana", "Maine"] }
      ],
      columns4: ["Delaware"]
    };
  },
  methods: {
    handleChange(pick, index) {
      console.log(`选择第${index}个，值为${pick}`);
      this.Toast(`选择第${index}个，值为${pick}`);
    },
    handleClick(i) {
      this[`show${i}`] = !this[`show${i}`];
    },
    handleConfirm(e) {
      this.Toast(JSON.stringify(e));
      console.log("confirm", e);
    }
  }
};
</script>
