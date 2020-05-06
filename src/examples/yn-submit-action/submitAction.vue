<template>
  <div>
    <h2>yn-submit-action</h2>
    <div class="box">
      <span v-if="disabled">提交中禁止多次点击</span>
      <span v-else>可以提交</span>
      <yn-submit-action
        :showIcon="false"
        label="已选:"
        submitText="确定"
        :disabled="disabled"
        @submit="handleSubmit"
      >
        <yn-submit-action-value>
          <span class="rewrite">(2人)</span>
        </yn-submit-action-value>
        <yn-submit-action-popup-content>
          <ul>
            <li>liyan</li>
            <li>wangshengzi</li>
            <li>xionglonghui</li>
            <li>keyanqin</li>
          </ul>
        </yn-submit-action-popup-content>
      </yn-submit-action>
    </div>
    <div class="box">
      <h4>固定在底部</h4>
      <yn-submit-action
        fixed
        submitText="确认退票"
        @submit="handleSubmit2"
        label="应退金额参考:"
      >
        <yn-submit-action-popup-content>
          <ul>
            <li>这里是自定义内容</li>
            <li>这里是自定义内容</li>
          </ul>
        </yn-submit-action-popup-content>
      </yn-submit-action>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "YnSubmitActionPage",
  data() {
    return {
      disabled: false
    };
  },
  methods: {
    handleSubmit() {
      this.disabled = true;
      setTimeout(() => {
        this.Toast("提交成功");
        this.disabled = false;
      }, 2000);
    },
    handleSubmit2() {
      this.Toast("提交成功");
    }
  }
};
</script>

<style type="text/css" scoped="scoped">
.box {
  margin: 150px auto;
}
ul {
  padding: 0;
  margin: 0;
}
.rewrite {
  font-size: 12px;
}
</style>
