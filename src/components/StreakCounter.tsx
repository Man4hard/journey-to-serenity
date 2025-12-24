import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flame, Trophy, Calendar } from 'lucide-react';

const StreakCounter: React.FC = () => {
  const { currentStreak, longestStreak, totalCleanDays } = useApp();
  const { t } = useLanguage();

  // Calculate progress to next milestone
  const milestones = [7, 14, 30, 60, 90, 180, 365];
  const nextMilestone = milestones.find(m => m > currentStreak) || 365;
  const prevMilestone = milestones.reverse().find(m => m <= currentStreak) || 0;
  const progress = ((currentStreak - prevMilestone) / (nextMilestone - prevMilestone)) * 100;

  return (
    <div className="relative">
      {/* Main Streak Display */}
      <div className="relative flex flex-col items-center justify-center p-8">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-full blur-2xl" />
        
        {/* Streak Circle */}
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="url(#streakGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * progress) / 100}
              className="progress-ring"
            />
            <defs>
              <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(168, 100%, 36%)" />
                <stop offset="100%" stopColor="hsl(168, 80%, 55%)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Flame className="h-8 w-8 text-secondary mb-1 float" />
            <span className="text-5xl font-bold text-foreground font-mono animate-count-up">
              {currentStreak}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              {currentStreak === 1 ? t('day') : t('days')}
            </span>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            {nextMilestone - currentStreak} {t('days')} to {nextMilestone} day milestone
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <div className="p-2 rounded-lg bg-warning/20">
            <Trophy className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">{t('longestStreak')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <div className="p-2 rounded-lg bg-secondary/20">
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
