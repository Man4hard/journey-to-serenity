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
import { RotateCcw, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { achievements } = useApp();
  const [showRelapseModal, setShowRelapseModal] = useState(false);

  const recentAchievements = achievements.filter(a => a.unlocked).slice(-3);
  const nextAchievement = achievements.find(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gradient-ocean pb-24">
      <div className="max-w-lg mx-auto px-4 pt-16 pb-8 space-y-6 page-enter">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-foreground">{t('yourJourney')}</h1>
          <p className="text-muted-foreground">{t('keepGoing')}</p>
        </div>

        {/* Streak Counter */}
        <Card variant="elevated" className="overflow-hidden">
          <CardContent className="p-4">
            <StreakCounter />
          </CardContent>
        </Card>

        {/* Daily Check-in */}
        <DailyCheckIn />

        {/* Motivational Quote */}
        <MotivationalQuote />

        {/* Achievements Preview */}
        <Card variant="default">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t('achievements')}</CardTitle>
              <Link to="/progress">
                <Button variant="ghost" size="sm" className="text-secondary">
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
                <div className="flex flex-col items-center gap-2 py-4">
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
          className="w-full border-dashed"
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
