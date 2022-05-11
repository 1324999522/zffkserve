
const { sequelize } = require('../sequelize')
const { order, card } = sequelize.models
class OrderController {
  async get_page (ctx, next) {

    ctx.options.order = [['id', 'DESC']]
    ctx.options.attributes.include = [
      [sequelize.literal(`( SELECT name FROM goods WHERE id = goods.id)`), "goodName"],
    ]
    await next()
  }
  async takeCard (ctx) {

    const { goodId, count } = ctx.request.body
    const orderPrice = 10

    const Order = await order.create({
      name: new Date().getTime(),
      orderPrice: orderPrice,
      goodId: goodId,
      count: count
    })
    const Cards = await sellCardByOrder(Order)

    ctx.body = {
      msg: `数量:${Cards.length},订单号${Order.name}`,
      code: 1000, title: '卡密提取成功', duration: 20000,
    }

  }

  async create (ctx) {


    const { goodId, count } = ctx.request.body
    const orderPrice = 10

    const Order = await order.create({
      name: new Date().getTime(),
      orderPrice: orderPrice,
      goodId: goodId,
      count, count
    })

    ctx.body = { data: Order, msg: `订单创建成功` }

  }

  async success_notify (ctx) {

    const { orderId, real_price } = ctx.request.body

    const Order = await order.finBypk(orderId)
    const Good = await good.finBypk(Order.goodId)

    if ((Good.price * Order.count) != real_price) {
      throw ('实际支付金额与商品价格有差异')
    }

    const Cards = await sellCardByOrder(Order)
    Order.status = 1
    await Order.save()

    ctx.body = { msg: `ok` }
  }

}

async function sellCardByOrder (Order) {

  let { goodId, count, id } = Order

  const Cards = await card.findAll({
    limit: count,
    where: {
      goodId: goodId,
      is_sell: 0,
    }
  })
  for (let Card of Cards) {
    Card.orderId = id
    Card.is_sell = 1
    await Card.save()
  }
  return Cards
}

module.exports = new OrderController()
