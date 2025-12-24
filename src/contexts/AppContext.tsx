import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: number;
}

interface CheckIn {
  date: string;
  mood: number;
  energy: number;
  temptation: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredDays: number;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AppState {
  currentStreak: number;
  longestStreak: number;
  totalCleanDays: number;
  startDate: string | null;
  lastCheckIn: string | null;
  journalEntries: JournalEntry[];
  checkIns: CheckIn[];
  achievements: Achievement[];
  hasOnboarded: boolean;
  relapses: { date: string; trigger: string }[];
}

interface AppContextType extends AppState {
  startJourney: () => void;
  logRelapse: (trigger: string) => void;
  addJournalEntry: (content: string, mood: number) => void;
  deleteJournalEntry: (id: string) => void;
  submitCheckIn: (mood: number, energy: number, temptation: number) => void;
  completeOnboarding: () => void;
  resetProgress: () => void;
}

const defaultAchievements: Achievement[] = [
  { id: '1', name: 'First Step', description: 'Complete your first day', icon: '🌱', requiredDays: 1, unlocked: false },
  { id: '2', name: 'One Week Strong', description: 'Reach 7 days streak', icon: '💪', requiredDays: 7, unlocked: false },
  { id: '3', name: 'Two Week Warrior', description: 'Reach 14 days streak', icon: '⚔️', requiredDays: 14, unlocked: false },
  { id: '4', name: 'Monthly Champion', description: 'Reach 30 days streak', icon: '🏆', requiredDays: 30, unlocked: false },
  { id: '5', name: '90 Day Master', description: 'Reach 90 days streak', icon: '👑', requiredDays: 90, unlocked: false },
  { id: '6', name: 'Half Year Hero', description: 'Reach 180 days streak', icon: '🦸', requiredDays: 180, unlocked: false },
  { id: '7', name: 'One Year Legend', description: 'Reach 365 days streak', icon: '🌟', requiredDays: 365, unlocked: false },
];

const initialState: AppState = {
  currentStreak: 0,
  longestStreak: 0,
  totalCleanDays: 0,
  startDate: null,
  lastCheckIn: null,
  journalEntries: [],
  checkIns: [],
  achievements: defaultAchievements,
  hasOnboarded: false,
  relapses: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('reboot-journey-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Recalculate streak based on saved start date
      if (parsed.startDate) {
        const start = new Date(parsed.startDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - start.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        parsed.currentStreak = diffDays;
        if (diffDays > parsed.longestStreak) {
          parsed.longestStreak = diffDays;
        }
      }
      return { ...initialState, ...parsed };
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('reboot-journey-state', JSON.stringify(state));
  }, [state]);

  // Check and update achievements
  useEffect(() => {
    const updatedAchievements = state.achievements.map(achievement => {
      if (!achievement.unlocked && state.currentStreak >= achievement.requiredDays) {
        return { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      return achievement;
    });

    const hasNewAchievement = updatedAchievements.some(
      (a, i) => a.unlocked !== state.achievements[i].unlocked
    );

    if (hasNewAchievement) {
      setState(prev => ({ ...prev, achievements: updatedAchievements }));
    }
  }, [state.currentStreak]);

  const startJourney = () => {
    setState(prev => ({
      ...prev,
      startDate: new Date().toISOString(),
      currentStreak: 0,
    }));
  };

  const logRelapse = (trigger: string) => {
    setState(prev => ({
      ...prev,
      startDate: new Date().toISOString(),
      currentStreak: 0,
      totalCleanDays: prev.totalCleanDays + prev.currentStreak,
      relapses: [...prev.relapses, { date: new Date().toISOString(), trigger }],
    }));
  };

  const addJournalEntry = (content: string, mood: number) => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      mood,
    };
    setState(prev => ({
      ...prev,
      journalEntries: [entry, ...prev.journalEntries],
    }));
  };

  const deleteJournalEntry = (id: string) => {
    setState(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.filter(e => e.id !== id),
    }));
  };

  const submitCheckIn = (mood: number, energy: number, temptation: number) => {
    const checkIn: CheckIn = {
      date: new Date().toISOString(),
      mood,
      energy,
      temptation,
    };
    setState(prev => ({
      ...prev,
      checkIns: [checkIn, ...prev.checkIns],
      lastCheckIn: checkIn.date,
    }));
  };

  const completeOnboarding = () => {
    setState(prev => ({
      ...prev,
      hasOnboarded: true,
      startDate: new Date().toISOString(),
    }));
  };

  const resetProgress = () => {
    setState(initialState);
    localStorage.removeItem('reboot-journey-state');
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        startJourney,
        logRelapse,
        addJournalEntry,
        deleteJournalEntry,
        submitCheckIn,
        completeOnboarding,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
