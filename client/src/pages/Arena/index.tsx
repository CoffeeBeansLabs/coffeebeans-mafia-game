import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Arena = ({ players, minPlayers }) => {
  return (
    <div className="arena">
      <span className="hint">
        {players.length === minPlayers 
          ? "Let's begin"
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
