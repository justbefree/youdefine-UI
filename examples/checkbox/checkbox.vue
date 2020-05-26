<template>
  <div>
    <h2>yui-checkbox</h2>
    <yui-checkbox v-model="checked" @change="handleClick"></yui-checkbox>
    <span>当前状态{{ checked }}</span>
    <hr />
    <yui-checkbox :checked="value"></yui-checkbox>
    <span>此状态不可修改{{ value }}</span>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "YnCheckboxPage",
  data() {
    return {
      checked: false,
      value: true
    };
  },
  methods: {
    handleClick(e) {
      console.log("改变状态了", e);
    }
  }
};
</script>
