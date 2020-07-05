import React from 'react'
import './styles.css';

import Participant from "../../components/Participant";

const VideoContainer = ({localParticipant, participants}) => {

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
