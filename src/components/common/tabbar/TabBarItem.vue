<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{ active: isActive }"><slot name="item-text"></slot></div> -->
    <div :style="{ color: styleColor }"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "CoderwhyVueTabBarItem",

  data() {
    return {
      // isActive: true,
    };
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },

  mounted() {},

  methods: {
    itemclick() {
      // this.$router.push(this.path).catch((err) => err);
      this.$router.push(this.path).catch((err) => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== "NavigationDuplicated" &&
          !err.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          // But print any other errors to the console
          logError(err);
        }
      });
      // console.log(this.$data);
      // console.log(this);
      // console.log(this.$route.path.indexOf(this.path) ? true : false);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    styleColor() {
      return this.isActive ? this.activeColor : "";
      // return this.isActive ? {color: this.activeColor} : {}
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active {
	color: red;
} */
</style>
