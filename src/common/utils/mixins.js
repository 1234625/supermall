import { debounce } from "./utils.js";
// import BackTop from "components/content/BackTop";

export const imgLoadListenerMixin = {
  data() {
    return {
      imgLoadListener: null,
    };
  },
  mounted() {
    // 事件总线监听图片
    this.imgLoadListener = debounce(
      this.$refs.scroll && this.$refs.scroll.refresh(),
      50
    );
    this.$bus.$on("imgLoad", this.imgLoadListener);
  },
};

// export const backTopMixin = {
//   data() {
//     return {
//       currentScroll: false, //返回顶部按钮是否显示
//     };
//   },
//   components: {
//     BackTop,
//   },
//   methods: {
//     backClick() {
//       this.$refs.scroll.scrollTo(0, 0, 500);
//     },
//   },
// };
