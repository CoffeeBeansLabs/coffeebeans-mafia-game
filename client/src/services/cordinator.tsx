export const assignRoles = (players, roomId) => {
  const settings = JSON.parse(localStorage.getItem('settings') || '')
  players = shufflePlayers(players)

  let playerIndex = 0
  let charactersCount = {
    villager: Number(settings.villagers),
    mafia: Number(settings.mafia),
    doctor: Number(settings.doctor),
    cop: Number(settings.cop)
  } 

  Object.keys(charactersCount)
    .forEach(character => {
    while (charactersCount[character]) {
      players[playerIndex].character = character

      playerIndex++
      charactersCount[character]--
    }
  })

  localStorage.setItem('activePlayers', JSON.stringify(players))

  // save to backend
};


const shufflePlayers = (players) => {
  for(let i = players.length-1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = players[i]
    players[i] = players[j]
    players[j] = temp
  }

  return players
}