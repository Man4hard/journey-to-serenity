import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const KegalExerciseCard: React.FC = () => {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'squeeze' | 'hold' | 'release' | 'rest'>('squeeze');
  const [timeLeft, setTimeLeft] = useState(5);
  const [reps, setReps] = useState(0);
  const [totalReps] = useState(10);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phases = {
    squeeze: { duration: 5, next: 'hold' as const, label: 'Squeeze', color: 'from-primary to-primary-light' },
    hold: { duration: 5, next: 'release' as const, label: 'Hold', color: 'from-secondary to-secondary-light' },
    release: { duration: 3, next: 'rest' as const, label: 'Release', color: 'from-accent to-accent-light' },
    rest: { duration: 3, next: 'squeeze' as const, label: 'Rest', color: 'from-muted to-muted' },
  };

  useEffect(() => {
    if (isActive && !isComplete) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            const currentPhase = phases[phase];
            if (phase === 'rest') {
              if (reps + 1 >= totalReps) {
                setIsComplete(true);
                setIsActive(false);
                return 0;
              }
              setReps(r => r + 1);
            }
            setPhase(currentPhase.next);
            return phases[currentPhase.next].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, phase, reps, isComplete]);

  const handleStart = () => {
    if (isComplete) {
      handleReset();
    }
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('squeeze');
    setTimeLeft(5);
    setReps(0);
    setIsComplete(false);
  };

  const progress = ((totalReps - reps) / totalReps) * 100;
  const currentPhaseData = phases[phase];

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Kegel Exercise</h3>
              <p className="text-xs text-muted-foreground">Strengthen pelvic floor</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full glass-subtle text-xs font-semibold">
            EXERCISE
          </div>
        </div>

        {isComplete ? (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-success/20">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-success">Great Job!</h4>
              <p className="text-muted-foreground text-sm">You completed {totalReps} reps</p>
            </div>
            <Button variant="outline" onClick={handleReset} className="mt-4">
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Again
            </Button>
          </div>
        ) : (
          <>
            {/* Progress Ring */}
            <div className="flex justify-center my-4">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted/20"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#kegalGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={352}
                    strokeDashoffset={352 - (352 * (timeLeft / phases[phase].duration))}
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="kegalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(260, 70%, 50%)" />
                      <stop offset="100%" stopColor="hsl(180, 85%, 45%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-mono text-foreground">{timeLeft}</span>
                  <span className={`text-sm font-semibold bg-gradient-to-r ${currentPhaseData.color} bg-clip-text text-transparent`}>
                    {currentPhaseData.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Reps Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">{reps}/{totalReps} reps</span>
              </div>
              <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-hero transition-all duration-300"
                  style={{ width: `${(reps / totalReps) * 100}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              {!isActive ? (
                <Button variant="success" className="flex-1" onClick={handleStart}>
                  <Play className="h-4 w-4 mr-2 fill-current" />
                  {reps > 0 ? 'Resume' : 'Start'}
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" onClick={handlePause}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default KegalExerciseCard;
