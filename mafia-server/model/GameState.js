
class GameState {

  constructor (phase, activity, onNext, turnStart) {
    this.phase = phase;
    this.activity = activity;
    this.paths = {};
    this.onNext = onNext;
    this.turn = 0
    this.turnStart = !!turnStart
  }

  linkNext (event, nextState) {
    this.paths[event] = nextState;
    return this;
  }

  next (event) {
    this.onNext(this,event);
    const nextTurn = this.paths[event]
    if(!nextTurn) return this;

    if(nextTurn.phase === "gameOver") {
      this.isGameOver = true
    }

    let turn = this.turn;
    if(nextTurn.turnStart) {
      turn = this.turn + 1;
    }
    nextTurn.setTurn(turn)
    return nextTurn
  }

  setTurn(turn) {
    this.turn = turn
  }


}

module.exports = GameState
