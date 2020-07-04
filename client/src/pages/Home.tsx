import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CB MAFIA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <strong>Coffebeans Consulting presents MAFIA!</strong>
          <p>
            <IonButton fill="solid" color="secondary" routerLink="/create-room" routerDirection="root">Create a Room</IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
