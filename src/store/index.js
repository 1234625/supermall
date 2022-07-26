import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { cartList: [] },
  getters: {
    // 商品列表长度
    cartListLength(state) {
      return state.cartList.length
    },
    // 购物车商品列表
    cartList(state) {
      return state.cartList
    },
    // 合计价钱
    totalprice(state) {
      return state.cartList
        .filter((item) => {
          return item.checked
        })
        .map((item) => {
          return [item.price.slice(1) * 1, item.count]
        })
        .reduce((pre, item) => {
          return pre + item[0] * item[1]
        }, 0)
    },
    // 选中商品长度
    selectGoodsLength(state) {
      return state.cartList
        .filter((item) => {
          return item.checked
        })
        .reduce((pre, item) => {
          return pre + item.count
        }, 0)
    }
  },
  mutations: {
    addToCart(state, payLoad) {
      payLoad.checked = true
      state.cartList.push(payLoad)
    },
    addCounter(state, payLoad) {
      payLoad.count++
    }
  },
  actions: {
    // addCart({state,mutations},payLoad) 对象解构语法
    addCart(context, payLoad) {
      return new Promise((resolve, reject) => {
        // payLoad 负载 参数表示是新添加的商品信息 goods
        // 1、判断cartlist数组中是否有之前存进去的相同数组
        let existproduct = context.state.cartList.find(
          (item) => item.iid === payLoad.iid
        )
        // 2、判断oldProduct
        if (existproduct) {
          // existproduct.count += 1;
          context.commit('addCounter', existproduct)
          // 存在商品，数量加一
          resolve('当前商品数量+1')
        } else {
          payLoad.count = 1
          // state.cartList.push(payLoad);
          context.commit('addToCart', payLoad)
          // 不存在该商品，添加购物车成功
          resolve('添加购物车成功！')
        }
      })
    }
  },
  modules: {}
})
