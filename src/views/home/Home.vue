<template>
  <div id="home">
    <!-- 横幅 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
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

    <ul>
      <li>顺序列表1</li>
      <li>顺序列表2</li>
      <li>顺序列表3</li>
      <li>顺序列表4</li>
      <li>顺序列表5</li>
      <li>顺序列表6</li>
      <li>顺序列表7</li>
      <li>顺序列表8</li>
      <li>顺序列表9</li>
      <li>顺序列表10</li>
      <li>顺序列表11</li>
      <li>顺序列表12</li>
      <li>顺序列表13</li>
      <li>顺序列表14</li>
      <li>顺序列表15</li>
      <li>顺序列表16</li>
      <li>顺序列表17</li>
      <li>顺序列表18</li>
      <li>顺序列表19</li>
      <li>顺序列表20</li>
      <li>顺序列表21</li>
      <li>顺序列表22</li>
      <li>顺序列表23</li>
      <li>顺序列表24</li>
      <li>顺序列表25</li>
      <li>顺序列表26</li>
      <li>顺序列表27</li>
      <li>顺序列表28</li>
      <li>顺序列表29</li>
      <li>顺序列表30</li>
      <li>顺序列表31</li>
      <li>顺序列表32</li>
      <li>顺序列表33</li>
      <li>顺序列表34</li>
      <li>顺序列表35</li>
      <li>顺序列表36</li>
      <button @click="datashow()">点击按钮</button>
      <li>顺序列表37</li>
      <li>顺序列表38</li>
      <li>顺序列表39</li>
      <li>顺序列表40</li>
      <li>顺序列表41</li>
      <li>顺序列表42</li>
      <li>顺序列表43</li>
      <li>顺序列表44</li>
      <li>顺序列表45</li>
      <li>顺序列表46</li>
      <li>顺序列表47</li>
      <li>顺序列表48</li>
      <li>顺序列表49</li>
      <li>顺序列表50</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/TabControl/TabControl";
import GoodsList from "components/context/GoodsList/GoodsList.vue";

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
    };
  },

  mounted() {},
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
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
</style>
