import axios from 'axios';
import { assignRoles } from './cordinator';
// import { API_BASE_URL } from '../constants';

const API_BASE_URL = "http://localhost:3000"

export const getGameContext = async (roomId) => {
  console.log('API_BASE_URL: ', API_BASE_URL)
  // const gameContext = await axios({
  //   method: 'GET',
  //   url: `${API_BASE_URL}/campaigns`,
  // })

  return JSON.parse(localStorage.getItem("gameContext") || '{}')
}

export const setGameContext = async (roomId, gameContext, settings) => {
  // const result = await axios({
  //   method: 'POST',
  //   url: `${API_BASE_URL}/game-start`,
  //   data: {
  //       villagers: settings.villagers,
  //       mafia: settings.mafia,
  //       doctor: settings.doctor,
  //       police: settings.cop,
  //    },
  // })

  // const players = assignRoles(JSON.parse(localStorage.getItem("activePlayers")||"{}"))

  // localStorage.setItem("activePlayers", JSON.stringify(players))
  
  return localStorage.setItem("gameContext", JSON.stringify(gameContext))
}

