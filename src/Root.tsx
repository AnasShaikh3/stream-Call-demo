import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {HomeScreen} from './HomeScreen';
import {CallScreen} from './CallScreen';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';

export default function Root({name, goToHomeScreen,myToken}: any) {
  const apiKey = 'yem4dtf4apaf';
  const callId = 'TESTING';

  const user = {
    id: name,
    name: name,
    image: 'https://robohash.org/John',
  };

  const client = new StreamVideoClient({
    apiKey,
    user,
    token: myToken,
  });  

  const onCall = ()=>{
    client?.call('default', callId).getOrCreate({
      ring: true,
      data: {
        members: [
          { user_id: 'Senator_Bail_Organa' },
          { user_id: 'Senator_Bail_Organa123' },
        ],
      },
    })
  }

  return (
    <StreamVideo client={client}>
      <SafeAreaView style={styles.container}>
        <CallScreen goToHomeScreen={goToHomeScreen} {...{callId}} />
        <Button title="Call" onPress={onCall} />
      </SafeAreaView>
    </StreamVideo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
