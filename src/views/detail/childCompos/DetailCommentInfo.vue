<template>
  <div class="comment" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info">
      <span>用户评价({{ commentInfo.cRate }})</span>
      <div>更多<i class="arrow-right"></i></div>
    </div>
    <div class="user">
      <img :src="commentInfo.list[0].user.avatar" alt="" />
      <span>{{ commentInfo.list[0].user.uname }}</span>
    </div>
    <p class="content">{{ commentInfo.list[0].content }}</p>

    <div class="bottom">
      <p>
        <!-- {{ commentInfo.list[0].created }} -->
        {{ gettimer }}
        <span>{{ commentInfo.list[0].style }}</span>
      </p>
      <p class="extraInfo">
        <span
          v-for="(item, index) in commentInfo.list[0].extraInfo"
          :key="index"
          >{{ item }}</span
        >
      </p>
      <img
        :src="item"
        alt=""
        v-for="(item, index) in commentInfo.list[0].images"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    gettimer() {
      let timeA = this.commentInfo.list[0].created * 1000;
      return this.$moment(timeA).format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
.comment {
  padding: 15px 12px;
  border-bottom: 5px solid #f2f5f8;
}
.info {
  border-bottom: 1px solid #f6f6f6;
  padding-bottom: 15px;
  margin-bottom: 10px;
}
.info div {
  float: right;
  font-size: 14px;
  margin-right: 10px;
}
.arrow-rigt {
  border-top: 1px solid #999;
  border-left: 1px solid #999;
  width: 9px;
  height: 9px;
  background-color: transparent;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  display: inline-block;
  margin-left: 0.1rem;
}
.user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.user span {
  vertical-align: 15px;
  margin-left: 10px;
}
.content {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5em;
}
.bottom {
  margin-top: 10px;
  font-size: 12px;
}
.extraInfo span {
  margin-right: 10px;
}
.bottom img {
  width: 70px;
  margin: 10px 10px 0 0;
}
</style>
