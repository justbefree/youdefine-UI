<template>
  <div>
    <h2>radiobox</h2>
    <yui-radiobox v-model="checked" @change="handleChange"></yui-radiobox>
    <span>这个可以点击</span>
    <span>当前状态{{ checked }}</span>
    <hr />
    <yui-radiobox :checked="value"></yui-radiobox>
    <span>这个不支持点击</span>
  </div>
</template>

<script>
export default {
  name: "YnRadioboxPage",
  data() {
    return {
      checked: true,
      value: true
    };
  },
  methods: {
    handleChange(e) {
      console.log("改变了", e);
    }
  }
};
</script>
