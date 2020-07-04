import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonFabButton,
  IonFab
} from '@ionic/react';

import ActivePlayers from '../ActivePlayers';
import * as settingsService from "../../services/room-settings";
import * as playerService from "../../services/player";

import './styles.css';
import Arena from '../Arena';

const Playground = () => {
  const { id: roomId } = useParams()

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'))
  const [settings, setSettings] = useState({ minRequiredPlayers: 0 })
  const [activePlayers, setActivePlayers] = useState([])

  const [username, setUsername] = useState(currentUser || '')

  useEffect(() => {
    const getSettings = async () => {
      const [settingsResponse, activePlayersResponse] = await Promise.all([
        settingsService.getRoomSettings(roomId),
        playerService.getActivePlayers(roomId)
      ])

      setSettings(settingsResponse)
      setActivePlayers(activePlayersResponse)
    }

    getSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const registerPlayer = async () => {
    const activePlayersList = await playerService.registerPlayer(username, roomId);

    setActivePlayers(activePlayersList)
    setCurrentUser(username)
  }

  if (!currentUser) {
    return (
      <div className="playground">
        <div className="room--register">
          <IonInput
            value={username}
            placeholder="Enter your name to proceed"
            onIonChange={e => setUsername(e.detail.value!)}
          />
          <IonFab>
            <IonFabButton onClick={registerPlayer} color="danger">Go!</IonFabButton>
          </IonFab>
        </div>
      </div>
    )
  }

  return (
    <div className="playground">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Room</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="room">
            <div className="stats">
              <ActivePlayers
                list={activePlayers}
                minPlayers={settings.minRequiredPlayers}
              />
            </div>

            <Arena players={activePlayers} minPlayers={settings.minRequiredPlayers} roomId={roomId} />
          </div>
        </IonContent>
      </IonPage>
    </div>
  )
}

export default Playground
