const Axios = require('axios')

class ThingSpeakDevice {
  /**
   * @params {String} id
   */
  constructor({ id }) {

    this.http = Axios.create({
      baseURL: `https://thingspeak.com/channels/${id}`
    })

    this.entries = null
    this.lastEntryId = null
  }

  /**
   * @return {JSON} - { channel, feeds }
   */
  async fetchFeed() {
    const { data } = await this.http.get('/feed.json')
    return data
  }

  async updateFeed() {
    const feed = await this.fetchFeed()
    const { entries, lastEntryId } = ThingSpeakDevice.feedReducer(feed)
    this.entries = entries
    this.lastEntryId = lastEntryId
    return { entries, lastEntryId }
  }

  /**
   *
   */
  static feedReducer({ channel, feeds }) {
    return {
      lastEntryId: channel.last_entry_id,
      entries: feeds.map((entry) => {

        const accelerometer = entry.field1
          .split(' ')
          .map((str) => Number(str))

        const magnetometer = entry.field2
          .split(' ')
          .map((str) => Number(str))

        const gyroscope = entry.field3
          .split(' ')
          .map((str) => Number(str))

        const humidity = Number(entry.field4)
        const temperature = Number(entry.field5)
        const pressure = Number(entry.field6)
        const light = Number(entry.field7) * 10000000
        const noise = Number(entry.field8)

        return {
          createdAt: entry.created_at,
          entryId: entry.entry_id,
          accelerometer,
          magnetometer,
          gyroscope,
          humidity,
          temperature,
          pressure,
          light,
          noise
        }
      })
    }
  }
}

module.exports = ThingSpeakDevice

