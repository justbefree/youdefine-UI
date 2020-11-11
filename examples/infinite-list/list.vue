<template>
  <!-- <yn-layout
    monitor
    @scroll="handleScroll"
    :showHeader="showHeader"
    @reachBottom="handleReachBottom"
    bottomDistance="500"
    @reachTop="handleReachTop"
    topDistance="100"
  >
    <div slot="header" class="header">header</div>
    <div slot="body">
      <yn-infinite-list :dataList="dataList">
        <yn-infinite-list-item style="borderBottom: 1px solid #eee;line-height: 40px" height="40" v-for="i in dataList" :key="i">
          <span>这是第{{i}}个元素</span>
        </yn-infinite-list-item>
      </yn-infinite-list>
      <yn-spin type="triple-bounce"></yn-spin>
    </div>
    <div slot="footer">footer</div>
  </yn-layout> -->
    <yn-infinite-list>
      <yn-infinite-list-item style="borderBottom: 1px solid #eee;line-height: 40px" height="40" v-for="i in 20" :key="i">
        <span>这是第{{i}}个元素</span>
      </yn-infinite-list-item>
    </yn-infinite-list>
</template>
<script>
export default {
  name: "YnInfiniteListPage",
  data() {
    const dataList = [];
    for (let i = 0; i < 20; i++) {
      dataList.push(i);
    }
    return {
      showHeader: true,
      dataList
    };
  },
  methods: {
    loadMore() {
      const length = this.dataList.length;
      setTimeout(() => {
        for (let i = length; i < 20 + length; i++) {
          this.dataList.push(i);
        }
      }, 1000);
    },
    handleReachBottom() {
      console.log("滚动到底部触发事件了");
      this.Toast("滚动到底部触发事件了");
      this.loadMore();
    },
    handleReachTop() {
      console.log("滚动到顶部了");
      this.Toast("滚动到顶部了");
    },
    handleScroll(e) {
      if (e.diff > 0) {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
      console.log(e, e.diff);
    }
  }
};
</script>
<style type="text/css">
.infinite-list-box {
  text-align: center;
}
hr {
  border: none;
}
</style>
