import { request } from './request'
/* 获取商品详情数据 */
export function getdetaildata(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
/* 获取商品详情数据 */
export function getRecommends() {
  return request({
    url: '/recommend'
  })
}
/* 获取商品信息 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.price = itemInfo.lowNowPrice
    this.size = itemInfo.size
  }
}
/**商铺信息 */
export class Shops {
  constructor(shopinfo) {
    this.cFans = shopinfo.cFans //粉丝
    this.cGoods = shopinfo.cGoods
    this.cSells = shopinfo.cSells //销量
    this.shopLogo = shopinfo.shopLogo
    this.name = shopinfo.name
    this.score = shopinfo.score
  }
}

/**商品参数尺码信息 */
export class GoodsParam {
  constructor(info, rule) {
    this.info = info.set
    this.rule = rule
  }
}
