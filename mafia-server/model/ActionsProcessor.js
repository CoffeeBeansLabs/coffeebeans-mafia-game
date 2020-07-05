const _ = require('lodash')
const Chance = require('chance')

module.exports = class ActionsProcessor {

  constructor (actionEvents) {
    this.actionEvents = actionEvents
    this.votes = {}
    this.chance = new Chance()
  }

  groupVotesByPlayerAction () {
    this.votes = this.actionEvents.reduce((result, actionEvent) => {
      if (!actionEvent.against.id || actionEvent.against.id === '') {
        return result
      }
      // console.log(result)
      result[actionEvent.against.id] = result[actionEvent.against.id] || {}
      const playerResult = result[actionEvent.against.id]

      playerResult[actionEvent.action.name] = playerResult[actionEvent.action.name] || []
      const playerActions = playerResult[actionEvent.action.name]

      playerActions.push({
        id: actionEvent.from.id,
        action: actionEvent.action,
      })
      return result
    }, {})
  }

  getVotesForPlayer (playerId) {
    return this.votes[playerId]
  }

  getPlayerWithMaxActionVotes (action) {
    const votesByPlayer = _.keys(this.votes).map(playerId => {
      const playerVotes = this.votes[playerId]
      const votes = playerVotes[action] ? playerVotes[action].length : 0
      return {id:playerId, votes}
    })

    // shuffle to choose randomly when multiple players have same vote
    // _.maxBy(this.chance.shuffle(votesByPlayer), (playerVotes) => { playerVotes.votes})
    let playerWithMaxVotes = _.maxBy(votesByPlayer,
      (playerVotes) => { return playerVotes.votes})

    if(!playerWithMaxVotes || playerWithMaxVotes.votes === 0) return {}

    return playerWithMaxVotes
  }

  isPlayerActive(outcome) {
    if(outcome.banishedPlayer.id === outcome.player.id){
      return false
    }
    if(outcome.savedPlayer.id === outcome.player.id) {
      return true
    }
    else if(outcome.killedPlayer.id === outcome.player.id){
      return false;
    }
    return true;
  }

}
