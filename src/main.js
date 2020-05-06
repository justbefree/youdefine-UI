import Vue from 'vue'
import App from './App.vue'
// import YnComponent from "./components/default";
// console.log(YnComponent);
// Vue.use(YnComponent);
// import { YnButton } from "./components/index";
// Vue.use(YnButton);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
