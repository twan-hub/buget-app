import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { clipboardOutline } from 'ionicons/icons';

const getCurrentYearWeek = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDays = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const weekNumber = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNumber}`;
};

const generateWeeklyCode = (username: string): string => {
  const input = username + getCurrentYearWeek();
  const hash = sha256(input);
  const intCode = parseInt(hash.substring(0, 8), 16);
  return (intCode % 1000000).toString().padStart(6, '0');
};

interface WeeklyCodeProps {
  username: string;
}

const WeeklyCode: React.FC<WeeklyCodeProps> = ({ username }) => {
  const [code, setCode] = useState('');
  const [weekId, setWeekId] = useState(getCurrentYearWeek());
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const newCode = generateWeeklyCode(username);
    setCode(newCode);

    const interval = setInterval(() => {
      const currentWeek = getCurrentYearWeek();
      if (currentWeek !== weekId) {
        setWeekId(currentWeek);
        const updatedCode = generateWeeklyCode(username);
        setCode(updatedCode);
      }
    }, 60 * 60 * 1000); // every hour

    return () => clearInterval(interval);
  }, [username, weekId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Weekly Code</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        Hello <strong>{username}</strong>, your 6-digit code for this week is:
        <h2 style={{ fontFamily: 'monospace' }}>{code}</h2>

        <IonButton onClick={handleCopy} color="medium">
          <IonIcon icon={clipboardOutline} slot="start" />
          Copy Code
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Code copied to clipboard!"
          duration={1500}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default WeeklyCode;
