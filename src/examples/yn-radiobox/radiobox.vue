<template>
  <div>
    <h2>radiobox</h2>
    <yn-radiobox v-model="checked" @change="handleChange"></yn-radiobox>
    <span>这个可以点击</span>
    <span>当前状态{{ checked }}</span>
    <hr />
    <yn-radiobox :checked="value"></yn-radiobox>
    <span>这个不支持点击</span>
  </div>
</template>

<script>
export default {
  name: "YnRadioboxPage",
  data() {
    return {
      checked: true,
      value: true
    };
  },
  methods: {
    handleChange(e) {
      console.log("改变了", e);
    }
  }
};
</script>
