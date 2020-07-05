// @ts-nocheck
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Video from 'twilio-video';
import { IonButton } from '@ionic/react';
import * as cordinator from '../../services/cordinator'
import VideoContainer from '../VideoContainer'
import { setGameContext } from "../../services/game-context";

import './styles.css'

const Arena = ({ players, minPlayers, roomId, switchCycle, token, gameContext }) => {
  const [currentUser, setCurrentUser] = useState({ name: '', character: '' })
  const [captain, setCaptain] = useState({ name: '' })
  const [startGame, setStartGame] = useState(false)
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const captain = players.find(p => p.role === "captain")
    setCaptain(captain)

    const currentUser = players.find(p =>
      p.name === localStorage.getItem("username"))

    setCurrentUser(currentUser)

    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomId
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          console.log(room);
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };

  }, [players, roomId, token, gameContext])

  const startGameAction = async () => {
    await cordinator.assignRoles(players, roomId)

    gameContext.gameStatus = true
    await setGameContext(roomId, gameContext) //save on the backend

    setStartGame(true)
    switchCycle()
  }

  return (
    <div className="arena">
      {startGame ? (
        <>
          <span className="instruction">Hi {currentUser.name}! Your role is {currentUser.character.toUpperCase()}</span>

          {room != null ? <VideoContainer localParticipant={room.localParticipant} /> : ''}
        </>
      ) :
        <span className="hint">
          {players.length === minPlayers
            ? (currentUser && currentUser.name) === (captain && captain.name)
              ? (<IonButton type="submit" color="danger" onClick={startGameAction}>
                Let's begin!
              </IonButton>)
              : ("Waiting for captain to start the game..")
            : "Waiting for players to join..."
          }
        </span>
      }
    </div>
  )
}

Arena.propTypes = {
  players: PropTypes.array,
  minPlayers: PropTypes.number,
  roomId: PropTypes.string,
  switchCycle: PropTypes.func,
  getCurrentCycle: PropTypes.func,
  gameContext: PropTypes.object
}

Arena.defaultProps = {
  players: [],
  minPlayers: 0,
  roomId: "",
}

export default Arena
