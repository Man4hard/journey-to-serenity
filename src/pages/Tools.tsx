import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, Droplets, Music, Brain, BookOpen, Dumbbell } from 'lucide-react';
import BreathingExercise from '@/components/BreathingExercise';

const Tools: React.FC = () => {
  const { t } = useLanguage();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const tools = [
    {
      id: 'breathing',
      icon: Wind,
      label: t('breathingExercise'),
      description: '4-7-8 breathing technique to calm your mind',
      color: 'from-secondary to-secondary-light',
      bgColor: 'bg-secondary/10',
    },
    {
      id: 'coldshower',
      icon: Droplets,
      label: t('coldShower'),
      description: 'Reset with a cold shower challenge',
      color: 'from-blue-500 to-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'distraction',
      icon: Music,
      label: t('distraction'),
      description: 'Healthy activities to redirect focus',
      color: 'from-purple-500 to-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: 'meditation',
      icon: Brain,
      label: t('meditation'),
      description: 'Guided mindfulness sessions',
      color: 'from-amber-500 to-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      id: 'reading',
      icon: BookOpen,
      label: 'Reading List',
      description: 'Educational resources and articles',
      color: 'from-emerald-500 to-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      id: 'exercise',
      icon: Dumbbell,
      label: 'Physical Exercise',
      description: 'Quick workouts to release energy',
      color: 'from-rose-500 to-rose-400',
      bgColor: 'bg-rose-500/10',
    },
  ];

  if (activeExercise === 'breathing') {
    return <BreathingExercise onClose={() => setActiveExercise(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-ocean pb-24">
      <div className="max-w-lg mx-auto px-4 pt-16 pb-8 space-y-6 page-enter">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-foreground">{t('tools')}</h1>
          <p className="text-muted-foreground">Tools to help you stay strong</p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4">
          {tools.map(({ id, icon: Icon, label, description, color, bgColor }) => (
            <Card 
              key={id} 
              variant="elevated" 
              className="cursor-pointer card-interactive"
              onClick={() => setActiveExercise(id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${color}`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{label}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Reminder */}
        <Card variant="emergency">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-foreground">
              🆘 Use the <span className="font-semibold">Emergency Button</span> in the corner for instant help during urges
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tools;
