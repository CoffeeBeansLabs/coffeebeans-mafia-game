const nanoid = require('nanoid')

module.exports = class Player {

  constructor (name, id, role) {
    this.name = name
    this.id = nanoid()
    this.role = role
  }
}
