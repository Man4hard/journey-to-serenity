# Push Notifications Setup for Android

## Firebase Setup Required

Push notifications on Android require Firebase Cloud Messaging (FCM).

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Add an Android app with your package name: `app.lovable.490bf74c45514849960651a296369fdf`

### Step 2: Download google-services.json
1. In Firebase Console → Project Settings → Your Apps → Android
2. Download `google-services.json`
3. Place it in `android/app/google-services.json`

### Step 3: Update Android Files

After running `npx cap add android`, update these files:

#### android/build.gradle
Add to `dependencies`:
```gradle
classpath 'com.google.gms:google-services:4.4.0'
```

#### android/app/build.gradle
Add at the bottom:
```gradle
apply plugin: 'com.google.gms.google-services'
```

Add to `dependencies`:
```gradle
implementation platform('com.google.firebase:firebase-bom:32.7.0')
implementation 'com.google.firebase:firebase-messaging'
```

### Step 4: Sync & Build
```bash
npx cap sync
npx cap open android
```

## Usage in App

The `usePushNotifications` hook is already set up:

```tsx
import { usePushNotifications } from '@/hooks/usePushNotifications';

function MyComponent() {
  const { token, notification, isRegistered } = usePushNotifications();
  
  // token = FCM token to send to your server
  // notification = last received notification
  // isRegistered = whether push is registered
}
```

## Sending Test Notifications

Use Firebase Console → Cloud Messaging → Send your first message
Or use the FCM token with your backend server.

## Notification Payload Format

```json
{
  "notification": {
    "title": "Daily Reminder",
    "body": "Stay strong on your journey! 💪"
  },
  "data": {
    "type": "reminder",
    "action": "open_app"
  },
  "to": "<FCM_TOKEN>"
}
```
