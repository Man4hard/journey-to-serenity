import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="glass"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
};

export default LanguageToggle;
