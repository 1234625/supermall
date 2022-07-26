<template>
  <div id="cart">
    <nav-bar class="cart-bar">
      <!-- 横幅 -->
      <template v-slot:center>
        <div>购物车 ({{ cartListLength }})</div>
      </template>
    </nav-bar>
    <!-- 滚动区域 -->
    <scroll class="content" ref="scroll" :probe-type="3">
      <cart-list :cartlist="cartList"> </cart-list>
    </scroll>
    <!-- 底部navbar -->
    <cart-bottom-bar class="bottombar"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childCompos/CartList.vue'
import CartBottomBar from './childCompos/CartBottomBar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CoderwhyVueCart',

  data() {
    return {}
  },

  computed: {
    ...mapGetters(['cartListLength', 'cartList'])
  },

  methods: {},

  mounted() {},
  activated() {
    this.$refs.scroll.refresh()
  },
  components: {
    NavBar,
    Scroll,

    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 43px - 49px - 40px);
  overflow: hidden;
}
.bottombar {
  position: relative;
}
</style>
