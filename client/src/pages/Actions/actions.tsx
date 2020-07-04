import React from 'react'
import './styles.css'

export const getInstructionBasedOnCharacter = (character, gameCycle) => {
  switch (gameCycle) {
    case "NIGHT CYCLE":
      if (character === 'villager') {
        return {
          display: <span className="instruction">Please go to sleep until the night cycle is over.</span>,
          enableVote: false
        }
      }

      if (character === 'mafia') {
        return {
          display: <span>Please vote a villager to hang.</span>,
          enableVote: true
        }
      }

      if (character === 'doctor') {
        return {
          instdisplayruction: <span>Please vote a villager to save.</span>,
          enableVote: true
        }
      }

      if (character === 'cop') {
        return {
          display: <span>Please vote a villager whom you suspect of being the mafia.</span>,
          enableVote: true
        }
      }
      break;
    case "DAY CYCLE":
      if (character === 'villager') {
        return {
          display: <span>Please vote a villager to hang.</span>,
          enableVote: true
        }
      }

      if (character === 'villager') {
        return {
          display: <span>Please vote a villager to hang.</span>,
          enableVote: true
        }
      }

      if (character === 'villager') {
        return {
          display: <span>Please vote a villager to hang.</span>,
          enableVote: true
        }
      }

      if (character === 'villager') {
        return {
          display: <span>Please vote a villager to hang.</span>,
          enableVote: true
        }
      }
      break;
  }
}