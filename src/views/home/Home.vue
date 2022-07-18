<template>
  <div id="home">
    <!-- 横幅 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- 回到顶部按钮 -->
    <BackTop @click.native="backtopclick()" v-show="backshow"></BackTop>
    <!--  -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollp"
      :pullup="true"
      @pullingup="pullupload"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 流行列表 -->
      <feature-view :goods="goods"></feature-view>

      <!-- tabcontrol -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @itemclick="tabclick"
      ></tab-control>

      <!-- 商品列表 -->
      <goods-list :goods="showgoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/TabControl/TabControl";
import GoodsList from "components/context/GoodsList/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/context/BackTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenttype: "pop",
      backshow: false,
    };
  },

  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh);

    // // 事件总线监听图片加载
    this.$bus.$on("itemImageLoad", () => {
      // console.log("---");
      // this.$refs.scroll && this.$refs.scroll.refresh();
      refresh();
    });
  },
  computed: {
    showgoods() {
      return this.goods[this.currenttype].list;
    },
  },

  methods: {
    //事件监听相关函数
    tabclick(index) {
      switch (index) {
        case 0:
          this.currenttype = "pop";
          break;
        case 1:
          this.currenttype = "new";
          break;
        case 2:
          this.currenttype = "sell";
          break;
      }
    },
    backtopclick() {
      this.$refs.scroll.scrollto(0, 0, 500);
      // console.log(this.$refs.scroll.bs);
    },
    // 判断返回顶部按钮的实现
    scrollp(position) {
      // console.log(position);
      this.backshow = Math.abs(position.y) > 1000;
    },
    // 上拉加载更多
    pullupload() {
      // this.getHomeGoods(this.currenttype);
      // 监听图片加载玩重新（刷新）计算展示高度
      // this.$refs.scroll.bs.refresh();
    },
    // debounce节流函数
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    //网络请求相关函数
    // concat不行的哦，数组不会动态的了，视图层就检测不到变化
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
      });
      // 重复触发上拉事件 2.x改版从外部无法获取finishPullUp方法
      // this.$refs.scroll.finishPullUp();
    },
    datashow() {
      // console.log(this.goods.pop.list);
      console.log(this.goods);
    },
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  created() {
    // 调用轮播图和横幅数据
    this.getHomeMultidata();
    // 调用商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  beforeDestroy() {
    this.$refs.scroll.bs.destroy();
    this.$bus.$off("itemImageLoad");
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh表示视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
.tab-control {
  position: sticky;
  top: 43px;
}
.content {
  position: absolute;
  /* overflow: hidden; */
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
