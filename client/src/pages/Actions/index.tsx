import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IonAvatar, IonLabel, IonChip, IonButton } from '@ionic/react';
import { getInstructionBasedOnCharacter, filterVotingList } from './actions'
import './styles.css';

const Actions = ({ players, saveAction, currentCycle }) => {
  const [votedPlayer, setVotedPlayer] = useState({ name: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', role: '' })
  const [votingList, setVotingList] = useState([]);
  const [instruction, setInstruction] = useState({ display: '', enableVote: false })

  useEffect(() => {
    const currentUser = players.find(p =>
      p.name === localStorage.getItem("username"))

    setCurrentUser(currentUser)
    const i: any = getInstructionBasedOnCharacter('mafia', currentCycle)
    setInstruction(i)

    const list = filterVotingList(currentUser, players)
    setVotingList(list)

  }, [players, currentCycle])

  return (
    <div className="actions">
      <div className="info">{instruction.display}</div>
      {
        instruction.enableVote ?
          <>
            {votingList.map((player: any) => (
              <IonChip key={player.name} onClick={() => { setVotedPlayer(player) }}>

                <IonAvatar>
                  <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" alt="" />
                </IonAvatar>
                <IonLabel>{player.name}</IonLabel>

              </IonChip>
            ))}

            <div className="info">Your selected: {votedPlayer.name}</div>

            <IonButton color="danger" onClick={saveAction(votedPlayer)}>
              Confirm Vote
            </IonButton> 
          </> : null
      }
    </div>
  )
}

Actions.propTypes = {
  players: PropTypes.array,
  saveAction: PropTypes.func,
  currentCycle: PropTypes.string
}

Actions.defaultProps = {
  list: [],
}

export default Actions
