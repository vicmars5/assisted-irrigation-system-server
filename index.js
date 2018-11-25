const Koa = require('koa')

const Logger = require('koa-logger')
const Body = require('koa-body')
const Json = require('koa-json')
const Cors = require('koa-cors')

const Routes = require('./routes')

const app = new Koa()

app.use(Logger())
app.use(Body())
app.use(Json())
app.use(Cors())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {}

    if (process.env.DEVELOPMENT) {
      ctx.body.error = err.message
    }
  }
})

Routes.forEach((route) => {
  app
    .use(route.routes())
    .use(route.allowedMethods())
})

app.listen(3000)

