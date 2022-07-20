<template>
  <div class="shops">
    <div class="shop-logo">
      <img :src="shops.shopLogo" alt />
      <span>{{ shops.name }}</span>
    </div>
    <div class="shop-info">
      <div class="left">
        <div class="cFans">
          <span class="shop-font">{{ shops.cFans }}</span>
          <br />
          <span class="shop-message">粉丝</span>
        </div>
        <div class="cSells">
          <span class="shop-font">{{ shops.cSells }}</span>
          <br />
          <span class="shop-message">总销量</span>
        </div>
        <div class="cGoods">
          <span class="shop-font">{{ shops.cGoods }}</span>
          <br />
          <span class="shop-message">宝贝</span>
        </div>
      </div>

      <div class="right">
        <table>
          <tr v-for="(item, index) in shops.score" :key="index">
            <td>{{ item.name }}</td>
            <td :style="{ color: item.isBetter ? '#ff5777' : 'green' }">
              {{ item.score }}
            </td>
            <td
              class="action"
              :style="{ background: item.isBetter ? '#ff5777' : '#5ea732' }"
            >
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="enter-shop">进店逛逛</div>
  </div>
</template>
<script>
export default {
  name: "DetailShopsInfo",
  props: {
    shops: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    // console.log(this);
  },
};
</script>
<style scoped>
.shop-logo {
  padding: 15px 0 15px 5px;
  border-bottom: 1px solid #f6f6f6;
}
.shop-logo img {
  width: 40px;
  border-radius: 50%;
}
.shop-logo span {
  padding: 2px 8px;
  vertical-align: 13px;
}
.shop-info {
  margin-top: 5px;
}
.left {
  display: flex;
  align-items: center;
  /* padding-right: 20px; */
  border-right: 1px solid black;
  height: 60px;
}
.left div {
  flex: 1;
  padding: 5px;
  text-align: center;
}
.shop-font {
  font-size: 18px;
}
.shop-message {
  padding: 5px 5px;
  font-size: 12px;
}
.right {
  margin-right: 15px;
}
.right tr {
  margin-top: 5px;
}
.right td {
  padding: 0 0 0 5px;
}
.action {
  color: #fff;
}
.enter-shop {
  /* display: inline-block; */
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
  position: relative;
  left: 50%;
  margin: 80px 0 0 -75px;
}
</style>
