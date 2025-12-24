import React from 'react';
import { useApp } from '@/contexts/AppContext';
import Onboarding from '@/components/Onboarding';
import Home from './Home';
import LanguageToggle from '@/components/LanguageToggle';
import BottomNav from '@/components/BottomNav';
import EmergencyButton from '@/components/EmergencyButton';

const Index: React.FC = () => {
  const { hasOnboarded } = useApp();

  if (!hasOnboarded) {
    return <Onboarding />;
  }

  return (
    <>
      <LanguageToggle />
      <Home />
      <EmergencyButton />
      <BottomNav />
    </>
  );
};

export default Index;
