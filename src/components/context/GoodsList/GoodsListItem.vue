<template>
  <div class="goods-item">
    <img v-lazy="showimage" alt="" @load="imgload" @click="todetail" />
    <div class="goods-info">
      <p>{{ goodsitem.title }}</p>
      <span class="price">{{ goodsitem.price }}</span>
      <span class="collect">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',

  data() {
    return {}
  },
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  mounted() {},
  computed: {
    showimage() {
      return (
        (this.goodsitem.show && this.goodsitem.show.img) || this.goodsitem.image
      )
    }
  },

  methods: {
    imgload() {
      /* 根据路由信息判断是否全局监听图片加载成功事件 */
      /* if (this.$route.path.indexOf('/home')) {
        this.$bus.$emit('homeItemImgLoad')
      } else if(this.$route.path.indexOf('/detail')){
        this.$bus.$emit('detailItemImgLoad')
      } */
      this.$bus.$emit('itemImageLoad')
    },

    // 图片点击进入详情页
    todetail() {
      console.log(this.goodsitem)
      this.$router.push(`/detail/${this.goodsitem.iid}`)
    }
  },
  create() {}
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
