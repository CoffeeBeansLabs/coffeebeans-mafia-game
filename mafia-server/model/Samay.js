const GameStates = require('./GameStates')
const _ = require('lodash')
// const { timer } = require()
module.exports = class Samay {

  constructor (stepTime, god,gameStates) {
    this.stepTime = stepTime
    this.god = god
    this.actionEvents = {}
    this.gameOutcome = 'tick'
    this.timer = null
    this.playerDone = {}
    this.currentOutcome = {}
  }

  startTime () {
    this.timer = setTimeout(this.tick, this.stepTime)
  }

  tick () {
    const outcome = this.god.processActions(_.values(this.actionEvents))
    this.currentOutcome  = outcome;
    this.actionEvents = {}
    if (outcome.gameState.isGameOver) {
      this.stopTimer()
    } else {
      this.timer = setTimeout(this.tick, this.stepTime)
    }
  }

  recordAction (playerId, actionEvent) {
    if(playerId){
      this.actionEvents[playerId] = actionEvent
    }
  }

  recordDone (playerId) {
    this.playerDone[playerId] = true
    const activePlayers = this.god.getActivePlayers()
    const allDone = _.every(activePlayers, (player) => {
      return this.playerDone[player.id];
    })
    if(allDone) {
      this.stopTimer()
      this.tick()
    }
  }

  recordAllDone () {
    this.stopTimer()
    this.tick()
  }

  stopTimer () {
    clearTimeout(this.timer)
  }
}
