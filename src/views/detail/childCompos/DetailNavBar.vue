<template>
  <div id="detailnavbar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backclick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            class="nav-item"
            @click="itemclick(index)"
            :class="{ active: index === currentindex }"
          >
            <span class="word">{{ item }}</span>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "CoderwhyVueDetailNavBar",

  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentindex: 0,
    };
  },

  mounted() {},

  methods: {
    itemclick(index) {
      this.currentindex = index;
    },
    backclick() {
      this.$router.go(-1);
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.nav-item {
  flex: 1;
  font-size: 15px;
}
.word {
  position: relative;
  top: 5px;
}
.active {
  color: var(--color-tint);
}
.back {
  margin-top: 10px;
}
</style>
