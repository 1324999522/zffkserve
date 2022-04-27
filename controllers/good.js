
const sequelize = global.sequelize
const { Op } = require('sequelize')

class GoodController {
  async get_page (ctx, next) {

    ctx.options.order = [['sort', 'DESC']]

    let { classifyId, searchKey } = ctx.query
    if (classifyId) ctx.where.classifyId = classifyId
    if (searchKey) ctx.where.name = { [Op.like]: `%${searchKey}%` }

    ctx.options.attributes.include = [
      [sequelize.literal(`( SELECT name       FROM classifys  WHERE classifys.id = good.classifyId)`), "classifyName"],
      [sequelize.literal(`( SELECT COUNT(id)  FROM cards      WHERE cards.goodId = good.id )`), "cards_count"]
    ]

    await next()
  }
}

module.exports = new GoodController()
