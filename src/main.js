import Vue from 'vue';
import router from './router';
import VueNoty from 'vuejs-noty';
import vueHeadful from 'vue-headful';
import wysiwyg from "vue-wysiwyg";

import App from './App.vue';

import 'vuejs-noty/dist/vuejs-noty.css';

Vue.config.productionTip = false;

// Register 3rd Party Apps
Vue.use(VueNoty);
Vue.component('vue-headful', vueHeadful);
Vue.use(wysiwyg, {});

new Vue({
    router,
    data() {
        return {
            auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
        }
    },
    render: h => h(App),
}).$mount('#app')