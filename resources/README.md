# Android App Icons & Splash Screen

## Required Images

Place your images in this folder, then run the commands below.

### App Icon
Create a **1024x1024 PNG** file named `icon.png`
- Should be your app logo
- No transparency recommended for Android

### Splash Screen
Create a **2732x2732 PNG** file named `splash.png`
- Center your logo in the middle
- Background color: #1a1a2e (dark blue)
- Logo should be ~500px in the center

## Generate Assets

After adding your images, install and run:

```bash
npm install -g @capacitor/assets
npx capacitor-assets generate --android
```

This will automatically generate all required sizes:
- `android/app/src/main/res/mipmap-*` (icons)
- `android/app/src/main/res/drawable-*` (splash)

## Manual Icon Sizes (if needed)

| Folder | Size |
|--------|------|
| mipmap-mdpi | 48x48 |
| mipmap-hdpi | 72x72 |
| mipmap-xhdpi | 96x96 |
| mipmap-xxhdpi | 144x144 |
| mipmap-xxxhdpi | 192x192 |

## Manual Splash Sizes (if needed)

| Folder | Size |
|--------|------|
| drawable-mdpi | 480x800 |
| drawable-hdpi | 800x1280 |
| drawable-xhdpi | 1280x1920 |
| drawable-xxhdpi | 1600x2560 |
| drawable-xxxhdpi | 1920x3200 |
