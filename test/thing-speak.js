const assert = require('assert').strict
const Expect = require('expect.js')
const ThingSpeakDevice = require('../common/thing-speak')

const thingSpeakId = '613893'
const FEED = {
      channel: {
        id: 613893,
        name: 'BoschDay XDK Equipo 04',
        latitude: '0.0',
        longitude: '0.0',
        field1: 'Accel',
        field2: 'Mag',
        field3: 'Gyro',
        field4: 'Humidity',
        field5: 'Temp',
        field6: 'Pressure',
        field7: 'Light',
        field8: 'Noise',
        created_at: '2018-10-29T17:23:08Z',
        updated_at: '2018-10-29T17:23:08Z',
        last_entry_id: 141
      },
      feeds: [{
        created_at: '2018-10-30T17:37:56Z',
        entry_id: 42,
        field1: '39 32 1049',
        field2: '28 15 2 6668',
        field3: '-3662 -976 1831',
        field4: '39',
        field5: '26291.000000',
        field6: '84291',
        field7: '0.001468',
        field8: '-1515870811'
      }, {
        created_at: '2018-10-30T17:39:23Z',
        entry_id: 43,
        field1: '37 33 1039',
        field2: '28 16 3 6665',
        field3: '-4028 3051 7324',
        field4: '37',
        field5: '26371.000000',
        field6: '84282',
        field7: '0.000654',
        field8: '-1515870811'
        }]
}

describe('ThingSpeak API', () => {
  const device = new ThingSpeakDevice({ id: thingSpeakId })

  it('Fetch feed', async () => {
    const feed = await device.fetchFeed()
    assert.ok(feed)
  })

  it('Feed reducer', async () => {
    const feed = ThingSpeakDevice.feedReducer(FEED)
    assert.deepStrictEqual(feed, {"lastEntryId":141,"entries":[{"createdAt":"2018-10-30T17:37:56Z","entryId":42,"accelerometer":[39,32,1049],"magnetometer":[28,15,2,6668],"gyroscope":[-3662,-976,1831],"humidity":39,"temperature":26291,"pressure":84291,"light": 14679.999999999998,"noise":-1515870811},{"createdAt":"2018-10-30T17:39:23Z","entryId":43,"accelerometer":[37,33,1039],"magnetometer":[28,16,3,6665],"gyroscope":[-4028,3051,7324],"humidity":37,"temperature":26371,"pressure":84282,"light":6540, "noise":-1515870811}]})
  })

  it('Update feed', async () => {
    const feed = await device.updateFeed()
    Expect(feed).to.only.have.keys('entries', 'lastEntryId')
    Expect(feed.entries).to.be.an(Array)
    Expect(feed.lastEntryId).to.be.a('number')
  })
})
