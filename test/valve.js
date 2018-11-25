const Expect = require('expect.js')
const Valve = require('../common/valve')

describe('Valve API', () => {
  const valve = new Valve({
    host: 'http://192.168.0.32/'
  })

  it('Write ON to pin 5', async () => {
    try {
      const data = await valve.power('5', true)
      console.log(data)
    }
    catch (err) {
      console.error(err)
      throw err;
    }
  })
})

