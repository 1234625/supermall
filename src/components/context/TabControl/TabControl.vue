<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-item"
      :class="{ active: index == currentIndex }"
      @click="itemclick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },

  mounted() {},

  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("itemclick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 10;
}
.tab-item {
  flex: 1;
}
.tab-item span {
  /* padding-bottom: 6px; */
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>
