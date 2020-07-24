<template>
  <div class="spin">
    <div>
      <h4>triple-bounce</h4>
      <yui-spin type="triple-bounce"></yui-spin>
    </div>
    <div>
      <h4>snake</h4>
      <yui-spin type="snake"></yui-spin>
    </div>
    <div>
      <h4>fading-circle</h4>
      <yui-spin type="fading-circle"></yui-spin>
    </div>
    <div>
      <h4>double-bounce</h4>
      <yui-spin type="double-bounce"></yui-spin>
    </div>
    <div>
      <h4>rotate</h4>
      <yui-spin type="rotate" :size="50"></yui-spin>
    </div>
  </div>
</template>

<script>
export default {
  name: "YnSpinPage"
};
</script>
