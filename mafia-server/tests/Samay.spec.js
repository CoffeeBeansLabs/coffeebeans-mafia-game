const {actions, players} = require('./actions')
const God = require('../model/God')
const Samay = require('../model/Samay')
const GameStates = require('../model/GameStates')

const Chance = require('chance')

const chance = new Chance()

let pickOtherPlayer = function (playerIds, fromPlayer) {
  let chosenPlayer = chance.pickone(playerIds)
  if (fromPlayer.from.id === chosenPlayer) {
    chosenPlayer = chance.pickone(playerIds)
  }
  return chosenPlayer
}

function pickPlayerExcludingRole (playerIds, fromPlayer, actions, role) {
  let chosenPlayerId = pickOtherPlayer(playerIds, fromPlayer)
  let chosenPlayer = actions.find(action => action.from.id === chosenPlayerId)

  while (chosenPlayer.from.role === role) {
    chosenPlayerId = pickOtherPlayer(playerIds, fromPlayer)
    chosenPlayer = actions.find(action => action.from.id === chosenPlayerId)
  }
  return chosenPlayerId
}

function pickAny (playerIds) {
  return chance.pickone(playerIds)
}

function generateRandomActions (players, phase,activity) {
  const playerIds = players.
    map(player => player.id)

  const generatedActions = playerIds.map(playerId => {
    const fromPlayer = actions.find(action => action.from.id === playerId)
    if (phase === 'day') {
      fromPlayer.action.name = activity === "vote1" ? 'suspect': 'banish'
      fromPlayer.against.id = pickOtherPlayer(playerIds, fromPlayer)
    } else if (phase === 'night') {
      switch (fromPlayer.from.role) {
        case 'mafia':
          fromPlayer.action.name = 'mafiaKill'
          fromPlayer.against.id = pickPlayerExcludingRole(playerIds, fromPlayer, actions, 'mafia')
          break
        case 'doctor':
          fromPlayer.action.name = 'doctorSave'
          fromPlayer.against.id = pickAny(playerIds)
          break
        case 'police':
          fromPlayer.action.name = 'policeInvestigate'
          fromPlayer.against.id = pickPlayerExcludingRole(playerIds, fromPlayer, actions, 'police')
          break
        default:
          fromPlayer.action.name = 'null'
          break
      }
    }
    return fromPlayer
  })
  return generatedActions
}

function printGameProgress (outcome) {
  const gameOutcome = outcome.gameState

  const activePlayers = outcome.playerOutcomes.filter(playerOutcome => !playerOutcome.isInactive)
  const playerOutcome = activePlayers[0]

  const result = {
    killed: playerOutcome.killedPlayer,
    saved: playerOutcome.savedPlayer,
    investigated: playerOutcome.verifiedPlayer,
    banishedPlayer: playerOutcome.banishedPlayer,
    suspectedPlayer: playerOutcome.suspectedPlayer,
    activePlayersCount: activePlayers.length,
    gameOutcome : gameOutcome
  }

  console.log(JSON.stringify(result,null,2))
}

describe('Samay', () => {
  describe('tick', () => {
    it('should be called when all players done', () => {
      const god = new God()
      const gameStates = new GameStates()
      gameStates.buildStates((state) => {
        // console.log('new state : ', state)
      })
      god.setPlayers(players)
      god.setStartState(gameStates.currentState)
      const samay = new Samay(10000, god, gameStates)

      for(let i = 0 ; i< 10 ; i++ ) {
        let activePlayers = god.getActivePlayers()
        let phase = god.currentState.phase
        let activity = god.currentState.activity

        let actions = generateRandomActions(activePlayers, phase,activity)
        actions.forEach(action => samay.recordAction())

        samay.startTime()
        actions.forEach(action => samay.recordAction(action.from.id, action))
        samay.recordAllDone()

        printGameProgress(samay.currentOutcome)
        console.log("--------------------------------------\n")
        if(samay.currentOutcome.gameState.phase === 'gameOver') break
      }
    })
  })
})
