// Haptic feedback using Vibration API
class HapticsEngine {
  private isSupported: boolean;

  constructor() {
    this.isSupported = 'vibrate' in navigator;
  }

  private vibrate(pattern: number | number[]) {
    if (this.isSupported) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        console.log('Vibration not supported');
      }
    }
  }

  // Light tap - button press
  tap() {
    this.vibrate(10);
  }

  // Medium tap - confirmation
  medium() {
    this.vibrate(25);
  }

  // Strong tap - important action
  strong() {
    this.vibrate(50);
  }

  // Success pattern - double tap
  success() {
    this.vibrate([30, 50, 30]);
  }

  // Achievement unlocked - celebration pattern
  achievement() {
    this.vibrate([50, 100, 50, 100, 100]);
  }

  // Milestone reached - triumphant pattern
  milestone() {
    this.vibrate([100, 50, 100, 50, 200]);
  }

  // Warning/Alert pattern
  alert() {
    this.vibrate([100, 50, 100, 50, 100]);
  }

  // Error pattern
  error() {
    this.vibrate([200, 100, 200]);
  }

  // Breathing exercise pulse
  breathePulse() {
    this.vibrate(20);
  }

  // Timer tick
  tick() {
    this.vibrate(5);
  }

  // Countdown warning
  countdownWarning() {
    this.vibrate(30);
  }
}

export const haptics = new HapticsEngine();
