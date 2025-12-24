import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Globe, 
  Bell, 
  Moon, 
  Shield, 
  FileText, 
  RefreshCcw,
  ExternalLink,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { startDate, currentStreak, longestStreak, relapses, resetProgress } = useApp();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      toast.success('Progress reset');
    }
  };

  const settingsItems = [
    {
      icon: Globe,
      label: t('language'),
      value: language === 'en' ? 'English' : 'العربية',
      action: (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        >
          {language === 'en' ? 'العربية' : 'English'}
        </Button>
      ),
    },
    {
      icon: Bell,
      label: t('notifications'),
      value: '',
      action: <Switch />,
    },
    {
      icon: Moon,
      label: t('darkMode'),
      value: '',
      action: <Switch />,
    },
  ];

  const linkItems = [
    { icon: Shield, label: 'Privacy Policy' },
    { icon: FileText, label: 'Terms of Service' },
    { icon: Heart, label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-gradient-ocean pb-24">
      <div className="max-w-lg mx-auto px-4 pt-16 pb-8 space-y-6 page-enter">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-foreground">{t('profile')}</h1>
        </div>

        {/* User Stats Card */}
        <Card variant="gradient">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-primary-foreground/20">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-foreground">Recovery Warrior</h3>
                <p className="text-sm text-primary-foreground/80">
                  {startDate 
                    ? `Started ${format(new Date(startDate), 'MMM d, yyyy')}`
                    : 'Start your journey today'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary-foreground font-mono">
                  {currentStreak}
                </p>
                <p className="text-xs text-primary-foreground/70">Current</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-foreground font-mono">
                  {longestStreak}
                </p>
                <p className="text-xs text-primary-foreground/70">Best</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-foreground font-mono">
                  {relapses.length}
                </p>
                <p className="text-xs text-primary-foreground/70">Resets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card variant="default">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t('settings')}</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {settingsItems.map(({ icon: Icon, label, value, action }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    {value && <p className="text-sm text-muted-foreground">{value}</p>}
                  </div>
                </div>
                {action}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Links */}
        <Card variant="default">
          <CardContent className="divide-y divide-border py-2">
            {linkItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center justify-between w-full py-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{label}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Reset Progress */}
        <Card variant="emergency" className="border-destructive/20">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full text-destructive hover:bg-destructive/10"
              onClick={handleReset}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset All Progress
            </Button>
          </CardContent>
        </Card>

        {/* Medical Disclaimer */}
        <p className="text-xs text-center text-muted-foreground px-4">
          This app is for personal use only and is not a substitute for professional medical advice, 
          diagnosis, or treatment. If you're struggling, please consult a healthcare provider.
        </p>

        <p className="text-xs text-center text-muted-foreground">
          Reboot Journey v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Profile;
