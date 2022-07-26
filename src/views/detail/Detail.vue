<template>
  <div id="detail">
    <detail-nav-bar
      class="detailnav"
      @tieleitemclick="itemclick"
      ref="navbar"
    ></detail-nav-bar>
    <scroll
      class="content"
      :probe-type="3"
      :pull-up="false"
      @pullingup="pullupload"
      ref="scroll"
      @scroll="contentscroll"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-image="topImages"></detail-swiper>
      <!-- 基本信息展示 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店家信息 -->
      <detail-shops-info :shops="shops"></detail-shops-info>
      <!-- 商品图片信息 -->
      <detail-goods-info
        :detailinfo="goodsinfo"
        @imgLoad="imageload"
      ></detail-goods-info>
      <!-- 商品尺码参数 -->
      <goods-params :goodparam="goodsparams" ref="param"></goods-params>
      <!-- 商品评论信息 -->
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <!-- 推荐数据的展示 -->
      <goods-list :goods="recommends.list" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar
      class="bottombar"
      @addCart="addToCart"
    ></detail-bottom-bar>
    <back-top
      v-show="currentScroll"
      @click.native="backClick"
      class="backtop"
    ></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childCompos/DetailNavBar.vue'
import DetailSwiper from './childCompos/DetailSwiper'
import DetailBaseInfo from './childCompos/DetailBaseInfo'
import DetailShopsInfo from './childCompos/DetailShopsInfo.vue'
import DetailGoodsInfo from './childCompos/DetailGoodsInfo.vue'
import GoodsParams from './childCompos/DetailParamInfo.vue'
import DetailCommentInfo from './childCompos/DetailCommentInfo.vue'
import DetailBottomBar from './childCompos/DetailBottomBar.vue'

/* 导入获取到的数据 */
import {
  getdetaildata,
  Goods,
  Shops,
  GoodsParam,
  getRecommends
} from 'network/detail.js'
import { mapActions } from 'vuex'
/* 导入公共组件 */
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/context/GoodsList/GoodsList'
import { imgLoadListenerMixin, backTopMixin } from 'common/utils/mixins'
import { debounce } from 'common/utils/utils'

export default {
  name: 'Detail',

  data() {
    return {
      iid: null,
      topImages: [], //轮播图
      goods: {}, //商品
      shops: {}, // 商家信息
      goodsinfo: {}, //商品信息
      goodsparams: {}, //商品尺码参数
      commentInfo: {}, // 评论信息
      recommends: [], //推荐商品信息
      themeTopYs: [], //头标题离各个板块的高度
      getThemTop: null,
      currentIndex: 0
    }
  },
  mixins: [imgLoadListenerMixin, backTopMixin],
  mounted() {
    // 混入内容
    /* this.itemimgload = () => {
   this.$refs.scroll.bs.refresh;
    };
    this.$bus.$on("itemImgLoad", this.itemimgload); */
  },

  methods: {
    ...mapActions(['addCart']),
    pullupload() {},
    // 图片等待加载
    imageload() {
      this.$refs.scroll.refresh()
      this.getThemTop()
    },
    // 标题点击事件
    itemclick(index) {
      this.$refs.scroll.scrollto(0, -this.themeTopYs[index], 500)
    },
    // 监听滚动事件 使标题和板块相对应
    contentscroll(position) {
      // const positionY = -position.y;

      /*       for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < this.themeTopYs.length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === this.themeTopYs.length && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
        }
      } */
      this.currentScroll = -position.y > 1000
      let positionY = -position.y
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] - 88 &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
        }
        this.$refs.navbar.currentindex = this.currentIndex
      }
    },
    /* 添加到购物车 */
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.oldPrice
      product.iid = this.iid
      // 2、将商品添加到购物车
      // 不要直接修改vuex里的state值，要通过mutations对象里修稿state里的属性值
      /*  this.$store.state.cartList = product;
      this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product); */
      // 需要等商品添加购物车成功弹出Toast弹窗
      // this.$store.dispatch("addCart", product).then((res) => console.log(res));
      // 使用mapActions 将 addCart 方法导入
      // this.addCart(product).then((res) => console.log(res));
      this.addCart(product).then((res) => this.$toast({ message: res }))
    }
  },
  created() {
    this.iid = this.$route.params.iid

    // 获取数据
    getdetaildata(this.iid).then((res) => {
      const data = res.result

      // 获取顶部轮播图
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      /* 获取板块高度 */
      this.getThemTop = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(Math.abs(this.$refs.param.$el.offsetTop + 44))
        this.themeTopYs.push(Math.abs(this.$refs.comment.$el.offsetTop + 44))
        this.themeTopYs.push(Math.abs(this.$refs.recommend.$el.offsetTop + 44))
        this.themeTopYs.push(Number.MAX_VALUE)
      })

      /**店家信息 */
      this.shops = new Shops(data.shopInfo)

      /* 获取商品图片信息 */
      this.goodsinfo = data.detailInfo

      /* 获取参数尺寸信息 */
      this.goodsparams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )

      /* 获取评论信息 */
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate
      }
    })
    /* 获取推荐产品数据 */
    getRecommends().then((res) => {
      this.recommends = res.data
    })
  },
  updated() {},

  destrocy() {
    this.$bus.$on('itemImgLoad', this.itemimgload)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopsInfo,
    DetailGoodsInfo,
    GoodsParams,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
  /* height: 100%; */
}
.detailnav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
.backtop {
  position: absolute;
}
/* .bottombar {
  position: fixed;
  bottom: 18px;
} */
</style>
