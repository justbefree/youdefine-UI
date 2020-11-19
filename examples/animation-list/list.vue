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
      <yn-animation-list :dataList="dataList">
        <yn-animation-list-item style="borderBottom: 1px solid #eee;line-height: 40px" height="40" v-for="i in dataList" :key="i">
          <span>这是第{{i}}个元素</span>
        </yn-animation-list-item>
      </yn-animation-list>
      <yn-spin type="triple-bounce"></yn-spin>
    </div>
    <div slot="footer">footer</div>
  </yn-layout> -->
  <div>
    <yn-button @click="filter">数组反转</yn-button>
    <yn-animation-list :dataList="asyncData" :animation="animation">
      <yn-animation-list-item :animation="animation" style="borderBottom: 1px solid #eee;line-height: 100px" height="100" v-for="i in asyncData" :key="i.index">
        <span>这是第{{i.index}}个元素</span>
      </yn-animation-list-item>
    </yn-animation-list>
  </div>
</template>
<script>
export default {
  name: "YnAnimationListPage",
  data() {
    const dataList = [];
    for (let i = 0; i < 20; i++) {
      dataList.push(i);
    }
    return {
      showHeader: true,
      dataList,
      asyncData: [],
      animation: true
    };
  },
  methods: {
    filter() {
      // this.asyncData.reverse();
      this.animation = false;
      const shuffle = this.shuffle(this.asyncData);
      console.log("过滤", shuffle);
      this.asyncData = JSON.parse(JSON.stringify([...shuffle]));
      // this.asyncData = [];
      // this.asyncData = [10, 9, 8];
    },
    getData() {
      console.log("getData");
      const timer = setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.asyncData.push({ index: i });
        }
        clearTimeout(timer);
      }, 1000);
    },
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
    },
    shuffle(aArr) {
      let iLength = aArr.length
        , i = iLength
        , nTemp
        , iRandom;
      while ( i-- ) {
        if (i !== (iRandom = Math.floor(Math.random()*iLength))) { // 不是同一个数组项的前提下进行互换
          nTemp = aArr[i];
          aArr[i] = aArr[iRandom];
          aArr[iRandom] = nTemp;
        }
      }
      return aArr;
    }
  },
  mounted() {
    this.getData();
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
