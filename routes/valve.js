const Router = require('koa-router')
const Valve = require('../common/valve')

// Allowed pins
const PINS = [4, 5]

const router = new Router({
  prefix: '/valve'
})

const valve = new Valve({
  host: 'http://192.168.0.32/'
})

/**
 * Return GPIO pins state
 *
 * @return {JSON} - { 4: Boolean, 5: Boolean }
 */
router.get('/', async (ctx) => {
  ctx.body = await valve.getState()
})

/**
 * @params {String} pin - Pin to change state.
 * @params {String} power - Power 'on'/'off'
 * @return {JSON} - { 4: Boolean, 5: Boolean }
 */
router.post('/:pin/:power', async (ctx) => {
  const { pin, power } = ctx.params
  ctx.body = await valve.power(pin, power === 'on')
})

module.exports = router
