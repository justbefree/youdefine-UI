<template>
  <div>
    <h2>iconfont</h2>
    <yn-iconfont name="iconcheckbox-checked" @click="handleClick"></yn-iconfont>
  </div>
</template>

<script>
export default {
  name: "YnIconfontPage",
  methods: {
    handleClick(e) {
      console.log("111111", e);
    }
  }
};
</script>
