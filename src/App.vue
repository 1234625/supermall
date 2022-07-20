<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
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
@import url("./assets/css/base.css");
</style>
