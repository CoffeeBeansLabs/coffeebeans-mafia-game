import React from 'react'
import PropTypes from 'prop-types'
import { IonList, IonItem } from '@ionic/react'

const ActivePlayers = ({ list, minPlayers }) => {
  return (
    <IonList>
      <span>Active players: {list.length} of {minPlayers}</span>

      {list.map(player => (
        <IonItem key={player.name}>{player.name}</IonItem>
      ))}
    </IonList>
  )
}

ActivePlayers.propTypes = {
  list: PropTypes.array,
  minPlayers: PropTypes.number
}

ActivePlayers.defaultProps = {
  list: [],
  minPlayers: 0
}

export default ActivePlayers
