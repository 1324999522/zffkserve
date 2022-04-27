module.exports = (model) => {
  return {
    // 分页批量查询
    async $get_page (ctx) {


      let { offset, limit } = ctx.query
      if (!offset) offset = 1
      if (!limit) limit = 100000

      const data = await model.findAndCountAll({
        offset: (Number(offset) - 1) * Number(limit),
        limit: Number(limit),
        ...ctx.options,
        where: ctx.where,
      })

      ctx.body = { data, code: 0 }
    },
    // 删除
    async $delete (ctx) {
      const { id } = ctx.request.body
      let data = await model.destroy({ id, ...ctx.where })
      ctx.body = { data, code: 0 }
    },
    // 查询byID
    async $get (ctx) {
      const { id } = ctx.query
      let data = await model.findOne({ id, ...ctx.where })
      ctx.body = { data, code: 0 }
    },
    // 更新
    async $put (ctx) {
      const { id } = ctx.request.body
      let data = await model.update(req.body, { id, ...ctx.where })
      let data2 = await model.findOne({ id, ...ctx.where })
      ctx.body = { data, code: 0, data2 }
    },
    // 添加
    async $post (ctx) {
      const data = await model.create(ctx.request.body)
      ctx.body = { data, code: 0, msg: '添加成功' }
    },
    // 删除
    async $deleteMany (ctx) {
      const { id } = ctx.request.body
      const data = await model.destroy({ id, ...ctx.where })
      ctx.body = { data, code: 0, msg: '删除成功' }
    }
  }
}