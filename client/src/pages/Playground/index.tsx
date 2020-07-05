import React, { useState, useEffect, useCallback } from 'react'
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
  IonButton,
  IonButtons,
} from '@ionic/react';
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

import ActivePlayers from '../ActivePlayers';
import Actions from '../Actions';
import * as settingsService from "../../services/room-settings";
import * as playerService from "../../services/player";
import { saveAction } from "../../services/action";

import './styles.css';
import Arena from '../Arena';

const GAME_CYCLES = {
  nightCycleDuration: 'NIGHT CYCLE',
  dayCycleDuration: 'DAY CYCLE',
}

const Playground = () => {
  const { id: roomId } = useParams()

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'));
  
  const [token, setToken] = useState(() => {
    const username = localStorage.getItem('username');
    const players = JSON.parse(localStorage.getItem('activePlayers') ?? 'null');
    return players != null ? players.find(p => p.name == username).token : null;
  }
  );

  const [settings, setSettings] = useState({
    minRequiredPlayers: 0,
    nightCycleDuration: 0,
    dayCycleDuration: 0
  })
  const [activePlayers, setActivePlayers] = useState([])

  const [currentCycle, setCurrentCycle] = useState('');
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

  const getToken = async () => {
    const data = await fetch('http://localhost:3001/video/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        room: roomId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.token);
    return data.token;
  }

  const registerPlayer = async () => {
    const token = await getToken();
    const activePlayersList = await playerService.registerPlayer(username, roomId, token);
    setActivePlayers(activePlayersList)
    setCurrentUser(username)
  }

  const switchCycle = () => {
    if (!currentCycle || currentCycle === GAME_CYCLES.dayCycleDuration) {

      setCurrentCycle(GAME_CYCLES.nightCycleDuration)
      setTimerDuration(Number(settings.nightCycleDuration) * 60)
    } else {

      setCurrentCycle(GAME_CYCLES.dayCycleDuration)
      setTimerDuration(Number(settings.dayCycleDuration) * 60)
    }

    setTimerOn(true)
  }

  const savePlayerAction = (votedPalyer) => {
    console.log(votedPalyer)
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
              {}
              <IonButton>
                {currentCycle}
              </IonButton>
              {timerOn ? (
                <div className="timer-wrapper">
                  {/* <CountdownCircleTimer
                    key={timerDuration}
                    isPlaying
                    size={100}
                    strokeWidth={3}
                    duration={timerDuration}
                    colors={[['#A30000']]}
                    onComplete={() => {
                      switchCycle()
                      return [true, 3000]
                    }}
                  >{renderTime}
                  </CountdownCircleTimer> */}
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

            {token != null ? <Arena
              players={activePlayers}
              minPlayers={settings.minRequiredPlayers}
              roomId={roomId}
              switchCycle={switchCycle}
              token={token}
            /> : ''}
           

            {timerOn ?
              <Actions
                players={activePlayers}
                saveAction={savePlayerAction}
                currentCycle={currentCycle}
              /> : null
            }
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
