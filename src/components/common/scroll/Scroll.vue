<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
import ObserveImage from "@better-scroll/observe-image";

BScroll.use(ObserveDOM);
BScroll.use(Pullup);
BScroll.use(ObserveImage);

export default {
  name: "Scroll",

  data() {
    return {
      bs: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullup: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    // 创建bs对象
    this.bs = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      scrollY: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullup,
      observeImage: {
        debounceTime: 100, // ms  当图片加载失败100ms后调用refresh方法 重新计算可滚动的高度或者宽度
      },
    });
    // 监听位置信息
    this.bs.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 监听上拉加载事件
    this.bs.on("pullingUp", () => {
      this.$emit("pullingup");
      // 2.x版本改版只能在 上拉事件触发以后调用finishPullUp()方法
      this.bs.finishPullUp();
    });
  },

  methods: {
    scrollto(x, y, time = 300) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.bs.finishPullUp();
    },
    refresh() {
      this.bs && this.bs.refresh();
      console.log("---");
    },
  },
  computes: {},
};
</script>

<style scoped></style>
