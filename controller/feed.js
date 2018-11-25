const Device = require('../common/thin-speak')
const DEVICE_ID = '613893'
const device = new Device({ id: DEVICE_ID })

device
  .updateFeed()
  .then(() => console.log('Device ' + DEVICE_ID + ' updated.'))
  .catch((err) => console.error(err))

module.exports = {
  device
}
