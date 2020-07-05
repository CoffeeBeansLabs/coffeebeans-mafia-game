const GameState = require('./GameState')

class GameStates {
  constructor () {
    this.currentState = {}
  }

  buildStates(onStateChange){
    const nv = new GameState("night","vote1",onStateChange,true)
    const dv = new GameState("day","vote1",onStateChange)
    const dv2 = new GameState("day","vote2",onStateChange)

    const gameOver = new GameState("gameOver",'',onStateChange)
    // const setup = new GameState("setup",'',onStateChange)
    // const ready = new GameState("ready",'',onStateChange)

    // setup.linkNext('tick',ready)
    //
    // ready.linkNext('tick',nv)

    nv.linkNext('tick',dv);
    nv.linkNext('mafiaWin',gameOver);

    dv.linkNext('tick',dv2);

    dv2.linkNext('villagerWin',gameOver)
    dv2.linkNext('mafiaWin',gameOver)

    dv2.linkNext('tick',nv)

    this.currentState = nv;
  }

  getCurrentState(){
    return this.currentState;
  }

  next(event) {
    this.currentState = this.currentState.next(event)
    return this.currentState;
  }
}

module.exports = GameStates
