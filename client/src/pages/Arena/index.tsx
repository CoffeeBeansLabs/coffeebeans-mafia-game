import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { IonButton } from '@ionic/react';


import './styles.css'

const Arena = ({ players, minPlayers }) => {
  const [ currentUser ] = useState(localStorage.getItem('username'))
  const [ captain, setCaptain ] = useState({ name: '' })

  useEffect (() => {
    const captain = players.find(p => p.role === "captain")
    setCaptain(captain)
  }, [ players ])

  const startGame = () => {
    
  }

  return (
    <div className="arena">
      <span className="hint">
        {players.length === minPlayers 
          ? currentUser === (captain && captain.name)
            ? (<IonButton type="submit" color="danger" onClick={startGame}>
                Let's begin!
              </IonButton>)
            : (`Waiting for captain to start the game..`)
          : "Waiting for players to join..."
        }
      </span>
    </div>
  )
}

Arena.propTypes = {
  players: PropTypes.array,
  minPlayers: PropTypes.number,
}

Arena.defaultProps = {
  players: [],
  minPlayers: 0,
}

export default Arena
