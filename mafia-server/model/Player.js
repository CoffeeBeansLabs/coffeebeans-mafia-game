const {nanoid} = require('nanoid')

module.exports = class Player {
  isCaptain

  constructor (name,isCaptain,token) {
    this.isCaptain = isCaptain
    this.name = name
    this.id = nanoid()
    this.role = ""
    this.token = token
  }
}
