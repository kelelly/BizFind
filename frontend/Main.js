// Import Vue and other dependencies
import Vue from 'vue';
import App from './app.vue';
import router from './router'; // Assuming you have a router setup in 'client/router'
import store from './store'; // Assuming you have a Vuex store setup in 'client/store'

// Global Registrations
// Components
import Header from './components/Header.vue';
Vue.component('Header', Header);

// Directives
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});

// Mixins
Vue.mixin({
  methods: {
    // Global method example
    hello() {
      alert('Hello!');
    }
  }
});

// Create Vue instance
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
