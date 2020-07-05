const actions =[
  {
    from: {    //player
      name: "player1",
      id: "p1",
      role: "mafia",
    },
    action: {
      name: "mafiaKill",
      message:"die!"
    },
    against: { // player
      id: "p7"
    }
  },
  {
    from: {    //player
      name: "player2",
      id: "p2",
      role: "mafia",
    },
    action: {
      name: "mafiaKill",
      message:"die!"
    },
    against: { // player
      id: "p7"
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player3",
      id: "p3",
      role: "mafia",
    },
    action: {
      name: "mafiaKill",
      message:"die!"
    },
    against: { // player
      id: "p6"
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player4",
      id: "p4",
      role: "doctor",
    },
    action: {
      name: "doctorSave",
      message:"gws"
    },
    against: { // player
      id: "p8"
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player5",
      id: "p5",
      role: "doctor",
    },
    action: {
      name: "doctorSave",
      message:"gws"
    },
    against: { // player
      id: "p4"
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player6",
      id: "p6",
      role: "villager",
    },
    action: {
      name: null,
      message:""
    },
    against: { // player
      id: null
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player7",
      id: "p7",
      role: "villager",
    },
    action: {
      name: null,
      message:""
    },
    against: { // player
      id: null
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player8",
      id: "p8",
      role: "villager",
    },
    action: {
      name: null,
      message:""
    },
    against: { // player
      id: null
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player9",
      id: "p9",
      role: "police",
    },
    action: {
      name: "policeInvestigate",
      message:"wru"
    },
    against: { // player
      id: "p3"
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  },
  {
    from: {    //player
      name: "player10",
      id: "p10",
      role: "police",
    },
    action: {
      name: "policeInvestigate",
      message:"wru"
    },
    against: { // player
      id: "p3"
    },
    gameState: {
      turn: 2,
      step: {
      }
    }
  }
]

const players = actions.map(action => action.from)

exports.actions = actions
exports.players = players


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

exports.generateRandomActions = generateRandomActions
