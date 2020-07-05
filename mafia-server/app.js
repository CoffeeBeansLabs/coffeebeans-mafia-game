const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const {actions, players} = require('./tests/actions')

const indexRouter = require('./routes')
// const usersRouter = require('./routes/users')

const God = require('./model/God')
const Samay = require('./model/Samay')
const GameStates = require('./model/GameStates')

app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

god = new God()
gameStates = new GameStates()
gameStates.buildStates((state) => {
  console.log('new state : ', state)
})
samay = new Samay(360000, god, gameStates)
god.setPlayers(players)

// app.use('/', indexRouter)
// app.use('/players', usersRouter)
// app.use('/actions', usersRouter)
// app.use('/game-state', usersRouter)
// app.use('/time-left', usersRouter)

app.get('/', function (req, res) {
  res.render('index', {title: 'Express'})
})

//------------- players
app.get('/players', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(god.getPlayers())
})

app.post('/players', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const player = god.createPlayer(req.body.name)
  res.send(player)
})

//-------------- actions

app.post('/actions', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const action = req.body
  samay.recordAction(action.from.id,action)
  res.send({})
})

// -------------  game-state

app.get('/game-state', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const playerId = req.query.player


  let activePlayers = god.getActivePlayers()
  let phase = god.currentState.phase
  let activity = god.currentState.activity

  let actions = generateRandomActions(activePlayers, phase,activity)

  samay.startTime()
  actions.forEach(action => samay.recordAction(action.from.id, action))
  samay.recordAllDone()




  res.send(god.getPlayerOutcome(playerId))
})

// -------- game-start

app.post('/game-start', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  const roleDistribution = req.body.roleDistribution
  god.assignRoles(roleDistribution)
  god.setStartState(gameStates.currentState)
  samay.startTime()
  const result = {
    players : god.getPlayers(),
    gameState : god.createSerGameState()
  }
  res.send(result)
})

// app.use('/actions', usersRouter)

module.exports = app
