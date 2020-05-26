<template>
  <div>
    <h2>yui-popup</h2>
    <hr />
    <ul>
      <li>
        <yui-button @click="handleClick(1)">底部出现遮罩</yui-button>
      </li>
      <li>
        <yui-button @click="handleClick(2)">右侧出现遮罩</yui-button>
      </li>
      <li>
        <yui-button @click="handleClick(3)">上面出现遮罩</yui-button>
      </li>
      <li>
        <yui-button @click="handleClick(4)">双层嵌套</yui-button>
      </li>
      <li>
        <yui-button @click="handleClick(6)">中间fade</yui-button>
      </li>
    </ul>
    <yui-popup v-model="popup1" position="bottom">
      <div class="popup-content">
        底部出现遮罩
        <template v-for="item in 10">
          <h3 :key="item">我是{{ item }}</h3>
        </template>
      </div>
    </yui-popup>
    <yui-popup v-model="popup2" position="right" :showCloseIcon="true">
      <div class="popup-content">右侧出现遮罩</div>
    </yui-popup>
    <yui-popup v-model="popup3" position="top" :showCloseIcon="true">
      <div class="popup-content">上面出现遮罩</div>
    </yui-popup>
    <yui-popup v-model="popup4" position="bottom" :showCloseIcon="true">
      <div class="popup-content">
        <yui-button @click="handleClick(5)">打开内层</yui-button>
        上面出现遮罩
        <yui-popup v-model="popup5" position="bottom">
          <div class="popup-content">
            内层嵌套
          </div>
        </yui-popup>
      </div>
    </yui-popup>
    <yui-popup v-model="popup6" position="middle" :showCloseIcon="true" fixed>
      <div class="popup-content">中间fade</div>
    </yui-popup>
  </div>
</template>
<script>
import "./style.less";
export default {
  name: "YnPopupPage",
  data() {
    return {
      popup1: false,
      popup2: false,
      popup3: false,
      popup4: false,
      popup5: false,
      popup6: false
    };
  },
  methods: {
    handleClick(num) {
      this[`popup${num}`] = !this[`popup${num}`];
    }
  }
};
</script>
<style type="text/css" scoped="scoped">
ul {
  list-style: none;
}
ul li {
  margin: 10px auto;
}
</style>
