// src/pages/Tab1.tsx
import {
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

interface UserData {
  email: string;
  lastLogin: string;
  subscriptionStatus: string;
  subscriptionExpiresAt: number;
}

const Tab1: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    console.log("Fetched docs:", querySnapshot.docs.length); // Check if any docs are fetched
  
    const fetchedUsers = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log("Doc data:", data); // Check the shape of the data
  
      return {
        email: doc.id,
        lastLogin: data.lastLogin || 'N/A',
        subscriptionStatus: data.subscriptionStatus || 'N/A',
        subscriptionExpiresAt: data.subscriptionExpirsesAt || 0,
      };
    });
  
    setUsers(fetchedUsers);
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonButton onClick={fetchUsers}>Show Users</IonButton>
        <IonList>
          {users.map((user, idx) => ( */}
            {/* <IonItem key={idx}> */}
            <IonItem>
              <IonLabel>
                <h2>eample@gmail.com</h2>
                <p>Last Login: 11/11/1999</p>
                <p>Status: active</p>
                <p>Expires At: 11/20/2266, 11:46:39 AM</p>
              </IonLabel>
            </IonItem>
          {/* ))}
        </IonList> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
