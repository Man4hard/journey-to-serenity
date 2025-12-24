import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Check, Smile, Frown, Meh, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const DailyCheckIn: React.FC = () => {
  const { t } = useLanguage();
  const { submitCheckIn, lastCheckIn } = useApp();
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [temptation, setTemptation] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toDateString();
  const hasCheckedInToday = lastCheckIn && new Date(lastCheckIn).toDateString() === today;

  const getMoodIcon = () => {
    if (mood >= 7) return <Smile className="h-8 w-8 text-success" />;
    if (mood >= 4) return <Meh className="h-8 w-8 text-warning" />;
    return <Frown className="h-8 w-8 text-destructive" />;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    submitCheckIn(mood, energy, temptation);
    toast.success('Check-in saved!', {
      description: 'Keep up the great work today.',
    });
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  if (hasCheckedInToday) {
    return (
      <Card variant="success" className="animate-fade-in">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="p-3 rounded-full bg-secondary-foreground/10">
            <Check className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-secondary-foreground">
              {t('dailyCheckIn')} Complete!
            </h3>
            <p className="text-sm text-secondary-foreground/80">
              Great job checking in today
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t('dailyCheckIn')}</CardTitle>
        <p className="text-sm text-muted-foreground">{t('howAreYou')}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              {getMoodIcon()}
              {t('mood')}
            </label>
            <span className="text-sm font-mono text-muted-foreground">{mood}/10</span>
          </div>
          <Slider
            value={[mood]}
            onValueChange={(value) => setMood(value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Energy Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              {t('energy')}
            </label>
            <span className="text-sm font-mono text-muted-foreground">{energy}/10</span>
          </div>
          <Slider
            value={[energy]}
            onValueChange={(value) => setEnergy(value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Temptation Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              {t('temptation')}
            </label>
            <span className="text-sm font-mono text-muted-foreground">
              {temptation <= 3 ? t('low') : temptation <= 6 ? t('medium') : t('high')}
            </span>
          </div>
          <Slider
            value={[temptation]}
            onValueChange={(value) => setTemptation(value[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        <Button 
          variant="success" 
          className="w-full" 
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Check className="h-5 w-5 mr-2" />
          {t('submit')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyCheckIn;
