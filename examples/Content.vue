<template>
  <div class="example-container">
    <ul>
        <li @click="jump('toast')">toast</li>
        <li @click="jump('indicator')">indicator</li>
        <li @click="jump('spin')">spin</li>
        <li @click="jump('iconfont')">iconfont</li>
        <li @click="jump('checkbox')">checkbox</li>
        <li @click="jump('radiobox')">radiobox</li>
        <li @click="jump('calendar')">calendar</li>
        <li @click="jump('popup')">popup</li>
        <li @click="jump('button')">button</li>
        <li @click="jump('flex')">flex</li>
        <li @click="jump('actionSheet')">actionSheet</li>
        <li @click="jump('field')">field</li>
        <li @click="jump('layout')">layout</li>
        <li @click="jump('cityPicker')">cityPicker</li>
        <li @click="jump('sticky')">sticky</li>
        <li @click="jump('dialog')">dialog</li>
        <li @click="jump('pickyStepper')">pickyStepper</li>
        <li @click="jump('dropdown')">dropdown</li>
        <li @click="jump('dropdownMenu')">dropdownMenu</li>
        <li @click="jump('picker')">picker</li>
        <li @click="jump('swipe')">swipe</li>
        <li @click="jump('tabs')">tabs</li>
        <li @click="jump('slider')">slider</li>
        <li @click="jump('submitAction')">submitAction</li>
        <li @click="jump('pullRefresh')">pullRefresh</li>
        <li @click="jump('datePicker')">datePicker</li>
        <li @click="jump('counter')">counter</li>
        <li @click="jump('skeleton')">skeleton</li>
        <li @click="jump('animationList')">animationList</li>
        <li @click="jump('massive')">massive</li>
      </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Content",
  methods: {
    jump(name = "") {
      this.$router.push({ name });
    }
  }
};
</script>
