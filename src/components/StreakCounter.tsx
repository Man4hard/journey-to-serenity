import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, TreePine } from 'lucide-react';
import { useFeedback } from '@/hooks/useFeedback';

interface StreakCounterProps {
  onPanicClick?: () => void;
  onRelapseClick?: () => void;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ onPanicClick, onRelapseClick }) => {
  const { startDate, relapses } = useApp();
  const { t } = useLanguage();
  const { playMilestone, playCountdownBeep, playClick } = useFeedback();
  
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  const lastMilestoneRef = useRef<number>(0);
  const lastRemainingRef = useRef<number>(999);

  // Real-time timer with milestone detection
  useEffect(() => {
    const calculateTime = () => {
      const start = startDate ? new Date(startDate) : new Date();
      const now = new Date();
      const diffMs = now.getTime() - start.getTime();
      
      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeElapsed({ days, hours, minutes, seconds, totalSeconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  // Calculate progress to next milestone
  const getNextMilestone = () => {
    const { totalSeconds } = timeElapsed;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalDays = Math.floor(totalSeconds / 86400);

    if (totalMinutes < 10) return { target: 10, unit: 'm', current: totalMinutes, targetSeconds: 10 * 60 };
    if (totalMinutes < 30) return { target: 30, unit: 'm', current: totalMinutes, targetSeconds: 30 * 60 };
    if (totalHours < 1) return { target: 60, unit: 'm', current: totalMinutes, targetSeconds: 60 * 60 };
    if (totalHours < 6) return { target: 6, unit: 'h', current: totalHours, targetSeconds: 6 * 3600 };
    if (totalHours < 12) return { target: 12, unit: 'h', current: totalHours, targetSeconds: 12 * 3600 };
    if (totalHours < 24) return { target: 24, unit: 'h', current: totalHours, targetSeconds: 24 * 3600 };
    if (totalDays < 3) return { target: 3, unit: 'd', current: totalDays, targetSeconds: 3 * 86400 };
    if (totalDays < 7) return { target: 7, unit: 'd', current: totalDays, targetSeconds: 7 * 86400 };
    if (totalDays < 14) return { target: 14, unit: 'd', current: totalDays, targetSeconds: 14 * 86400 };
    if (totalDays < 30) return { target: 30, unit: 'd', current: totalDays, targetSeconds: 30 * 86400 };
    if (totalDays < 60) return { target: 60, unit: 'd', current: totalDays, targetSeconds: 60 * 86400 };
    if (totalDays < 90) return { target: 90, unit: 'd', current: totalDays, targetSeconds: 90 * 86400 };
    if (totalDays < 180) return { target: 180, unit: 'd', current: totalDays, targetSeconds: 180 * 86400 };
    if (totalDays < 365) return { target: 365, unit: 'd', current: totalDays, targetSeconds: 365 * 86400 };
    return { target: 365, unit: 'd', current: totalDays, targetSeconds: 365 * 86400 };
  };

  const milestone = getNextMilestone();
  const progress = Math.min(100, (timeElapsed.totalSeconds / milestone.targetSeconds) * 100);
  
  // Calculate remaining time
  const getRemainingTime = () => {
    const remaining = Math.max(0, milestone.targetSeconds - timeElapsed.totalSeconds);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return { mins, secs };
  };

  const remaining = getRemainingTime();
  const relapseCount = relapses?.length || 0;

  // Play sounds for milestones and countdown
  useEffect(() => {
    // Check for milestone reached
    if (milestone.targetSeconds !== lastMilestoneRef.current && 
        timeElapsed.totalSeconds >= milestone.targetSeconds) {
      playMilestone();
      lastMilestoneRef.current = milestone.targetSeconds;
    }
    
    // Countdown beeps for last 3 seconds before milestone
    if (remaining.mins === 0 && remaining.secs <= 3 && remaining.secs > 0) {
      if (remaining.secs !== lastRemainingRef.current) {
        playCountdownBeep();
        lastRemainingRef.current = remaining.secs;
      }
    }
  }, [timeElapsed.totalSeconds, milestone.targetSeconds, remaining, playMilestone, playCountdownBeep]);

  // Circle calculations
  const size = 260;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handlePanicClick = () => {
    playClick();
    onPanicClick?.();
  };

  const handleRelapseClick = () => {
    playClick();
    onRelapseClick?.();
  };

  const getOrdinalSuffix = (n: number) => {
    if (language === 'ar') return '';
    if (n === 1) return 'st';
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
  };

  const { language } = useLanguage();

  return (
    <div className="relative">
      {/* Panic Button - Top Right */}
      <button
        onClick={handlePanicClick}
        className="absolute -top-2 -right-2 flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-destructive/10 transition-all duration-300 group z-10"
      >
        <div className="p-2 rounded-xl bg-destructive/20 group-hover:bg-destructive/30 group-hover:scale-110 transition-all duration-300">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <span className="text-[10px] text-muted-foreground group-hover:text-destructive transition-colors">{t('panicButton')}</span>
      </button>

      {/* Main Circle */}
      <div className="flex flex-col items-center">
        {/* STREAK Title */}
        <div className="mb-3">
          <h2 className="text-base font-bold tracking-[0.3em] text-foreground text-center">{t('streakTitle')}</h2>
          <div className="h-0.5 w-14 mx-auto bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full mt-1" />
        </div>

        {/* Circular Progress */}
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-muted/10"
            />
            {/* Gradient Progress */}
            <defs>
              <linearGradient id="streakGradientArc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#streakGradientArc)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))'
              }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Days */}
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold font-mono text-foreground">{timeElapsed.days}</span>
              <span className="text-base text-muted-foreground">{t('days')}</span>
            </div>
            
            {/* Hours & Minutes */}
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-3xl font-bold font-mono text-foreground">{timeElapsed.hours}</span>
              <span className="text-xs text-muted-foreground">{t('hours')}</span>
              <span className="text-3xl font-bold font-mono text-foreground ml-1">{timeElapsed.minutes}</span>
              <span className="text-xs text-muted-foreground">{t('mins')}</span>
            </div>
            
            {/* Seconds */}
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-2xl font-bold font-mono text-foreground">{timeElapsed.seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs text-muted-foreground">{t('secs')}</span>
            </div>
            
            {/* Of Sobriety */}
            <p className="text-[10px] tracking-[0.15em] text-pink-400 mt-1.5 font-medium uppercase">{t('ofSobriety')}</p>
          </div>
        </div>

        {/* Remaining Time */}
        <div className="mt-4 text-center">
          <p className="text-base font-semibold text-foreground">
            {t('only')} <span className="text-pink-400">{remaining.mins}m {remaining.secs}s</span> {t('remaining')}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{t('toMilestone')} {milestone.target}{milestone.unit}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

        {/* Bottom Section */}
        <div className="flex items-center justify-between w-full px-2">
          {/* Relapse Button */}
          <button
            onClick={handleRelapseClick}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-muted/20 transition-all duration-300 group"
          >
            <TreePine className="h-7 w-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{t('clickForRelapse')}</span>
          </button>

          {/* Attempt Counter */}
          <div className="text-right">
            <p className="text-xs font-bold text-muted-foreground tracking-wider">{t('attempt')}</p>
            <div className="flex items-baseline justify-end">
              <span className="text-4xl font-bold text-pink-400">{relapseCount + 1}</span>
              <span className="text-xs text-muted-foreground ml-0.5">
                {getOrdinalSuffix(relapseCount + 1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
