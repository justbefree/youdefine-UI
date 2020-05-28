<template>
  <div>
    <h2>yui-flex 在学不会flex说不过去啊</h2>
    <a target="_blank" href="https://wow.techbrood.com/fiddle/8177"
      >查看原案例</a
    >
    <yui-flex justifyContent="center" alignItems="center" class="face">
      <transition>
        <!-- 加一层<transition>也是可以的，其他元素就不行了哦，暂时不支持<transition-group> -->
        <yui-flex-item class="dot"></yui-flex-item>
      </transition>
    </yui-flex>
    <hr />
    <yui-flex justifyContent="spaceBetween" class="face">
      <yui-flex-item class="dot"></yui-flex-item>
      <yui-flex-item class="dot" align-self="flex-end"></yui-flex-item>
    </yui-flex>
    <hr />
    <yui-flex justifyContent="spaceBetween" class="face">
      <yui-flex-item class="dot"></yui-flex-item>
      <yui-flex-item class="dot" align-self="center"></yui-flex-item>
      <yui-flex-item class="dot" align-self="flex-end"></yui-flex-item>
    </yui-flex>
    <hr />
    <yui-flex justifyContent="spaceBetween" flexDirection="column" class="face">
      <yui-flex-item>
        <yui-flex justifyContent="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
      <yui-flex-item>
        <yui-flex justifyContent="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
    </yui-flex>
    <hr />
    <yui-flex justifyContent="spaceBetween" flexDirection="column" class="face">
      <yui-flex-item>
        <yui-flex justifyContent="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
      <yui-flex-item>
        <yui-flex justify-content="center">
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
      <yui-flex-item>
        <yui-flex justifyContent="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
    </yui-flex>
    <hr />
    <yui-flex justifyContent="spaceBetween" flexDirection="column" class="face">
      <yui-flex-item>
        <yui-flex justifyContent="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
      <yui-flex-item>
        <yui-flex justify-content="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
      <yui-flex-item>
        <yui-flex justifyContent="spaceBetween">
          <yui-flex-item class="dot"></yui-flex-item>
          <yui-flex-item class="dot"></yui-flex-item>
        </yui-flex>
      </yui-flex-item>
    </yui-flex>
  </div>
</template>
<script>
export default {
  name: "YnFlexPage",
  data() {
    return {};
  }
};
</script>
<style>
.face {
  margin: 16px;
  padding: 4px;
  background-color: #e7e7e7;
  width: 104px;
  height: 104px;
  -o-object-fit: contain;
  object-fit: contain;
  box-shadow: inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7,
    inset -5px 0 #d7d7d7;
  border-radius: 10%;
}
.dot {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 4px;
  background-color: #333;
  box-shadow: inset 0 3px #111, inset 0 -3px #555;
}
</style>
