import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import StreakCounter from '@/components/StreakCounter';
import DailyCheckIn from '@/components/DailyCheckIn';
import MotivationalQuote from '@/components/MotivationalQuote';
import AchievementBadge from '@/components/AchievementBadge';
import RelapseModal from '@/components/RelapseModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { achievements } = useApp();
  const [showRelapseModal, setShowRelapseModal] = useState(false);

  const recentAchievements = achievements.filter(a => a.unlocked).slice(-3);
  const nextAchievement = achievements.find(a => !a.unlocked);

  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-background -z-20" />
      <div className="fixed inset-0 bg-mesh -z-10" />
      
      {/* Floating Orbs */}
      <div className="orb orb-primary w-72 h-72 -top-20 -left-20 animate-pulse" />
      <div className="orb orb-secondary w-96 h-96 top-1/3 -right-32 float" />
      <div className="orb orb-accent w-64 h-64 bottom-40 -left-16" />
      
      <div className="relative max-w-lg mx-auto px-4 pt-16 pb-8 space-y-6 page-enter">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle mb-4">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground font-medium">Your Recovery Journey</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient">{t('yourJourney')}</h1>
          <p className="text-muted-foreground mt-2">{t('keepGoing')}</p>
        </div>

        {/* Streak Counter */}
        <Card variant="elevated" className="overflow-hidden">
          <CardContent className="p-6">
            <StreakCounter />
          </CardContent>
        </Card>

        {/* Daily Check-in */}
        <DailyCheckIn />

        {/* Motivational Quote */}
        <MotivationalQuote />

        {/* Achievements Preview */}
        <Card variant="default">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-gradient">{t('achievements')}</span>
              </CardTitle>
              <Link to="/progress">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around">
              {recentAchievements.length > 0 ? (
                recentAchievements.map(achievement => (
                  <AchievementBadge
                    key={achievement.id}
                    icon={achievement.icon}
                    name={achievement.name}
                    description={achievement.description}
                    unlocked={achievement.unlocked}
                    requiredDays={achievement.requiredDays}
                    size="sm"
                  />
                ))
              ) : nextAchievement ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <AchievementBadge
                    icon={nextAchievement.icon}
                    name={nextAchievement.name}
                    description={nextAchievement.description}
                    unlocked={false}
                    requiredDays={nextAchievement.requiredDays}
                    size="lg"
                  />
                  <p className="text-sm text-muted-foreground">Your next milestone</p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Log Relapse Button */}
        <Button
          variant="outline"
          className="w-full border-dashed border-muted-foreground/30"
          onClick={() => setShowRelapseModal(true)}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {t('logRelapse')}
        </Button>
      </div>

      <RelapseModal
        isOpen={showRelapseModal}
        onClose={() => setShowRelapseModal(false)}
      />
    </div>
  );
};

export default Home;
