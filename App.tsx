import React, { useState } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

interface IMeetingData {
  room_name: string;
  jitsi_domain: string;
}


export default function App() {
  const [meetingData, setMeetingData] = useState<IMeetingData | null>(null);

  const requestCall = async () => {
    try {
      const response = await fetch(
        'https://46634d54ca17.ngrok-free.app/api/meetings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMeetingData(data);
    } catch (err) {
      console.error(err);
    }
  };
  if (meetingData) {
    console.log("firinggg");

    return (
      <View style={{ flex: 1 }}>
        <JitsiMeeting
          room={meetingData.room_name}
          serverURL={meetingData.jitsi_domain}
          userInfo={{
            displayName: 'Test User',
            avatarURL: 'https://example.com/avatar.jpg',
            email: 'test@example.com',
          }}
          style={{ flex: 1 }}
        />
      </View>
    )
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Request Call" onPress={requestCall} />
      </View>
      {/*
        meetingData && (<>

          
        </>)
      */}
    </>
  );
}
