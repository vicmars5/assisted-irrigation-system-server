const KoaRouter = require('koa-router')

const FeedRouter = require('./feed')
const ValveRouter = require('./valve')

const router = new KoaRouter()

router.get('/', (ctx) => {
  ctx.body = 'Hello World'
})

const routes = [
  router,
  FeedRouter,
  ValveRouter
]

module.exports = routes

