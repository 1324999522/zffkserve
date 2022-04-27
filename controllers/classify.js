
const { sequelize } = require('../sequelize')
const { classify } = sequelize.models


class ClassifyController {
  async get_page (ctx, next) {

    ctx.options.order = [['sort', 'DESC']]

    await next()
  }
}

module.exports = new ClassifyController()
