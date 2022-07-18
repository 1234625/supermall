<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "CoderwhyVueBackTop",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.backtop {
  position: fixed;
  bottom: 45px;
  right: 3px;
  z-index: 11;
}
.backtop img {
  width: 43px;
  height: 43px;
}
</style>
