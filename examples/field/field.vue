<template>
  <div>
    <h2>yui-field</h2>
    <div class="box">
      <ul>
        <li>
          <span class="label">基础用法</span>
          <yui-field-group>
            <yui-field v-model="basicUsage" placeholder="请输入内容"></yui-field>
          </yui-field-group>
        </li>
        <li>
          <span class="label">数字类型</span>
          <yui-field-group>
            <yui-field
              v-model="phoneNumber"
              label="手机号码"
              type="number"
              min="3"
              max="10"
              placeholder="phone number"
              pattern="[0-9]*"
            ></yui-field>
          </yui-field-group>
        </li>
        <li>
          <span class="label">密码类型</span>
          <yui-field
            v-model="userPassword"
            label="用户密码"
            type="password"
            placeholder="password"
          ></yui-field>
        </li>
        <li>
          <span class="label">只读</span>
          <yui-field
            v-model="readonly"
            label="证件信息"
            type="text"
            readonly
          ></yui-field>
        </li>
        <li>
          <span class="label">disabled</span>
          <yui-field
            v-model="disabled"
            label="关键信息"
            type="text"
            disabled
          ></yui-field>
        </li>
        <li>
          <span class="label">清除icon</span>
          <yui-field
            v-model="clear"
            label="清除icon"
            type="text"
            clearable
          ></yui-field>
        </li>
        <li>
          <span class="label">自定义icon</span>
          <yui-field
            v-model="customIcon"
            label="自定义icon"
            iconName="iconarrow_right_gray"
            type="text"
          ></yui-field>
        </li>
        <li>
          <span class="label">textarea</span>
          <yui-field
            v-model="textarea"
            label="textarea"
            type="textarea"
            maxlength="50"
            showTextareaCounter
            clearable
          ></yui-field>
        </li>
        <li>
          <yui-field-group>
            <yui-field v-model="ynName" label="中文姓名"></yui-field>
            <yui-field v-model="ynPhone" label="手机号码"></yui-field>
            <yui-field v-model="ynIdType" label="证件类型"></yui-field>
            <yui-field v-model="ynIdNo" label="证件号码"></yui-field>
            <yui-field
              v-model="ynIdNoEncrpt"
              label="加密证件"
              encrypted
            ></yui-field>
            <yui-field v-model="ynBirthday" label="出生日期"></yui-field>
          </yui-field-group>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "YnFieldPage",
  data() {
    return {
      basicUsage: "",
      phoneNumber: "",
      userPassword: "",
      readonly: "3333333333333",
      disabled: "1111111111",
      clear: "",
      customIcon: "",
      textarea: "",
      ynName: "",
      ynPhone: "",
      ynIdType: "",
      ynIdNo: "",
      ynBirthday: "",
      ynIdNoEncrpt: "11222222222",
      customLabel: ""
    };
  }
};
</script>
<style type="text/css" scoped="scoped">
.yn-field-container{
  background-color: #f7f8fa;
}
.box {
  height: 100%;
}
.box ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.box ul li {
  margin: 10px 0;
}
.box ul li .label {
  margin: 5px 0;
  display: block;
}
</style>
