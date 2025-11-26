import React from 'react';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

export default function CallScreen({ route }) {
  const { roomName, serverURL } = route.params;

  return (
    <JitsiMeeting
      room={roomName}
      serverURL={serverURL}
      userInfo={{ displayName: 'Customer' }}
      style={{ flex: 1 }}
    />
  );
}