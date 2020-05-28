<template>
  <div>
    <h2>yui-swipe</h2>
    <div class="box">
      <h3>左右滑动轮播图</h3>
      <yui-swipe ref="swipe1" indicatorType="number">
        <yui-swipe-item>
          <div>
            <img src="./images/apple-1.jpg" />
          </div>
        </yui-swipe-item>
        <yui-swipe-item>
          <img src="./images/apple-2.jpg" />
        </yui-swipe-item>
        <yui-swipe-item>
          <img src="./images/apple-3.jpg" />
        </yui-swipe-item>
        <yui-swipe-item>
          <img src="./images/apple-4.jpg" />
        </yui-swipe-item>
      </yui-swipe>
      <div class="api">
        <span>对外接口</span>
        <yui-button @click="prev('swipe1')">prev</yui-button>
        <yui-button @click="next('swipe1')">next</yui-button>
        <yui-button @click="open('swipe1')">open</yui-button>
        <yui-button @click="open('swipe1')">close</yui-button>
      </div>
    </div>
    <div class="box">
      <h3>上下滑动轮播图</h3>
      <yui-swipe vertical ref="swipe2">
        <yui-swipe-item>
          <img src="./images/apple-1.jpg" />
        </yui-swipe-item>
        <yui-swipe-item>
          <img src="./images/apple-2.jpg" />
        </yui-swipe-item>
        <yui-swipe-item>
          <img src="./images/apple-3.jpg" />
        </yui-swipe-item>
        <yui-swipe-item>
          <img src="./images/apple-4.jpg" />
        </yui-swipe-item>
      </yui-swipe>
      <div class="api">
        <span>对外接口</span>
        <yui-button @click="prev('swipe2')">prev</yui-button>
        <yui-button @click="next('swipe2')">next</yui-button>
        <yui-button @click="next('swipe2')">open</yui-button>
        <yui-button @click="next('swipe2')">close</yui-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "YnSwipePage",
  data() {
    return {};
  },
  methods: {
    prev(ref) {
      console.log(ref);
      this.$refs[ref].prev();
    },
    next(ref) {
      this.$refs[ref].next();
    },
    open(ref) {
      this.$refs[ref].openImageViewer();
    },
    close(ref) {
      this.$refs[ref].closeImageViewer();
    }
  }
};
</script>
<style type="text/css">
.box {
  margin: 20px auto;
  border-bottom: 1px solid #e4e4e4;
}
.api {
  height: 100px;
  line-height: 100px;
}
img {
  width: 100%;
  height: 240px;
}
</style>
