<template>
  <div>
    <h2>yui-tabs</h2>
    <div class="box">
      <yui-tabs v-model="active" @change="change">
        <yui-tab-item :key="index" :title="'Tab' + index" v-for="index in 4">
          content of tab {{ index }}
        </yui-tab-item>
      </yui-tabs>
    </div>
    <div class="box">
      <yui-tabs v-model="active2" @click="handleClick">
        <yui-tab-item
          :key="index"
          :title="'Tab' + index"
          v-for="index in 8"
          :disabled="index === 4"
        >
          content of tab {{ index }}
        </yui-tab-item>
      </yui-tabs>
    </div>
    <div class="box">
      <yui-tabs v-model="active2">
        <yui-tab-item :key="index" :title="'Tab' + index" v-for="index in 2">
          content of tab {{ index }}
        </yui-tab-item>
      </yui-tabs>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "YnTabsPage",
  data() {
    return {
      active: 1,
      active2: 1
    };
  },
  methods: {
    change(e) {
      this.Toast(`${e.value} changed`);
    },
    handleClick(e) {
      if (e.disabled) {
        this.Toast(`${e.value} is disabled`);
      } else {
        this.Toast(`${e.value} clicked`);
      }
    }
  }
};
</script>

<style type="text/css" scoped="scoped">
.box {
  margin: 30px auto;
}
</style>
