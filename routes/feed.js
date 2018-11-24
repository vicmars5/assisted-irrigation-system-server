const Router = require('koa-router')
const ThingSpeakDevice = require('../common/thing-speak')

const thingSpeakId = '613893'
const device = new ThingSpeakDevice({ id: thingSpeakId })

const router = new Router({
  prefix: '/feed'
})

router.get('/', async (ctx) => {
  let feed = await device.fetchFeed()
  feed = ThingSpeakDevice.feedReducer(feed)
  ctx.body = { feed }
})

module.exports = router
