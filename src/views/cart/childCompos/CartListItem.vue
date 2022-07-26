<template>
  <div class="cart-list-item">
    <check-button
      :is-checked="goodsinfo.checked"
      @click.native="checkClick"
      class="check"
    />
    <div class="cart-content">
      <img :src="goodsinfo.image" alt="" />
      <div class="good-mess">
        <div class="title">{{ goodsinfo.title }}</div>
        <div class="desc">
          <p>{{ goodsinfo.desc }}</p>
        </div>
        <div class="buy">
          <span class="price">{{ goodsinfo.price }}</span>
          <span class="count">x{{ goodsinfo.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/context/CheckButton/CheckButton";
export default {
  name: "CoderwhyVueCartListItem",

  data() {
    return {};
  },

  props: {
    goodsinfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      // this.$store.commit("modifyChecked", this.goodsinfo.index);
      this.goodsinfo.checked = !this.goodsinfo.checked;
    },
  },

  mounted() {},

  components: {
    CheckButton,
  },
};
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid rgb(202, 202, 202);
}
.check {
  margin-right: 5px;
}
.cart-content {
  width: 100%;
}
.cart-content img {
  width: 20%;
  border-radius: 5px;
}
.good-mess {
  display: inline-block;
  width: 79%;
  padding: 5px 10px;
}
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  margin-bottom: 5px;
}
.desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
}
.desc p {
  margin-top: 8px;
}
.count {
  float: right;
  margin-right: 10px;
}
.buy {
  margin-top: 20px;
}
.price {
  font-size: 18px;
  color: orangered;
}
.count {
  color: #333;
}
</style>
