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
    { icon: Wind, label: t('breathingExercise'), action: () => setShowBreathing(true), gradient: 'from-secondary to-secondary-dark' },
    { icon: Droplets, label: t('coldShower'), action: () => {}, gradient: 'from-blue-500 to-blue-600' },
    { icon: Music, label: t('distraction'), action: () => {}, gradient: 'from-purple-500 to-purple-600' },
    { icon: Brain, label: t('meditation'), action: () => {}, gradient: 'from-amber-500 to-amber-600' },
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
          className="fixed bottom-28 right-4 z-40 shadow-2xl"
        >
          <AlertTriangle className="h-6 w-6" />
        </Button>
      )}

      {/* Emergency Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-lg animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="relative w-full max-w-lg glass-strong rounded-t-3xl p-6 animate-slide-up safe-area-pb border-t border-border/30">
            {/* Handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-muted-foreground/30" />
            
            <div className="flex items-center justify-between mb-6 mt-2">
              <div>
                <h2 className="text-xl font-bold text-gradient">{t('needHelp')}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose a tool to manage this moment
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {distractions.map(({ icon: Icon, label, action, gradient }) => (
                <button
                  key={label}
                  onClick={action}
                  className="group flex flex-col items-center gap-4 p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 card-interactive"
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20">
              <p className="text-sm text-center text-foreground font-medium">
                💪 You've got this. {t('keepGoing')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;
