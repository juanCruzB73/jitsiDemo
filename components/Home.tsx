import React, { useState } from 'react';
import { Button, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
interface IMeetingData {
  room: string;
  jitsi_domain: string;
}
const Home = () => {
  const [meetingData, setMeetingData] = useState<IMeetingData | null>(null);


  const navigation = useNavigation();

  const requestCall = async () => {
    try {
      const response = await fetch(`https://some-adjusted-gone-squad.trycloudflare.com/api/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      setMeetingData(data);

      console.log("DOMAIN =", data?.jitsi_server_url);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };


  return (
    <View style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    }}>
      <Button
        color="blue"
        // @ts-ignore
        onPress={async () => {
          const data = await requestCall();
          if (data) {
            // @ts-ignore
            console.log(data);
            navigation.navigate('Meeting', {
              meetingData: data,
              room: data.room
            });
          }
        }}
        // @ts-ignore
        style={{ height: 32, width: 32 }}
        title="Join" />
    </View>
  );
};

export default Home;