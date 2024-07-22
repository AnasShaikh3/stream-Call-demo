import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Root from './src/Root';
import {sign} from 'react-native-pure-jwt';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/staticNavigation';
import Main from './src/Screens/Main';

type Props = {};

const App = (props: Props) => {
  const [name, setName] = useState('User10');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const onLogin = () => {
    const secret =
      '6fkcjtys3j5fkykhyfr5b4zwfys6k2tkpr6hagbac8bqvm77zr3psbyjnphs3fay'; 
    const payload = {user_id: name}; 
    const options = {alg: 'HS256'} as any;

    sign(payload, secret, options).then(res => {
      setToken(res);
      setIsLoggedIn(true);
    });
  };

  const goToHomeScreen = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Main {...{name,token}} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Video Calling </Text>
        <TextInput
          placeholder="Enter your name"
          onChangeText={setName}
          value={name}
          placeholderTextColor="black"
        />
        <Button title="Login" onPress={onLogin} />
      </View>
    </NavigationContainer>
  );
};

export default App;

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
