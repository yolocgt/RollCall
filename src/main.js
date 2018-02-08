import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
Vue.use(ElementUI);
// Vue-Cookie
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);
// import moment from 'vue-moment';
// Vue.use(moment);
// Vue.use(require('vue-moment'));
import moment from 'moment';
// Vue.use(moment);
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
global.ApiUrl = 'http://localhost:1219/api/v1';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');