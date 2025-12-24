import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AchievementBadge from '@/components/AchievementBadge';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

const Progress: React.FC = () => {
  const { t } = useLanguage();
  const { currentStreak, longestStreak, totalCleanDays, achievements, checkIns } = useApp();

  // Calculate success rate from check-ins
  const recentCheckIns = checkIns.slice(0, 30);
  const avgMood = recentCheckIns.length > 0
    ? (recentCheckIns.reduce((sum, c) => sum + c.mood, 0) / recentCheckIns.length).toFixed(1)
    : '—';
  const avgEnergy = recentCheckIns.length > 0
    ? (recentCheckIns.reduce((sum, c) => sum + c.energy, 0) / recentCheckIns.length).toFixed(1)
    : '—';

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  const stats = [
    { 
      icon: TrendingUp, 
      label: t('streak'), 
      value: currentStreak, 
      suffix: t('days'),
      color: 'bg-secondary/20 text-secondary' 
    },
    { 
      icon: Award, 
      label: t('longestStreak'), 
      value: longestStreak, 
      suffix: t('days'),
      color: 'bg-warning/20 text-warning' 
    },
    { 
      icon: Calendar, 
      label: t('totalDays'), 
      value: totalCleanDays + currentStreak, 
      suffix: '',
      color: 'bg-primary/20 text-primary' 
    },
    { 
      icon: Target, 
      label: t('successRate'), 
      value: progressPercent, 
      suffix: '%',
      color: 'bg-accent/20 text-accent' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-ocean pb-24">
      <div className="max-w-lg mx-auto px-4 pt-16 pb-8 space-y-6 page-enter">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-foreground">{t('statistics')}</h1>
          <p className="text-muted-foreground">{t('progress')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ icon: Icon, label, value, suffix, color }) => (
            <Card key={label} variant="elevated" className="card-interactive">
              <CardContent className="p-4">
                <div className={`inline-flex p-2 rounded-lg ${color} mb-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-3xl font-bold font-mono text-foreground">
                    {value}<span className="text-lg">{suffix}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mood & Energy Overview */}
        {recentCheckIns.length > 0 && (
          <Card variant="default">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('recentCheckIns')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-3xl font-bold text-foreground">{avgMood}</p>
                  <p className="text-sm text-muted-foreground">{t('mood')} {t('avg')}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-3xl font-bold text-foreground">{avgEnergy}</p>
                  <p className="text-sm text-muted-foreground">{t('energy')} {t('avg')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card variant="default">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t('achievements')}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {unlockedCount}/{achievements.length}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <AchievementBadge
                  key={achievement.id}
                  icon={achievement.icon}
                  name={achievement.name}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                  requiredDays={achievement.requiredDays}
                  size="md"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
