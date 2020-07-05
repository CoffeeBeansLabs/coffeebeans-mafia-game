const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes')
const usersRouter = require('./routes/users')

const God = require('./model/God')
const Samay = require('./model/Samay')
const GameStates = require('./model/GameStates')

app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/players', usersRouter)
app.use('/actions', usersRouter)
app.use('/game-state', usersRouter)
app.use('/time-left', usersRouter)

god = new God()
gameStates = new GameStates()
gameStates.buildStates((state) => {
  console.log('new state : ', state)
})
samay = new Samay(360000, god, gameStates)

module.exports = app
