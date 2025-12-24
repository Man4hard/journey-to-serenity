import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, TrendingUp, Heart } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Onboarding: React.FC = () => {
  const { t } = useLanguage();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: t('onboardingTitle1'),
      description: t('onboardingDesc1'),
      color: 'from-primary to-primary-light',
    },
    {
      icon: TrendingUp,
      title: t('onboardingTitle2'),
      description: t('onboardingDesc2'),
      color: 'from-secondary to-secondary-light',
    },
    {
      icon: Heart,
      title: t('onboardingTitle3'),
      description: t('onboardingDesc3'),
      color: 'from-accent to-accent-light',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <LanguageToggle />
      
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-16 pb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === step ? 'w-8 bg-secondary' : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in" key={step}>
        {/* Icon */}
        <div className={`p-8 rounded-3xl bg-gradient-to-br ${currentStep.color} shadow-glow mb-8`}>
          <Icon className="h-16 w-16 text-primary-foreground" />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {currentStep.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-sm leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Actions */}
      <div className="p-6 safe-area-pb space-y-3">
        <Button
          variant="success"
          size="xl"
          className="w-full"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? t('getStarted') : t('next')}
          <ChevronRight className="h-5 w-5" />
        </Button>
        
        {step < steps.length - 1 && (
          <Button
            variant="ghost"
            className="w-full"
            onClick={completeOnboarding}
          >
            {t('skip')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
