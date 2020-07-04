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
  IonFab,
  IonChip,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import ActivePlayers from '../ActivePlayers';
import * as settingsService from "../../services/room-settings";
import * as playerService from "../../services/player";

import './styles.css';
import Arena from '../Arena';

const GAME_CYCLES = {
  nightCycleDuration: 'NIGHT CYCLE',
  dayCycleDuration: 'DAY CYCLE'
}

const Playground = () => {
  const { id: roomId } = useParams()

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'))
  const [settings, setSettings] = useState({
    minRequiredPlayers: 0,
    nightCycleDuration: 0,
    dayCycleDuration: 0
  })
  const [activePlayers, setActivePlayers] = useState([])

  const [gameCycle, setGameCycle] = useState('');
  const [timerOn, setTimerOn] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);

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

  const switchCycle = () => {
    console.log('settings.nightCycleDuration', settings.nightCycleDuration)
    if (!gameCycle || gameCycle === GAME_CYCLES.dayCycleDuration) {
      setTimerDuration(settings.nightCycleDuration)

      setGameCycle(GAME_CYCLES.nightCycleDuration)
    } else {
      setTimerDuration(settings.dayCycleDuration)

      setGameCycle(GAME_CYCLES.dayCycleDuration)
    }

    setTimerOn(true)
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
            <IonButtons slot="secondary">
              <IonButton>
                {gameCycle}
              </IonButton>
              {timerOn ? (
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  isPlaying
                  size={100}
                  strokeWidth={3}
                  duration={Number(timerDuration) * 60}
                  colors={[['#A30000']]}
                  //onComplete={() => setTimerOn(false)}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
              ) : null}
            </IonButtons>
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

            <Arena
              players={activePlayers}
              minPlayers={settings.minRequiredPlayers}
              roomId={roomId}
              switchCycle={switchCycle} />
          </div>
        </IonContent>
      </IonPage>
    </div>
  )
}

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime || "Times up!"}</div>
    </div>
  );
};

export default Playground
