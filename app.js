const Koa = require('koa')
const app = new Koa()
const koaStatic = require("koa-static")
const koaBody = require('koa-body')
const path = require("path")

// 统一错误处理
app.use(async (ctx, next) => {
  try {
    await next();
    //如果没有更改过 response 的 status，则 koa 默认的 status 是 404 
    if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
  } catch (e) {
    console.log(e)
    ctx.body = { msg: e.message, code: -1 }
  }
})

app.use(koaStatic(path.join(__dirname, "public")))
app.use(koaBody({
  multipart: true, // 支持文件上传
  //encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, 'public/uploads'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin: (name, file) => { }
  }
}))

app.use(async (ctx, next) => {
  ctx.where = {}
  ctx.options = { attributes: {} }
  console.log(ctx.request.method, ctx.request.url)
  // console.log(ctx.request.body)
  await next()
})


const router = require("./router")

router.get("/", async function (ctx) {
  ctx.body = { message: "Hello World!" }
})



app.use(router.routes()).use(router.allowedMethods())


app.listen(4200)




