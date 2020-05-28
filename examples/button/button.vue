<template>
  <div class="button-box">
    <h2>yui-button</h2>
    <yui-button @click="handleClick"><span>这是文案，可点击</span></yui-button>
    <hr />
    <yui-button disabled><span>禁止点击</span></yui-button>
    <hr />
    <yui-button :loading="true" loadingColor="red"
      ><span>这是文案</span></yui-button
    >
    <hr />
    <yui-button :loading="true" size="large" loadingColor="green"
      ><span>这是文案</span></yui-button
    >
    <hr />
    <yui-button :loading="true" size="small"
      ><span>我不可以点击</span></yui-button
    >
    <hr />
    <yui-button type="danger">危险</yui-button>
    <hr />
    <yui-button type="primary">主题色</yui-button>
    <hr />
    <yui-button type="warning">警告</yui-button>
    <hr />
    <yui-button type="primary" plain>plain</yui-button>
    <hr />
    <yui-button type="warning" plain>plain</yui-button>
    <hr />
    <yui-button :loading="true" loadingText="loading text">plain</yui-button>
    <hr />
    <yui-button iconName="iconback" iconColor="red">button with icon</yui-button>
  </div>
</template>
<script>
export default {
  name: "YnButtonPage",
  methods: {
    handleClick() {
      console.log("接收到click事件");
      alert("我被点击了~~");
    }
  }
};
</script>
<style type="text/css">
.button-box {
  text-align: center;
}
hr {
  border: none;
}
</style>
