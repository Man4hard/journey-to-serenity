import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.490bf74c45514849960651a296369fdf',
  appName: 'reboot-journey-app',
  webDir: 'dist',
  server: {
    url: 'https://490bf74c-4551-4849-9606-51a296369fdf.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
