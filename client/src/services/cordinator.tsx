


export const getActivePlayers = async (roomId) => {
  // Get from the backend
  return JSON.parse(localStorage.getItem('activePlayers') || '')
}

export const registerPlayer = async (username, roomId) => {
  // getActivePlayers
  const activePlayers = await getActivePlayers(roomId);
  activePlayers.push({
    name: username
  })

  // save on the backend as well
  localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
  localStorage.setItem('username', username);

  return JSON.parse(localStorage.getItem('activePlayers') || '')
}

export const saveRoomSettings = async (settings, roomId) => {
  // save on the backend
  settings.minRequiredPlayers = settings.villagers + settings.mafia + settings.doctor + settings.cop;
  settings.roomId = roomId
  const players = [{
    name: settings.captain
  }]
  console.log('----', settings)
  localStorage.setItem('activePlayers', JSON.stringify(players))
  localStorage.setItem('settings', JSON.stringify(settings));
  localStorage.setItem('username', settings.captain);
}

export const getRoomSettings = async (roomId) => {
  // save on the backend
  return JSON.parse(localStorage.getItem('settings') || '')
}