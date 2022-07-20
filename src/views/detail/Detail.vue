<template>
  <div id="detail">
    <detail-nav-bar class="detailnav"></detail-nav-bar>
    <scroll
      class="content"
      :probe-type="3"
      :pull-up="false"
      @pullingup="pullupload"
      ref="scroll"
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
      <goods-params :goodparam="goodsparams"></goods-params>
      <!-- 商品评论信息 -->
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <!-- 推荐数据的展示 -->
      <goods-list :goods="recommends.list"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childCompos/DetailNavBar.vue";
import DetailSwiper from "./childCompos/DetailSwiper";
import DetailBaseInfo from "./childCompos/DetailBaseInfo";
import DetailShopsInfo from "./childCompos/DetailShopsInfo.vue";
import DetailGoodsInfo from "./childCompos/DetailGoodsInfo.vue";
import GoodsParams from "./childCompos/DetailParamInfo.vue";
import DetailCommentInfo from "./childCompos/DetailCommentInfo.vue";

/* 导入获取到的数据 */
import {
  getdetaildata,
  Goods,
  Shops,
  GoodsParam,
  getRecommends,
} from "network/detail.js";
/* 导入公共组件 */
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/context/GoodsList/GoodsList";
import { imgLoadListenerMixin } from "common/utils/mixins";
export default {
  name: "Detail",

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

      // itemimgload: null,
    };
  },
  mixins: [imgLoadListenerMixin],
  mounted() {
    /* this.itemimgload = () => {
      this.$refs.scroll.bs.refresh;
    };

    this.$bus.$on("itemImgLoad", this.itemimgload); */
  },

  methods: {
    pullupload() {
      // console.log(this.detailInfo);
    },
    imageload() {
      // console.log("---");
      // console.log();
      this.$refs.scroll.refresh();
    },
  },
  created() {
    // console.log(this.$route.params);
    this.iid = this.$route.params.iid;

    // 获取数据
    getdetaildata(this.iid).then((res) => {
      console.log(res);
      const data = res.result;

      // 获取顶部轮播图
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      /**店家信息 */
      this.shops = new Shops(data.shopInfo);

      /* 获取商品图片信息 */
      this.goodsinfo = data.detailInfo;

      /* 获取参数尺寸信息 */
      this.goodsparams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      /* 获取评论信息 */
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate;
      }
    });
    /* 获取推荐产品数据 */
    getRecommends().then((res) => {
      this.recommends = res.data;
    });
  },
  destrocy() {
    this.$bus.$on("itemImgLoad", this.itemimgload);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopsInfo,
    DetailGoodsInfo,
    GoodsParams,
    DetailCommentInfo,

    Scroll,
    GoodsList,
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detailnav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 43px);
}
</style>
