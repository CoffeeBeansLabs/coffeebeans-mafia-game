// @ts-nocheck
import axios from 'axios';
const API_BASE_URL = "http://localhost:3000"

export const getActivePlayers = async (roomId) => {
  // Get from the backend
  const result = await axios({
    method: 'GET',
    url: `${API_BASE_URL}/players`,
  })

  localStorage.setItem('activePlayers', JSON.stringify(result.data));
  return result.data
}

export const registerPlayer = async (username, roomId, token, isCaptain=false) => {
  const result = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/players`,
      data: { name: username, isCaptain: isCaptain, token: token }
    })
  // getActivePlayers
  const res = await getActivePlayers(roomId);

  debugger;
  const activePlayers = res

  // activePlayers.push({
  //   name: username,
  //   roomId: roomId ?? 'test',
  //   token: token
  // })

  // save on the backend as well
  localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
  localStorage.setItem('username', username);

  return JSON.parse(localStorage.getItem('activePlayers') || '')
}
