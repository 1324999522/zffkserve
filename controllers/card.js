
const { sequelize } = require('../sequelize')
const { card } = sequelize.models
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
    let { goodId } = ctx.query

    let createdAt = ctx.query['createdAt[]']
    if (createdAt) ctx.where.createdAt = { [Op.between]: [createdAt[0], createdAt[1]] }


    if (goodId) ctx.where.goodId = goodId
    await next()

  }
}

module.exports = new CardController()
