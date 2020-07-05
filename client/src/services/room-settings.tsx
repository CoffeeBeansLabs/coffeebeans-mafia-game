export const saveRoomSettings = async (settings, roomId, token) => {
  // save on the backend
  settings.minRequiredPlayers = getRequiredPlayers(settings);
  settings.roomId = roomId
  const players = [{
    name: settings.captain,
    role: 'captain',
    token: token
  }]

  localStorage.setItem('activePlayers', JSON.stringify(players))
  localStorage.setItem('settings', JSON.stringify(settings));
  localStorage.setItem('username', settings.captain);
}

export const getRoomSettings = async (roomId) => {
  // save on the backend
  return JSON.parse(localStorage.getItem('settings') || '')
}

const getRequiredPlayers = (settings) => {
  return Number(settings.villagers) +
    Number(settings.mafia) +
    Number(settings.doctor) +
    Number(settings.cop);
}