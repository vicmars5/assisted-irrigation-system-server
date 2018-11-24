const KoaRouter = require('koa-router')

const FeedRouter = require('./feed')

const router = new KoaRouter()

router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

const routes = [
  router,
  FeedRouter
]

module.exports = routes

