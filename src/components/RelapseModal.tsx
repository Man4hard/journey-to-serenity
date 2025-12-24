import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface RelapseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RelapseModal: React.FC<RelapseModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { logRelapse } = useApp();
  const [selectedTrigger, setSelectedTrigger] = useState<string>('');

  const triggers = [
    { id: 'stress', label: t('stress'), emoji: '😰' },
    { id: 'boredom', label: t('boredom'), emoji: '😑' },
    { id: 'loneliness', label: t('loneliness'), emoji: '😔' },
    { id: 'anxiety', label: t('anxiety'), emoji: '😟' },
    { id: 'other', label: t('other'), emoji: '❓' },
  ];

  const handleSubmit = () => {
    if (!selectedTrigger) {
      toast.error('Please select a trigger');
      return;
    }
    
    logRelapse(selectedTrigger);
    toast('Counter reset', {
      description: "Remember: Every new beginning is a chance to grow stronger.",
      icon: <Heart className="h-5 w-5 text-accent" />,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <Card variant="elevated" className="w-full max-w-md animate-scale-in">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex flex-col items-center text-center pt-4">
            <div className="p-4 rounded-full bg-accent/20 mb-4">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-xl">{t('logRelapse')}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              {t('relapseMessage')}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {triggers.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => setSelectedTrigger(id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedTrigger === id
                    ? 'border-accent bg-accent/10'
                    : 'border-transparent bg-muted/50 hover:bg-muted'
                }`}
              >
                <span className="text-2xl block mb-1">{emoji}</span>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="default"
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              disabled={!selectedTrigger}
            >
              {t('resetStreak')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelapseModal;
