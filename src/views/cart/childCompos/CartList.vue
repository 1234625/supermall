<template>
  <div id="cartlist">
    <div v-for="(item, index) in cartlist" :key="index">
      <cart-list-item :goodsinfo="item"> </cart-list-item>
    </div>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
export default {
  name: 'CoderwhyVueCartList',

  data() {
    return {}
  },
  props: {
    cartlist: {
      type: Array,
      default() {
        return []
      }
    }
  },

  methods: {},

  mounted() {},

  computed: {},

  components: {
    CartListItem
  }
}
</script>

<style scoped></style>
