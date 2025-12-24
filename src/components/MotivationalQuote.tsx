import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const quotes = [
  {
    en: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
    ar: "سر التغيير هو تركيز كل طاقتك ليس على محاربة القديم، بل على بناء الجديد.",
    author: "Socrates"
  },
  {
    en: "Every moment is a fresh beginning.",
    ar: "كل لحظة هي بداية جديدة.",
    author: "T.S. Eliot"
  },
  {
    en: "You are stronger than you think.",
    ar: "أنت أقوى مما تعتقد.",
    author: ""
  },
  {
    en: "Progress, not perfection.",
    ar: "التقدم، وليس الكمال.",
    author: ""
  },
  {
    en: "The comeback is always stronger than the setback.",
    ar: "العودة دائماً أقوى من النكسة.",
    author: ""
  },
  {
    en: "One day at a time.",
    ar: "يوماً بيوم.",
    author: ""
  },
  {
    en: "Fall seven times, stand up eight.",
    ar: "اسقط سبع مرات، وقم ثماني.",
    author: "Japanese Proverb"
  },
  {
    en: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    ar: "ظروفك الحالية لا تحدد إلى أين يمكنك الذهاب؛ إنها تحدد فقط من أين تبدأ.",
    author: "Nido Qubein"
  },
];

const MotivationalQuote: React.FC = () => {
  const { language, t } = useLanguage();

  const todaysQuote = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return quotes[dayOfYear % quotes.length];
  }, []);

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Quote className="h-6 w-6 text-secondary shrink-0 mt-1" />
          <div className="space-y-2">
            <p className="text-foreground leading-relaxed italic">
              "{language === 'ar' ? todaysQuote.ar : todaysQuote.en}"
            </p>
            {todaysQuote.author && (
              <p className="text-sm text-muted-foreground">
                — {todaysQuote.author}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
