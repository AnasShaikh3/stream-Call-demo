import {PropsWithChildren, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {StreamVideoClient} from '@stream-io/video-react-native-sdk';

export default function NotificationsProvider({
  children,
  client,
  user,
}: PropsWithChildren<{user: any; client: StreamVideoClient}>) {
  const [isReady, setIsReady] = useState(false);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    if (enabled) {
      console.log('Authorization status:', enabled);
    }
  };

  useEffect(() => {
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      const token = await messaging().getToken();
      const push_provider = 'firebase';
      const push_provider_name = 'Firebase';
      client.addDevice(token, push_provider, push_provider_name, user.id);
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();

      setIsReady(true);
    };

    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
