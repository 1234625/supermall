<template>
  <div class="bottombar">
    <div class="left">
      <div><i class="icon serve"></i><span>客服</span></div>
      <div><i class="icon shop"></i><span>店铺</span></div>
      <div><i class="icon fan"></i><span>收藏</span></div>
    </div>
    <div class="right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    },
  },
};
</script>
<style scoped>
.bottombar {
  width: 100%;
  height: 49px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.left {
  width: 50%;
  display: flex;
}
.left div {
  flex: 1;
  text-align: center;
  font-size: 13px;
}
.icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.serve {
  background-position: 0 -54px;
}
.shop {
  background-position: 0 -98px;
}
.right {
  width: 50%;
  display: flex;
  text-align: center;
  height: 49px;
  line-height: 49px;
}
.cart {
  flex: 1;
  background: #ffe817;
}
.buy {
  color: #fff;
  flex: 1;
  background: rgb(255, 120, 154);
  font-size: 20px;
}
</style>
