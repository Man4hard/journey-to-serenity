import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flame, Trophy, Calendar, Zap } from 'lucide-react';

const StreakCounter: React.FC = () => {
  const { currentStreak, longestStreak, totalCleanDays } = useApp();
  const { t } = useLanguage();

  // Calculate progress to next milestone
  const milestones = [7, 14, 30, 60, 90, 180, 365];
  const nextMilestone = milestones.find(m => m > currentStreak) || 365;
  const prevMilestone = [...milestones].reverse().find(m => m <= currentStreak) || 0;
  const progress = ((currentStreak - prevMilestone) / (nextMilestone - prevMilestone)) * 100;

  return (
    <div className="relative">
      {/* Main Streak Display */}
      <div className="relative flex flex-col items-center justify-center py-6">
        {/* Animated Glow Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl animate-pulse" />
        </div>
        
        {/* Streak Circle */}
        <div className="relative">
          <svg className="w-52 h-52 transform -rotate-90">
            {/* Track */}
            <circle
              cx="104"
              cy="104"
              r="94"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-muted/20"
            />
            {/* Progress */}
            <circle
              cx="104"
              cy="104"
              r="94"
              fill="none"
              stroke="url(#streakGradientNew)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={590}
              strokeDashoffset={590 - (590 * progress) / 100}
              className="progress-ring streak-glow"
            />
            <defs>
              <linearGradient id="streakGradientNew" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(260, 70%, 50%)" />
                <stop offset="50%" stopColor="hsl(180, 85%, 45%)" />
                <stop offset="100%" stopColor="hsl(260, 70%, 60%)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="p-3 rounded-full bg-gradient-hero mb-2 shadow-lg">
              <Flame className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-6xl font-bold text-gradient font-mono">
              {currentStreak}
            </span>
            <span className="text-sm text-muted-foreground font-medium mt-1">
              {currentStreak === 1 ? t('day') : t('days')} clean
            </span>
          </div>
        </div>

        {/* Next Milestone Badge */}
        <div className="mt-6 px-4 py-2 rounded-full glass-subtle inline-flex items-center gap-2">
          <Zap className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">
            <span className="text-secondary font-semibold">{nextMilestone - currentStreak}</span> {t('days')} to {nextMilestone}-day milestone
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-subtle">
          <div className="p-3 rounded-xl bg-warning/20">
            <Trophy className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">{t('longestStreak')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-subtle">
          <div className="p-3 rounded-xl bg-secondary/20">
            <Calendar className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">{totalCleanDays + currentStreak}</p>
            <p className="text-xs text-muted-foreground">{t('totalDays')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
