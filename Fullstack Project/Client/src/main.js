import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);
library.add(far);
Vue.component('font-awesome-icon', FontAwesomeIcon);


axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearchByUser");
    localStorage.removeItem("lastSearchFormByUser");
    localStorage.removeItem("recipe_title");
    this.username = undefined;
  },
  lastSearchByUser: localStorage.lastSearchByUser,
  saveLastSearchByUser(lastSearchByUser){
    this.lastSearchByUser= lastSearchByUser;
    localStorage.setItem("lastSearchByUser",JSON.stringify(this.lastSearchByUser));
  },
  lastSearchFormByUser: localStorage.lastSearchFormByUser,
  saveLastSearchFormByUser(lastSearchFormByUser){
    let form = new Object();
    form.query = lastSearchFormByUser.query;
    form.diet = lastSearchFormByUser.diet;
    form.cusine = lastSearchFormByUser.cusine;
    form.intolorence = lastSearchFormByUser.intolorence;
    form.amount = lastSearchFormByUser.amount;
    this.lastSearchFormByUser = form;
    localStorage.setItem("lastSearchFormByUser",JSON.stringify(this.lastSearchFormByUser))
  },
  recipe_title: localStorage.recipe_title,
  saveRecipeTitle(title){
    this.recipe_title = title;
    localStorage.setItem("recipe_title",this.recipe_title);
  }
};

// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
