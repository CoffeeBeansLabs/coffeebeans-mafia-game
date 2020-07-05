const {nanoid} = require('nanoid')

module.exports = class Player {
  isCaptain

  constructor (name,isCaptain,token,role) {
    this.isCaptain = isCaptain
    this.name = name
    this.id = nanoid()
    this.role = role
    this.token = token
  }
}
