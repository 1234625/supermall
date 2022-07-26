<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgload"
        /></a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
export default {
  name: 'CoderwhyVueHomeSwiper',

  data() {
    return {
      flag: true
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },

  mounted() {},

  methods: {
    imgload() {
      if (this.flag) {
        this.$emit('imgload')
      }
      this.flag = false
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped></style>
