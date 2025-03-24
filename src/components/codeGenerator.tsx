import './ExploreContainer.css';
import {sha256} from 'js-sha256';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

const getcurrentYearWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDays = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000)
    const weekNumber = Math.ceil((pastDays + startOfYear.getDay() +1) / 7)
    return `${now.getFullYear()}-W${weekNumber}`
};

const generateWeeklyCode = (username: string): string => {
    const input = username + getcurrentYearWeek()
    const hash = sha256(input)
    const intCode = parseInt(hash.substring(0,8), 16)
    return (intCode % 1000000).toString().padStart(6, '0')
}

interface WeeklyCodeProps {
  username: string;
}

const WeeklyCode: React.FC<WeeklyCodeProps> = ({ username }) => {
  const code = generateWeeklyCode(username)

  return (
    <IonCard>
    <IonCardHeader>
    <IonCardTitle>Weekly Code </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
    Hello <strong>{username}</strong>, 
    <h2> {code} </h2>
    </IonCardContent>
    </IonCard>
  );
};

export default WeeklyCode;
