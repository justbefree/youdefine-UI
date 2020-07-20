<template>
  <div>
    <h2>yn-counter</h2>
    <span>total {{ total }}</span>
    <ul>
      <li v-for="(count, i) in counts">
        <yn-counter :key="i" v-model="count.value" :min="count.min" :max="count.max" steps="1" @change="handleChange"></yn-counter>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: "YnCounterPage",
    data() {
      return {
        counts: [{ value: 0, min: -5, max: 10 }, { value: 1, min: -2, max: 6 }, { value: 2, min: 1, max: 4 }]
      };
    },
    computed: {
      total() {
        let result = 0;
        this.counts.forEach(e => {
          result += e.value;
        });
        return result;
      }
    },
    methods: {
      handleChange(e) {
        console.log(e);
      }
    }
  };
</script>

<style type="text/css" scoped="scoped">
  ul li {
    margin: 10px;
  }
</style>
