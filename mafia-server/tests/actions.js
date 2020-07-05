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
    },
    gameState: {
      turn: 2,
      step: {
      }
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
