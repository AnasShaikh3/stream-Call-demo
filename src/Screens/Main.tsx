import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import CallProvider from '../Providers/CallProvider';
import NotificationsProvider from '../Providers/NotificationProvider';
import { generateUniqueAlphanumericString } from '../utils/helper';

type Props = {
  name: string;
  token: string;
};

export const isMI = Dimensions.get("screen").height > 870 ? false : true

const Main = ({name, token}: Props) => {
  const apiKey = 'yem4dtf4apaf';

  const user = {
    id: name,
    name: name,
    image: 'https://robohash.org/John',
  };
  

  const client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  useEffect(() => {
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, []);

  const onCall = () => {
  const callId = generateUniqueAlphanumericString(12);
    client?.call('default', callId).getOrCreate({
      ring: true,
      data: {
        members: [{user_id: 'User10'}, {user_id: 'User1'}],
      },
    });
  };

  return (
    <StreamVideo client={client}>
      <NotificationsProvider client={client} user={user} >
        <CallProvider>
          <Button title="Call" onPress={onCall} />
        </CallProvider>
      </NotificationsProvider>
    </StreamVideo>
  );
};

export default Main;

const styles = StyleSheet.create({});
