import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Call,
  CallContent,
  CallingState,
  RingingCallContent,
  StreamCall,
  useCalls,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-native-sdk';
import {isMI} from '../Screens/Main';

type Props = {};

const CallProvider = ({children}: PropsWithChildren) => {
  const [call, setCall] = useState<Call>();
  const calls = useCalls();

  // console.log("🚀 ~ CallProvider ~ CallingState.RINGING:", isMI, call?.state.callingState)

  useEffect(() => {
    setCall(calls[0]);
  }, [calls]);

  useEffect(() => {
    setCall(calls[0]);
  }, [calls]);

  if (!call) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </View>
    );
  }
  return (
    <StreamCall call={call}>
      <CallComp {...{call}} />
    </StreamCall>
  );
};

export default CallProvider;

const styles = StyleSheet.create({});

const CallComp = ({call}: {call: Call}) => {
  const {useParticipantCount, useCallState} = useCallStateHooks();
  const count = useParticipantCount();
  const state = useCallState();
  const user = useConnectedUser()
  user?.name != "User1" && console.log("🚀 ~ CallComp ~ state:", count,state.callingState)

  useEffect(() => {
    if(count == 1 && state.callingState == CallingState.LEFT){
      // call.leave()
    }
  }, [count, state.callingState])
  
  return (
    <>
      <RingingCallContent />
    </>
  );
};
