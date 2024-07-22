import React, { useState } from 'react';
import {Text, Button, StyleSheet, View, TextInput} from 'react-native';

type Props = {
  goToCallScreen: () => void;
  name:string, setName: React.Dispatch<React.SetStateAction<string>>
};

export const HomeScreen = ({goToCallScreen,name,setName}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Video Calling </Text>
      <TextInput placeholder='Enter your name' onChangeText={setName} value={name} placeholderTextColor='black' />
      <Button title="Join Video Call" onPress={goToCallScreen} />
    </View>
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