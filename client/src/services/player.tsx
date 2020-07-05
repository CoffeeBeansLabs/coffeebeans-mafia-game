export const getActivePlayers = async (roomId) => {
  // Get from the backend
  return JSON.parse(localStorage.getItem('activePlayers') || '')
}

export const registerPlayer = async (username, roomId, token) => {
  // getActivePlayers
  const activePlayers = await getActivePlayers(roomId);
  activePlayers.push({
    name: username,
    roomId: roomId ?? 'test',
    token: token
  })

  // save on the backend as well
  localStorage.setItem('activePlayers', JSON.stringify(activePlayers));
  localStorage.setItem('username', username);

  return JSON.parse(localStorage.getItem('activePlayers') || '')
}
