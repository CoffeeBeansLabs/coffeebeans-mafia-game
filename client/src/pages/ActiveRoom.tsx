import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ActiveRoom.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Room</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Room</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="container">
            <p>Active players: 1</p>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
