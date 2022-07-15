<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/context/MainTabBar/MainTabBar.vue";
export default {
  name: "CoderwhyVueApp",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  components: {
    MainTabBar,
  },
};
</script>

<style scoped>
/* @import "assets/css/base.css"; */
@import url("./assets/css/base.css");
</style>
