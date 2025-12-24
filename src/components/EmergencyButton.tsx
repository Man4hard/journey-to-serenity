import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X, Wind, Droplets, Music, Brain } from 'lucide-react';
import BreathingExercise from './BreathingExercise';

const EmergencyButton: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);

  const distractions = [
    { icon: Wind, label: t('breathingExercise'), action: () => setShowBreathing(true), color: 'bg-secondary/20 text-secondary' },
    { icon: Droplets, label: t('coldShower'), action: () => {}, color: 'bg-blue-500/20 text-blue-500' },
    { icon: Music, label: t('distraction'), action: () => {}, color: 'bg-purple-500/20 text-purple-500' },
    { icon: Brain, label: t('meditation'), action: () => {}, color: 'bg-amber-500/20 text-amber-500' },
  ];

  if (showBreathing) {
    return <BreathingExercise onClose={() => setShowBreathing(false)} />;
  }

  return (
    <>
      {/* Floating Emergency Button */}
      {!isOpen && (
        <Button
          variant="emergency"
          size="icon-lg"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-40"
        >
          <AlertTriangle className="h-6 w-6" />
        </Button>
      )}

      {/* Emergency Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card rounded-t-3xl p-6 animate-slide-up safe-area-pb">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">{t('needHelp')}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a tool to help manage this moment
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {distractions.map(({ icon: Icon, label, action, color }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-all duration-300 card-interactive"
                >
                  <div className={`p-4 rounded-xl ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
              <p className="text-sm text-center text-foreground">
                💪 {t('keepGoing')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;
