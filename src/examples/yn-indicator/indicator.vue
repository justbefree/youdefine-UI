<template>
  <div>
    <h2>yn-indicator</h2>
    <ul>
      <li @click="indicator('doubleBounce')">doubleBounce</li>
      <li @click="indicator('fadingCircle')">fadingCircle</li>
      <li @click="indicator('snake')">snake</li>
      <li @click="indicator('tripleBounce')">tripleBounce</li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "YnIndicatorPage",
  data() {
    return {};
  },
  methods: {
    indicator(spinType) {
      this.Indicator.open({ text: "1111111111", spinType });
    }
  }
};
</script>
