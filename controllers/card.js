
const { sequelize } = require('../sequelize')
const { card, order } = sequelize.models
const { Op } = require('sequelize')

class CardController {
  async bulkCreate (ctx) {
    const cards = ctx.request.body
    for (let card of cards) {
      if (!card.goodId) ctx.throw('请选择商品')
    }
    const Cards = await card.bulkCreate(cards)
    ctx.body = { data: Cards, msg: `卡密添加成功 数量:${Cards.length}` }

  }

  async get_page (ctx, next) {
    let { goodId, is_sell, searchKey } = ctx.query

    // 查询条件：关键字搜索
    if (searchKey) {
      const Order = await order.findOne({ where: { name: searchKey } })
      if (Order) {
        ctx.where.orderId = Order.id
      } else {
        ctx.where.number = { [Op.like]: `%${searchKey}%` }
      }

    }
    // 查询条件：入库时间
    let createdAt = ctx.query['createdAt[]']
    if (createdAt) ctx.where.createdAt = { [Op.between]: [createdAt[0], createdAt[1]] }
    // 查询条件：入库时间
    if (is_sell == '未使用') { ctx.where.is_sell = 0 }
    else if (is_sell == '已售出') { ctx.where.is_sell = 1 }
    // 查询条件：商品id
    if (goodId) ctx.where.goodId = goodId
    await next()

  }
}

module.exports = new CardController()
