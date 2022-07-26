<template>
  <div id="checkbutton">
    <!--动态绑定class时监听不到对象里属性的变化如：:class="{checked:item.checked}，通过click时修改item.checked时样式并不会随之变化-->
    <!-- 这是因为vue的双向绑定原理，利用Object.define()不能动态监听数据响应 -->
    <div class="item" :class="{ checked: isChecked }"></div>
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  data() {
    return {
      changeCheck: false,
    };
  },
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    checkClick() {
      // this.changeCheck = !this.changeCheck;
      // this.$emit("checkClick");
      // console.log("---");
    },
  },
};
</script>
<style scoped>
.checkbutton {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.item {
  border: 1px solid #aaa;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.checked {
  border: 1px solid #fff;
  background-color: var(--color-tint);
  background-image: url("~assets/img/cart/tick.svg");
  background-size: 100%;
  border-radius: 50%;
}
</style>
