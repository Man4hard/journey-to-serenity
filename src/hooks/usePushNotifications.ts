import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

export interface PushNotificationState {
  token: string | null;
  notification: PushNotificationSchema | null;
  isSupported: boolean;
  isRegistered: boolean;
}

export const usePushNotifications = () => {
  const [state, setState] = useState<PushNotificationState>({
    token: null,
    notification: null,
    isSupported: Capacitor.isNativePlatform(),
    isRegistered: false
  });

  const registerPush = async () => {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications only work on native platforms');
      return;
    }

    try {
      // Request permission
      const permResult = await PushNotifications.requestPermissions();
      
      if (permResult.receive === 'granted') {
        // Register with Apple / Google to receive push
        await PushNotifications.register();
      } else {
        console.log('Push notification permission denied');
      }
    } catch (error) {
      console.error('Error registering push notifications:', error);
    }
  };

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // On registration success, save the token
    const registrationListener = PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token:', token.value);
      setState(prev => ({ ...prev, token: token.value, isRegistered: true }));
    });

    // On registration error
    const errorListener = PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
    });

    // When a notification is received while app is in foreground
    const receivedListener = PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push notification received:', notification);
      setState(prev => ({ ...prev, notification }));
    });

    // When user taps on a notification
    const actionListener = PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Push notification action performed:', action);
      setState(prev => ({ ...prev, notification: action.notification }));
    });

    // Auto-register on mount
    registerPush();

    // Cleanup listeners
    return () => {
      registrationListener.then(l => l.remove());
      errorListener.then(l => l.remove());
      receivedListener.then(l => l.remove());
      actionListener.then(l => l.remove());
    };
  }, []);

  return {
    ...state,
    registerPush
  };
};
