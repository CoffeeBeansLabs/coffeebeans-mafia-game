const Chance  = require('chance')

module.exports =  class RandomUtils {
  constructor () {
    this.roleDistribution = {
      villager:10,
      mafia: 3,
      doctor:1,
      police:2
    }
    this.chance = new Chance()
  }

  nextRole() {
    //TODO: need to fix the logic here
    return this.chance.pickset(['villager','mafia','doctor','police'])
  }
}
