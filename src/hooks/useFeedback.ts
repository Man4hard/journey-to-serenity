import { useCallback } from 'react';
import { soundEngine } from '@/lib/sounds';
import { haptics } from '@/lib/haptics';

export const useFeedback = () => {
  const playAchievement = useCallback(() => {
    soundEngine.playAchievement();
    haptics.achievement();
  }, []);

  const playMilestone = useCallback(() => {
    soundEngine.playMilestone();
    haptics.milestone();
  }, []);

  const playCheckIn = useCallback(() => {
    soundEngine.playCheckIn();
    haptics.success();
  }, []);

  const playClick = useCallback(() => {
    soundEngine.playClick();
    haptics.tap();
  }, []);

  const playSuccess = useCallback(() => {
    soundEngine.playSuccess();
    haptics.success();
  }, []);

  const playAlert = useCallback(() => {
    soundEngine.playAlert();
    haptics.alert();
  }, []);

  const playTick = useCallback(() => {
    soundEngine.playTick();
    haptics.tick();
  }, []);

  const playCountdownBeep = useCallback(() => {
    soundEngine.playCountdownBeep();
    haptics.countdownWarning();
  }, []);

  const playCountdownFinal = useCallback(() => {
    soundEngine.playCountdownFinal();
    haptics.milestone();
  }, []);

  const playInhale = useCallback(() => {
    soundEngine.playInhale();
    haptics.breathePulse();
  }, []);

  const playExhale = useCallback(() => {
    soundEngine.playExhale();
    haptics.breathePulse();
  }, []);

  return {
    playAchievement,
    playMilestone,
    playCheckIn,
    playClick,
    playSuccess,
    playAlert,
    playTick,
    playCountdownBeep,
    playCountdownFinal,
    playInhale,
    playExhale,
  };
};
