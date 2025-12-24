import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, TrendingUp, Heart, Sparkles } from 'lucide-react';
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
      gradient: 'from-primary via-primary-light to-secondary',
    },
    {
      icon: TrendingUp,
      title: t('onboardingTitle2'),
      description: t('onboardingDesc2'),
      gradient: 'from-secondary via-secondary-light to-primary',
    },
    {
      icon: Heart,
      title: t('onboardingTitle3'),
      description: t('onboardingDesc3'),
      gradient: 'from-accent via-accent-light to-primary',
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
    <div className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="orb orb-primary w-96 h-96 -top-32 -right-32" />
      <div className="orb orb-secondary w-72 h-72 bottom-1/4 -left-20" />
      <div className="orb orb-accent w-64 h-64 bottom-20 right-10" />
      
      <div className="relative z-10">
        <LanguageToggle />
      </div>
      
      {/* Progress dots */}
      <div className="relative z-10 flex items-center justify-center gap-3 pt-16 pb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === step 
                ? 'w-10 bg-gradient-hero' 
                : index < step 
                  ? 'w-2 bg-primary/60' 
                  : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center page-enter" key={step}>
        {/* Decorative Ring */}
        <div className="relative mb-8">
          <div className={`absolute inset-0 bg-gradient-to-br ${currentStep.gradient} rounded-[2rem] blur-2xl opacity-50 scale-110`} />
          <div className={`relative p-8 rounded-[2rem] bg-gradient-to-br ${currentStep.gradient} shadow-2xl`}>
            <Icon className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold text-gradient mb-4">
          {currentStep.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-sm leading-relaxed">
          {currentStep.description}
        </p>
        
        {/* Decorative sparkles */}
        <div className="flex items-center gap-2 mt-6">
          <Sparkles className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</span>
          <Sparkles className="h-4 w-4 text-secondary" />
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 p-6 safe-area-pb space-y-3">
        <Button
          variant="default"
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
            className="w-full text-muted-foreground"
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
