import React from 'react'
import './styles.css';

import Participant from "../../components/Participant";

const VideoContainer = (localParticipant) => {
  return (
    <div className="highlight video-container">
    {/* { JSON.stringify(localParticipant) } - {localParticipant.sid} - {localParticipant.localParticipant.sid} */}
    <Participant
            key={localParticipant.localParticipant.sid}
            participant={localParticipant.localParticipant}
          />
    </div>
  )
}

export default VideoContainer
