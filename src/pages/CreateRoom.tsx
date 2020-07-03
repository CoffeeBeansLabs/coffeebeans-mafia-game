import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  IonContent,
  IonPage,
  IonItem,
  IonRange,
  IonLabel,
  IonButton,
  IonToast,
  IonInput,
  IonCard,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCardContent
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import './CreateRoom.css';

let initialValues = {
  roomName: "",
  villagers: 3,
  mafia: 2,
  doctor: 1,
  cop: 1,
  nightCycleDuration: 5,
  dayCycleDuration: 10
};

const CreateRoom = ({history}) => {
  const { control, handleSubmit, setError, getValues, errors, setValue } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [toasterMessage, setToasterMessage] = useState("");
  const [showErrorToast, setErrorToast] = useState(false);
  const [data, setData] = useState();

  const onSubmit = (data: any) => {
    if (Object.keys(errors).length) {
      console.log(errors)
      const x = Object.keys(errors).map(f => errors[f].message || `${f} is required`).toString()
      setToasterMessage(x)
      setErrorToast(true)
    }

    setData(data);
    const timestamp = new Date().getTime();
    console.log(data)
    history.push(`/room/${data.roomName.toLowerCase().replace (/\s/g, '-')}-${timestamp}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create room</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => {
            setErrorToast(false)
            setToasterMessage("")
          }}
          message={toasterMessage}
          duration={200}
        />
        <IonCard class="card-css">
          <IonCardContent>
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 18 }}>

              <IonItem>
                <IonLabel slot="start">Enter a room name:</IonLabel>
                <Controller
                  as={IonInput}
                  control={control}
                  class="input"
                  onIonChange={(e: any) => setValue("roomName", e.detail.value)}
                  name="roomName"
                />
              </IonItem>

              <IonLabel>Choose the number of players for each role.</IonLabel>

              <IonItem>
                <IonLabel class="label">Villagers</IonLabel>
                <Controller
                  as={IonInput}
                  type="number"
                  class="input"
                  control={control}
                  onIonChange={(e: any) => {
                    if (getValues('mafia') > e.detail.value) {
                      setError("villagers", {
                        type: "manual",
                        message: "Villagers should be more than mafia in number!"
                      });
                    }

                    setValue("villagers", e.detail.value);
                  }}
                  name="villagers"
                />

                <IonLabel class="label">Mafia</IonLabel>
                <Controller
                  as={IonInput}
                  type="number"
                  class="input"
                  control={control}
                  onIonChange={(e: any) => {
                    if (getValues('villagers') < e.detail.value) {
                      setError("mafia", {
                        type: "manual",
                        message: "Mafia should be less than villagers in number!"
                      });
                    }

                    setValue("mafia", e.detail.value);
                  }}
                  name="mafia"
                />

                <IonLabel class="label">Doctor</IonLabel>
                <Controller
                  as={IonInput}
                  type="number"
                  class="input"
                  control={control}
                  onIonChange={(e: any) => setValue("doctor", e.detail.value)}
                  name="doctor"
                />

                <IonLabel class="label">Cop</IonLabel>
                <Controller
                  as={IonInput}
                  type="number"
                  control={control}
                  class="input"
                  onIonChange={(e: any) => setValue("cop", e.detail.value)}
                  name="cop"
                />
              </IonItem>

              <IonItem>
                <IonLabel>Night cycle duration</IonLabel>
                <Controller
                  as={
                    <IonRange min={1} max={20} color="dark" step={1} snaps pin>
                      <IonLabel slot="start">1 minute</IonLabel>
                      <IonLabel slot="end">20 minutes</IonLabel>
                    </IonRange>
                  }
                  class="input"
                  control={control}
                  name="nightCycleDuration"
                  onIonChange={e => setValue("nightCycleDuration", e.detail.value)}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Day cycle duration</IonLabel>
                <Controller
                  as={
                    <IonRange min={1} max={20} color="dark" step={1} snaps pin>
                      <IonLabel slot="start">1 minute</IonLabel>
                      <IonLabel slot="end">20 minutes</IonLabel>
                    </IonRange>
                  }
                  class="input"
                  control={control}
                  name="dayCycleDuration"
                  onIonChange={e => setValue("dayCycleDuration", e.detail.value)}
                />
              </IonItem>
              <IonButton type="submit" color="danger">
                Let's play!
              </IonButton>

            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default CreateRoom;
