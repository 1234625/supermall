<template>
  <div class="goods">
    <goods-list-item
      v-for="item in goods"
      :goodsitem="item"
      class="list-item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodList",

  data() {
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  mounted() {},

  methods: {},
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: space-evenly;

  /* padding: 2px; */
}
</style>
