import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  useStreamVideoClient,
  useCallStateHooks,
  CallingState,
  Call,
  StreamCall,
  CallContent,
  useCalls,
} from '@stream-io/video-react-native-sdk';

type Props = {goToHomeScreen: () => void; callId: string};

export const CallScreen = ({goToHomeScreen, callId}: Props) => {
  const [call, setCall] = React.useState<any>(null);
  const calls = useCalls()
  const client = useStreamVideoClient();

  useEffect(() => {
    // client?.call('default', callId).getOrCreate({
    //   ring: true,
    //   data: {
    //     members: [
    //       { user_id: 'Senator_Bail_Organa' },
    //       { user_id: 'Senator_Bail_Organa123' },
    //     ],
    //   },
    // })
    // const _call = client?.call('default', callId);
    // _call?.join({create: true,ring: true}).then(() => setCall(_call));
  }, [client, callId]);

  useEffect(() => {
    setCall(calls[0])
  }, [calls]);

  if (!call) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Joining call...</Text>
      </View>
    );
  }
  return (
    <StreamCall call={call}>
      <View style={styles.container}>
        <Text style={styles.text}>Here we will add Video Calling UI</Text>
        <Button title="Go back" onPress={goToHomeScreen} />
        <ParticipantCountText />
        <CallContent onHangupCallHandler={goToHomeScreen} />
      </View>
    </StreamCall>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

const ParticipantCountText = () => {
  const {useParticipantCount} = useCallStateHooks();
  const participantCount = useParticipantCount();
  return (
    <Text style={styles.text}>Call has {participantCount} participants</Text>
  );
};
