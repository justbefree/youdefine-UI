<template>
  <div>
    <h2>yui-submit-action</h2>
    <div class="box">
      <span v-if="disabled">提交中禁止多次点击</span>
      <span v-else>可以提交</span>
      <yui-submit-action
        :showIcon="false"
        label="已选:"
        submitText="确定"
        :disabled="disabled"
        @submit="handleSubmit"
      >
        <yui-submit-action-value>
          <span class="rewrite">(2人)</span>
        </yui-submit-action-value>
        <yui-submit-action-popup-content>
          <ul>
            <li>liyan</li>
            <li>wangshengzi</li>
            <li>xionglonghui</li>
            <li>keyanqin</li>
          </ul>
        </yui-submit-action-popup-content>
      </yui-submit-action>
    </div>
    <div class="box">
      <h4>固定在底部</h4>
      <yui-submit-action
        fixed
        submitText="确认退票"
        @submit="handleSubmit2"
        label="应退金额参考:"
      >
        <yui-submit-action-popup-content>
          <ul>
            <li>这里是自定义内容</li>
            <li>这里是自定义内容</li>
          </ul>
        </yui-submit-action-popup-content>
      </yui-submit-action>
    </div>
    <div class="box">
      <yn-button @click="handlePopup">弹出</yn-button>
      <yn-popup v-model="popup">
        <div class="full-content">
          <yn-submit-action
            fixed
            submitText="确认退票"
            @submit="handleSubmit3"
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
      </yn-popup>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "YnSubmitActionPage",
  data() {
    return {
      disabled: false,
      popup: false
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
    handlePopup() {
      this.popup = !this.popup;
    },
    handleSubmit2() {
      this.Toast("提交成功");
    },
    handleSubmit3() {
      this.handlePopup();
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
.full-content{
  width: 100%;
  height: 200px;
}
</style>
