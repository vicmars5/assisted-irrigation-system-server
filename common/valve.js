const Axios = require('axios')

const http = Axios.create({

})

class Valve {

  /**
   * @params options
   * @params {String} host - Axios.baseURL
   */
  constructor({ host }) {
    this.http = Axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    })
  }

  /**
   * Turn on/off valve
   * @params {String} pin - Pin number
   * @params {Boolean} state - true: turn on, false: turn off
   */
  async power(pin, state = true) {
    const strState = state ? 'on' : 'off'
    const { data } = await this.http.get(`${pin}/${strState}`)
    return data
  }
}

module.exports = Valve

