import Vue from 'vue'
import VueCookies from 'vue-cookies-reactive'
import VueSimpleAlert from "vue-simple-alert-fixed";

Vue.use(VueCookies)

Vue.use(VueSimpleAlert);
Vue.$cookies.config('7d')
