const God = require('../model/God')
const {actions,players}  = require('./actions')

describe('God', () => {
  describe('processActions', () => {
    it('',() => {
      const god = new God()
      god.setPlayers(players)
      const outcomes = god.processActions(actions)
      console.log(outcomes)
    })
  });
});
