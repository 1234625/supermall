<template>
  <div>
    <swiper class="detailswiper">
      <swiper-item v-for="item in topImage" :key="item">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "CoderwhyVueDetailSwiper",

  data() {
    return {};
  },
  props: {
    topImage: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  mounted() {},

  methods: {},
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detailswiper {
  height: 300px;
  overflow: hidden;
}
</style>
