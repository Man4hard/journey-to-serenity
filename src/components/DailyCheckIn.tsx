import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Check, Smile, Frown, Meh, Zap, AlertCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useFeedback } from '@/hooks/useFeedback';

const DailyCheckIn: React.FC = () => {
  const { t } = useLanguage();
  const { submitCheckIn, lastCheckIn } = useApp();
  const { playCheckIn, playSuccess } = useFeedback();
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [temptation, setTemptation] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toDateString();
  const hasCheckedInToday = lastCheckIn && new Date(lastCheckIn).toDateString() === today;

  const getMoodIcon = () => {
    if (mood >= 7) return <Smile className="h-7 w-7 text-success" />;
    if (mood >= 4) return <Meh className="h-7 w-7 text-warning" />;
    return <Frown className="h-7 w-7 text-destructive" />;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    submitCheckIn(mood, energy, temptation);
    playCheckIn();
    toast.success('Check-in saved!', {
      description: 'Keep up the great work today.',
    });
    setTimeout(() => {
      setIsSubmitting(false);
      playSuccess();
    }, 500);
  };

  if (hasCheckedInToday) {
    return (
      <Card variant="success" className="animate-fade-in overflow-hidden">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="p-3 rounded-full bg-secondary-foreground/20">
            <Check className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-secondary-foreground text-lg">
              {t('dailyCheckIn')} Complete!
            </h3>
            <p className="text-sm text-secondary-foreground/80">
              Great job checking in today
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-secondary-foreground/60 ml-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="animate-fade-in overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-gradient">{t('dailyCheckIn')}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t('howAreYou')}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted/50">
                {getMoodIcon()}
              </div>
              {t('mood')}
            </label>
            <span className="text-sm font-mono text-muted-foreground px-3 py-1 rounded-lg bg-muted/50">{mood}/10</span>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Zap className="h-5 w-5 text-warning" />
              </div>
              {t('energy')}
            </label>
            <span className="text-sm font-mono text-muted-foreground px-3 py-1 rounded-lg bg-muted/50">{energy}/10</span>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
              {t('temptation')}
            </label>
            <span className="text-sm font-mono text-muted-foreground px-3 py-1 rounded-lg bg-muted/50">
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
