const Expect = require('expect.js')
const Valve = require('../common/valve')

describe('Valve API', () => {
  const valve = new Valve({
    host: 'http://192.168.0.32/'
  })

  it('Write ON to pins 4 and 5', async () => {
    await valve.power('4', true)
    const data = await valve.power('5', true)
    Expect(data).to.eql({
      '4': true,
      '5': true
    });
  })

  it('Write OFF to pin 5', async () => {
    const data = await valve.power('5', false)
    Expect(data).to.eql({
      '4': true,
      '5': false
    });
  })

  it('Write OFF to pins 4 and 5', async () => {
    await valve.power('4', false)
    const data = await valve.power('5', false)
    Expect(data).to.eql({
      '4': false,
      '5': false
    });
  })
})

