const KoaRouter = require('koa-router')

const router = new KoaRouter()

router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

const routes = [
  router
]

module.exports = routes

