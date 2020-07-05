const Player = require('./Player')
const ActionsProcessor = require('./ActionsProcessor')
const Chance  = require('chance')
const chance = new Chance()
const _ = require('lodash')

module.exports = class God {

  MAFIA = 'mafiaKill'
  DOCTOR = 'doctorSave'
  POLICE = 'policeInvestigate'
  BANISH = 'banish'
  SUSPECT = 'suspect'

  constructor () {
    this.players = []
    this.playerOutcomes = []
    this.gameOutcome = null

  }

  setStartState (startState) {
    this.currentState = startState
    const actionsProcessor = new ActionsProcessor([])
    this.playerOutcomes = this.computePlayerOutcomes(actionsProcessor)
  }

  createPlayer (name) {
    const player = new Player(name)
    this.players.push(player)
    return player
  }

  setPlayers (players) {
    this.players = players
  }

  getPlayers () {
    return this.players
  }

  getActivePlayers () {
    return this.playerOutcomes.filter(outcome => !outcome.isInactive).map(outcome => outcome.player)
  }

  getPlayerOutcome (playerId) {
    const playerOutcome = this.playerOutcomes.find(player => player.id === playerId)
    playerOutcome.gameState = this.gameState
    return playerOutcome
  }

  assignRoles (roleDistribution) {
    const shuffledPlayers = chance.shuffle(this.players)
    let playerIndex = 0
    _.keys(roleDistribution).forEach(character => {
      while (roleDistribution[character]) {
        shuffledPlayers[playerIndex].character = character

        playerIndex++
        roleDistribution[character]--
      }
    })
    this.players = shuffledPlayers;
  }

  getRole (playerId) {

  }

  processActions (actionEvents) {
    if (!this.currentState.isGameOver) {
      const actionsProcessor = new ActionsProcessor(actionEvents)

      const updatedActionEvents = this.validateAndFixActions(actionEvents)

      actionsProcessor.groupVotesByPlayerAction()
      this.playerOutcomes = this.computePlayerOutcomes(actionsProcessor)
      this.gameOutcome = this.computeGameOutcome()

      this.gameState = this.createSerGameState()
      const outcome = {
        playerOutcomes: this.playerOutcomes,
        gameState: this.gameState,
      }
      this.updateStep()
      return outcome
    }
  }

  createSerGameState () {
    return {
      phase: this.currentState.phase,
      activity: this.currentState.activity,
      turn: this.currentState.turn,
      event: this.gameOutcome,
    }
  }

  computePlayerOutcomes (actionsProcessor) {
    return this.players.filter(player => !player.isInactive).map(player => {
      const outcome = {}
      outcome.votes = actionsProcessor.getVotesForPlayer(player.id)
      outcome.player = player
      outcome.killedPlayer = actionsProcessor.getPlayerWithMaxActionVotes(this.MAFIA)
      outcome.savedPlayer = actionsProcessor.getPlayerWithMaxActionVotes(this.DOCTOR)
      outcome.verifiedPlayer = actionsProcessor.getPlayerWithMaxActionVotes(this.POLICE)
      outcome.banishedPlayer = actionsProcessor.getPlayerWithMaxActionVotes(this.BANISH)
      outcome.suspectedPlayer = actionsProcessor.getPlayerWithMaxActionVotes(this.SUSPECT)
      outcome.isInactive = !actionsProcessor.isPlayerActive(outcome)
      player.isInactive = !actionsProcessor.isPlayerActive(outcome)
      return outcome
    })
  }

  updateStep () {
    this.currentState = this.currentState.next(this.gameOutcome)
  }

  validateAndFixActions (actions) {
    // TODO : validate if all eligible players have actionEvents, else generate default action for missing players
    return actions
  }

  computeGameOutcome () {
    const activePlayers = this.playerOutcomes.reduce((count, outcome) => {
      return !outcome.isInactive ? ++count : count
    }, 0)

    const mafiaPlayers = this.playerOutcomes.reduce((count, outcome) => {
      return !outcome.isInactive && outcome.player.role === 'mafia' ? ++count : count
    }, 0)

    const goodOnes = activePlayers - mafiaPlayers
    if (mafiaPlayers >= goodOnes) return 'mafiaWin'
    if (mafiaPlayers === 0) return 'villagerWin'
    return 'tick'
  }
}
