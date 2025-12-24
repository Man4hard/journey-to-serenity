import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Sparkles } from 'lucide-react';

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
    <Card variant="glass" className="overflow-hidden relative group cursor-default">
      {/* Decorative gradient with animation */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full group-hover:w-40 group-hover:h-40 transition-all duration-500" />
      
      <CardContent className="p-6 relative">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-hero shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
            <Quote className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="space-y-3">
            <p className="text-foreground leading-relaxed font-medium text-lg group-hover:text-gradient transition-all duration-300">
              "{language === 'ar' ? todaysQuote.ar : todaysQuote.en}"
            </p>
            {todaysQuote.author && (
              <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                <Sparkles className="h-3 w-3 text-secondary group-hover:animate-pulse" />
                <p className="text-sm text-muted-foreground font-medium">
                  {todaysQuote.author}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
