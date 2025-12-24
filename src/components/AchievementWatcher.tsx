import React, { useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useFeedback } from '@/hooks/useFeedback';
import { toast } from 'sonner';

// This component watches for new achievement unlocks and triggers feedback
const AchievementWatcher: React.FC = () => {
  const { achievements } = useApp();
  const { playAchievement } = useFeedback();
  const prevUnlockedCountRef = useRef<number>(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    
    // Skip on initial mount to avoid playing sound for already unlocked achievements
    if (!initializedRef.current) {
      initializedRef.current = true;
      prevUnlockedCountRef.current = unlockedCount;
      return;
    }
    
    // Check if a new achievement was unlocked
    if (unlockedCount > prevUnlockedCountRef.current) {
      const newlyUnlocked = achievements.find(
        (a, i) => a.unlocked && prevUnlockedCountRef.current < achievements.slice(0, i + 1).filter(x => x.unlocked).length
      );
      
      // Find the most recently unlocked achievement
      const recentlyUnlocked = achievements
        .filter(a => a.unlocked && a.unlockedAt)
        .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())[0];
      
      if (recentlyUnlocked) {
        // Play achievement sound and haptic
        playAchievement();
        
        // Show toast notification
        toast.success(`🎉 Achievement Unlocked!`, {
          description: `${recentlyUnlocked.icon} ${recentlyUnlocked.name}: ${recentlyUnlocked.description}`,
          duration: 5000,
        });
      }
      
      prevUnlockedCountRef.current = unlockedCount;
    }
  }, [achievements, playAchievement]);

  return null; // This is a "headless" component - no UI
};

export default AchievementWatcher;
