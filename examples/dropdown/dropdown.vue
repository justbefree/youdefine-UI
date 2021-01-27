<template>
  <div>
    <h2>yn-dropdown</h2>
    <yn-dropdown ref="dropdown">
      <yn-button slot="target" @click="toggle">以下</yn-button>
      <div slot="content">里面是内容</div>
    </yn-dropdown>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "YnDropdownPage",
  data() {
    return {
    };
  },
  methods: {
    toggle() {
      this.$refs.dropdown.toggle();
    }
  }
};
</script>
<style type="text/css" scoped>
.box {
  height: 300px;
}
</style>
