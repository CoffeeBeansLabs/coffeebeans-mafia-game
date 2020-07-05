import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './styles.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Legendary MAFIA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <div className="mafia-logo"><img src="assets/img/mafia_logo.jpg"></img></div>
          <strong>Coffebeans Consulting presents The Legendary MAFIA!</strong>
          <p>
            <IonButton fill="solid" color="secondary" routerLink="/create-room" routerDirection="root">Create a Room</IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
