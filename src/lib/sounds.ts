// Sound effects using Web Audio API - no external dependencies needed
class SoundEngine {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Play a simple tone
  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  }

  // Play a sequence of tones
  private playSequence(notes: { freq: number; dur: number; delay: number }[], type: OscillatorType = 'sine') {
    notes.forEach(({ freq, dur, delay }) => {
      setTimeout(() => this.playTone(freq, dur, type), delay * 1000);
    });
  }

  // Achievement unlocked - celebratory ascending arpeggio
  playAchievement() {
    this.playSequence([
      { freq: 523.25, dur: 0.15, delay: 0 },     // C5
      { freq: 659.25, dur: 0.15, delay: 0.1 },   // E5
      { freq: 783.99, dur: 0.15, delay: 0.2 },   // G5
      { freq: 1046.50, dur: 0.4, delay: 0.3 },   // C6
    ], 'sine');
  }

  // Milestone reached - triumphant fanfare
  playMilestone() {
    this.playSequence([
      { freq: 392.00, dur: 0.2, delay: 0 },      // G4
      { freq: 523.25, dur: 0.2, delay: 0.15 },   // C5
      { freq: 659.25, dur: 0.2, delay: 0.3 },    // E5
      { freq: 783.99, dur: 0.5, delay: 0.45 },   // G5
    ], 'triangle');
  }

  // Check-in complete - soft confirmation
  playCheckIn() {
    this.playSequence([
      { freq: 440, dur: 0.1, delay: 0 },         // A4
      { freq: 554.37, dur: 0.15, delay: 0.08 },  // C#5
    ], 'sine');
  }

  // Button press - subtle click
  playClick() {
    this.playTone(800, 0.05, 'square', 0.1);
  }

  // Success sound - positive confirmation
  playSuccess() {
    this.playSequence([
      { freq: 523.25, dur: 0.1, delay: 0 },      // C5
      { freq: 659.25, dur: 0.2, delay: 0.1 },    // E5
    ], 'sine');
  }

  // Warning/Alert sound
  playAlert() {
    this.playSequence([
      { freq: 440, dur: 0.15, delay: 0 },
      { freq: 440, dur: 0.15, delay: 0.2 },
      { freq: 440, dur: 0.15, delay: 0.4 },
    ], 'square');
  }

  // Tick sound for timer
  playTick() {
    this.playTone(1200, 0.02, 'sine', 0.05);
  }

  // Countdown beep (last 3 seconds)
  playCountdownBeep() {
    this.playTone(880, 0.1, 'sine', 0.2);
  }

  // Final countdown tone
  playCountdownFinal() {
    this.playTone(1760, 0.3, 'sine', 0.3);
  }

  // Breathing exercise - inhale tone (ascending)
  playInhale() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
  }

  // Breathing exercise - exhale tone (descending)
  playExhale() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
  }
}

export const soundEngine = new SoundEngine();
