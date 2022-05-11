module.exports = (model) => {
  return {
    // 分页批量查询
    async $get_page (ctx) {


      let { offset, limit, searchKey } = ctx.query
      if (!offset) offset = 1
      if (!limit) limit = 100000

      const data = await model.findAndCountAll({
        offset: (Number(offset) - 1) * Number(limit),
        limit: Number(limit),
        ...ctx.options,
        where: ctx.where,
      })

      let msg = ''
      if (searchKey) msg = `搜索完成，一共找到 ${data.count} 条记录`
      ctx.body = { data, msg: msg }
    },
    // 删除
    async $delete (ctx) {
      console.log(ctx.query)
      const { id } = ctx.query
      let data = await model.destroy({ where: { id, ...ctx.where } })
      ctx.body = { data, msg: '删除成功' }
    },
    // 查询byID
    async $get (ctx) {
      const { id } = ctx.query
      let data = await model.findOne({ id, ...ctx.where })
      ctx.body = { data }
    },
    // 更新
    async $put (ctx) {
      const { id } = ctx.request.body
      let data = await model.update(ctx.request.body, { where: { id, ...ctx.where } })
      let data2 = await model.findOne({ id, ...ctx.where })
      ctx.body = { data, data2, msg: '更新成功' }
    },
    // 添加
    async $post (ctx) {
      const data = await model.create(ctx.request.body)
      ctx.body = { data, msg: '添加成功' }
    },
    // 删除
    async $deleteMany (ctx) {
      console.log(ctx.query)
      const { id } = ctx.query
      const data = await model.destroy({ id, ...ctx.where })
      ctx.body = { data, msg: '删除成功' }
    }
  }
}