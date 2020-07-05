import React, { useState, useEffect } from 'react'
import './styles.css';

import Participant from "../../components/Participant";

const VideoContainer = ({localParticipant, participants, currentCycle, players}) => {

  const [videoParticipants, setVideoParticipants] = useState([])

  // useEffect(() => {
  //   const videoParticipants = participants.map(videoParticipant => {
  //     const p = players.find(p => p.name === videoParticipants.identity)
  //     if p.character === ''
  //   })
  // }, [])

  return (
    <div className="highlight video-container">
    {/* { JSON.stringify(localParticipant) } - {localParticipant.sid} - {localParticipant.localParticipant.sid} */}
        <Participant
            key={localParticipant.sid}
            participant={localParticipant}
          />
          { participants ? participants.map(participant => {
            console.log(participant)
            return (<Participant key={participant.sid} participant={participant} />)
          }
                
              )
            : null
          }
    </div>
  )
}

export default VideoContainer
