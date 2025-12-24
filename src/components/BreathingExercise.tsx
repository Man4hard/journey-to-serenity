import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

type Phase = 'breatheIn' | 'hold' | 'breatheOut' | 'idle';

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);

  const phaseDurations = {
    breatheIn: 4,
    hold: 7,
    breatheOut: 8,
    idle: 0,
  };

  const phaseLabels: Record<Phase, string> = {
    breatheIn: t('breatheIn'),
    hold: t('hold'),
    breatheOut: t('breatheOut'),
    idle: t('breathe'),
  };

  const startBreathing = useCallback(() => {
    setIsActive(true);
    setPhase('breatheIn');
    setSeconds(phaseDurations.breatheIn);
  }, []);

  const stopBreathing = useCallback(() => {
    setIsActive(false);
    setPhase('idle');
    setSeconds(0);
  }, []);

  const resetBreathing = useCallback(() => {
    stopBreathing();
    setCycles(0);
  }, [stopBreathing]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'breatheIn') {
            setPhase('hold');
            return phaseDurations.hold;
          } else if (phase === 'hold') {
            setPhase('breatheOut');
            return phaseDurations.breatheOut;
          } else if (phase === 'breatheOut') {
            setCycles((c) => c + 1);
            setPhase('breatheIn');
            return phaseDurations.breatheIn;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getCircleScale = () => {
    if (phase === 'breatheIn') return 'scale-125';
    if (phase === 'hold') return 'scale-125';
    if (phase === 'breatheOut') return 'scale-100';
    return 'scale-100';
  };

  const getPhaseColor = () => {
    if (phase === 'breatheIn') return 'from-secondary to-secondary-light';
    if (phase === 'hold') return 'from-primary to-primary-light';
    if (phase === 'breatheOut') return 'from-accent to-accent-light';
    return 'from-muted to-muted';
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">{t('breathingExercise')}</h2>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Breathing Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer glow */}
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-20 blur-2xl transition-all duration-1000 ${getCircleScale()}`}
          />
          
          {/* Main circle */}
          <div 
            className={`absolute inset-4 rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 ease-in-out ${getCircleScale()} shadow-glow`}
          />
          
          {/* Inner content */}
          <div className="relative z-10 flex flex-col items-center text-primary-foreground">
            <span className="text-5xl font-bold font-mono">{seconds}</span>
            <span className="text-lg font-medium mt-2 capitalize">
              {phaseLabels[phase]}
            </span>
          </div>
        </div>

        {/* Cycle Counter */}
        <div className="mt-8 text-center">
          <span className="text-4xl font-bold text-foreground">{cycles}</span>
          <p className="text-sm text-muted-foreground mt-1">Cycles Completed</p>
        </div>

        {/* 4-7-8 Indicator */}
        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span className={phase === 'breatheIn' ? 'text-secondary font-semibold' : ''}>
            4s In
          </span>
          <span className="text-muted">•</span>
          <span className={phase === 'hold' ? 'text-primary font-semibold' : ''}>
            7s Hold
          </span>
          <span className="text-muted">•</span>
          <span className={phase === 'breatheOut' ? 'text-accent font-semibold' : ''}>
            8s Out
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 safe-area-pb">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="calm"
            size="icon-lg"
            onClick={resetBreathing}
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
          
          <Button
            variant={isActive ? 'outline' : 'success'}
            size="xl"
            onClick={isActive ? stopBreathing : startBreathing}
            className="min-w-[140px]"
          >
            {isActive ? (
              <>
                <Pause className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
