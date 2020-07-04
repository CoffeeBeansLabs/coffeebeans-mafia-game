import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { IonButton } from '@ionic/react';
import * as cordinator from '../../services/cordinator'


import './styles.css'

const Arena = ({ players, minPlayers, roomId }) => {
  const [currentUser, setCurrentUser] = useState({ name: '', character: '' })
  const [captain, setCaptain] = useState({ name: '' })
  const [startGame, setStartGame] = useState(false)

  useEffect(() => {
    const captain = players.find(p => p.role === "captain")
    setCaptain(captain)

    const currentUser = players.find(p =>
      p.name === localStorage.getItem("username"))

    setCurrentUser(currentUser)

  }, [players])

  const startGameAction = async () => {
    await cordinator.assignRoles(players, roomId)
    setStartGame(true)
  }

  return (
    <div className="arena">
      {startGame ? (
        <span>
          Hi {currentUser.name}!
          Your role is a {currentUser.character.toUpperCase()}
        </span>
      ) :
        <span className="hint">
          {players.length === minPlayers
            ? (currentUser && currentUser.name) === (captain && captain.name)
              ? (<IonButton type="submit" color="danger" onClick={startGameAction}>
                Let's begin!
              </IonButton>)
              : (`Waiting for captain to start the game..`)
            : "Waiting for players to join..."
          }
        </span>}
    </div>
  )
}

Arena.propTypes = {
  players: PropTypes.array,
  minPlayers: PropTypes.number,
  roomId: PropTypes.string,
}

Arena.defaultProps = {
  players: [],
  minPlayers: 0,
  roomId: "",
}

export default Arena
