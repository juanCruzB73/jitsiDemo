import React, { useEffect, useState, useRef } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

interface IMeetingData {
  room_name: string;
  jitsi_domain: string;
  onReadyToClose?: () => void;
  settings: {
    startWithAudioMuted: boolean;
    startWithVideoMuted: boolean;
    startAudioOnly: boolean;

  }
}


export default function App() {
  const [meetingData, setMeetingData] = useState<IMeetingData | null>(null);
  const [buttonFired, setButtonFired] = useState(false);
  const jitsiMeeting = useRef(null);

  const toggleButton = () => {
    setButtonFired(!buttonFired);
  };


  useEffect(() => {
    const fireRequest = async () => {
      await requestCall();
    }
    fireRequest();
  }, [buttonFired])

  const requestCall = async () => {
    try {
      const response = await fetch(
        'https://ebf4d9cd565b.ngrok-free.app/api/meetings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMeetingData({ ...data, settings: { startWithAudioMuted: false, startWithVideoMuted: false, startAudioOnly: false } });
    } catch (err) {
      console.error(err);
    }
  };

  /*<JitsiMeeting
          flags={{ 'call-integration.enabled': true } as any}
          room={meetingData.room_name}
          serverURL={meetingData.jitsi_domain}
          config={meetingData.settings}
          ref={jitsiMeeting}
          style={{ flex: 1 }}
        />*/

  /*
    */
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Request Call" onPress={toggleButton} />
      </View>



    </>
  );
}
