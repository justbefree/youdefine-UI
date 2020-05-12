<template>
  <div>
    <h2>iconfont</h2>
    <yn-flex justifyContent="spaceAround" flexWrap="wrap" class="flex">
      <yn-flex-item class="flex-item" v-for="(icon, key) in this.iconfontCollections" :key="key">
        <yn-iconfont :name="icon" @click="handleClick"></yn-iconfont>
        <span class="icon-name">{{icon}}</span>
      </yn-flex-item>
    </yn-flex>
  </div>
</template>

<script>
export default {
  name: "YnIconfontPage",
  data() {
    return {
      iconfontCollections: [],
      loaded: false
    };
  },
  methods: {
    handleClick(e) {
      console.log("111111", e);
    },
    loadAllIcons() {
      if (this.loaded) {
        return;
      }
      const validIcons = [];
      const svg = document.querySelector("svg");
      if (!svg) {
        console.log(1, "Make sure the yn-iconfont component was installed.");
        return false;
      }
      const symbol = svg.getElementsByTagName("symbol");
      if (!symbol) {
        console.log(2, "Make sure the yn-iconfont component was installed.");
        return false;
      }
      for (let key in symbol) {
        if (symbol[key] && symbol[key].id) {
          validIcons.push(symbol[key].id);
        }
      }
      this.iconfontCollections = validIcons;
      this.loaded = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadAllIcons();
    });
    window.addEventListener("DOMContentLoaded", () => {
      this.loadAllIcons();
    });
  }
};
</script>
<style type="text/css" scoped="scoped">
  .flex{
    background: #eee;
  }
  .icon-name{
    display: none;
  }
  .flex-item{
    width: 50px;
    margin: 10px;
  }
</style>
