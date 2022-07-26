<template>
  <div class="bottom-bar">
    <div class="allcheck">
      <check-button
        class="check-item"
        :isChecked="isSlectAll"
        @click.native="checkClick"
      />

      <span>全选</span>
    </div>
    <div class="totalPrice">
      <p>合计：￥{{ totalPrice }}</p>
    </div>
    <div class="close" @click="settleClick">去结算({{ selectLength }})</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CheckButton from 'components/context/CheckButton/CheckButton'
export default {
  name: 'CartBottomBar',
  data() {
    return {
      allLength: 0,
      action: false
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList', 'totalprice', 'selectGoodsLength']),
    totalPrice() {
      // return this.$store.getters.totalprice.toFixed(2);
      return this.totalprice.toFixed(2)
    },
    selectLength() {
      // return this.$store.getters.selectGoodsLength;
      return this.selectGoodsLength
    },
    /**全选按钮判断 */
    isSlectAll() {
      if (this.cartList.length === 0) {
        return false
      }
      return !this.cartList.find((item) => {
        return !item.checked
      })
    }
  },
  methods: {
    checkClick() {
      if (this.isSlectAll) {
        this.cartList.forEach((item) => {
          return (item.checked = false)
        })
      } else {
        this.cartList.forEach((item) => {
          item.checked = true
        })
      }
    },
    settleClick() {
      if (!this.isSlectAll) {
        this.$toast({
          message: '请选择购买商品！',
          duration: 1000
        })
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  height: 44px;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  line-height: 44px;
}
.allcheck {
  width: 80px;
}
.check-item {
  margin: 10px -15px -10px 10px;
  /* vertical-align: -3px; */
}
.allcheck span {
  font-size: 15px;
  display: block;
  margin-left: 5px;
}
.totalPrice {
  font-size: 17px;
  color: black;
}
.close {
  position: absolute;
  right: 0;
  background: #ff4500;
  width: 100px;
  text-align: center;
  color: #fff;
}
</style>
