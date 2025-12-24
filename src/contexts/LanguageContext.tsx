import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية' },
  progress: { en: 'Progress', ar: 'التقدم' },
  tools: { en: 'Tools', ar: 'الأدوات' },
  journal: { en: 'Journal', ar: 'اليوميات' },
  profile: { en: 'Profile', ar: 'الملف الشخصي' },
  
  // Home
  welcome: { en: 'Welcome back', ar: 'مرحباً بعودتك' },
  yourJourney: { en: 'Your Recovery Journey', ar: 'رحلة تعافيك' },
  days: { en: 'Days', ar: 'أيام' },
  day: { en: 'Day', ar: 'يوم' },
  streak: { en: 'Current Streak', ar: 'السلسلة الحالية' },
  longestStreak: { en: 'Longest Streak', ar: 'أطول سلسلة' },
  totalDays: { en: 'Total Days Clean', ar: 'إجمالي الأيام النظيفة' },
  keepGoing: { en: 'Keep going, you\'re doing great!', ar: 'استمر، أنت تبلي بلاءً حسناً!' },
  
  // Emergency
  emergency: { en: 'Emergency', ar: 'طوارئ' },
  needHelp: { en: 'Need Help Now?', ar: 'تحتاج مساعدة الآن؟' },
  emergencyButton: { en: 'I Need Help', ar: 'أحتاج مساعدة' },
  breathe: { en: 'Breathe', ar: 'تنفس' },
  breatheIn: { en: 'Breathe In', ar: 'شهيق' },
  hold: { en: 'Hold', ar: 'احبس' },
  breatheOut: { en: 'Breathe Out', ar: 'زفير' },
  
  // Tools
  breathingExercise: { en: 'Breathing Exercise', ar: 'تمرين التنفس' },
  coldShower: { en: 'Cold Shower', ar: 'دش بارد' },
  distraction: { en: 'Distraction', ar: 'تشتيت' },
  meditation: { en: 'Meditation', ar: 'تأمل' },
  
  // Check-in
  dailyCheckIn: { en: 'Daily Check-in', ar: 'تسجيل يومي' },
  howAreYou: { en: 'How are you feeling today?', ar: 'كيف تشعر اليوم؟' },
  mood: { en: 'Mood', ar: 'المزاج' },
  energy: { en: 'Energy', ar: 'الطاقة' },
  temptation: { en: 'Temptation Level', ar: 'مستوى الإغراء' },
  low: { en: 'Low', ar: 'منخفض' },
  medium: { en: 'Medium', ar: 'متوسط' },
  high: { en: 'High', ar: 'مرتفع' },
  submit: { en: 'Submit', ar: 'إرسال' },
  
  // Journal
  newEntry: { en: 'New Entry', ar: 'إدخال جديد' },
  writeThoughts: { en: 'Write your thoughts...', ar: 'اكتب أفكارك...' },
  save: { en: 'Save', ar: 'حفظ' },
  delete: { en: 'Delete', ar: 'حذف' },
  
  // Achievements
  achievements: { en: 'Achievements', ar: 'الإنجازات' },
  unlocked: { en: 'Unlocked', ar: 'مفتوح' },
  locked: { en: 'Locked', ar: 'مغلق' },
  firstDay: { en: 'First Day', ar: 'اليوم الأول' },
  oneWeek: { en: 'One Week Strong', ar: 'أسبوع قوي' },
  twoWeeks: { en: 'Two Weeks Warrior', ar: 'محارب أسبوعين' },
  oneMonth: { en: 'Monthly Champion', ar: 'بطل الشهر' },
  threeMonths: { en: '90 Day Master', ar: 'سيد التسعين يوماً' },
  
  // Relapse
  logRelapse: { en: 'Log Relapse', ar: 'تسجيل انتكاسة' },
  relapseMessage: { en: 'It\'s okay. Recovery isn\'t linear. What triggered this?', ar: 'لا بأس. التعافي ليس خطياً. ما الذي أثار هذا؟' },
  trigger: { en: 'Trigger', ar: 'المحفز' },
  stress: { en: 'Stress', ar: 'التوتر' },
  boredom: { en: 'Boredom', ar: 'الملل' },
  loneliness: { en: 'Loneliness', ar: 'الوحدة' },
  anxiety: { en: 'Anxiety', ar: 'القلق' },
  other: { en: 'Other', ar: 'أخرى' },
  resetStreak: { en: 'Reset & Continue', ar: 'إعادة والاستمرار' },
  
  // Settings
  settings: { en: 'Settings', ar: 'الإعدادات' },
  language: { en: 'Language', ar: 'اللغة' },
  notifications: { en: 'Notifications', ar: 'الإشعارات' },
  darkMode: { en: 'Dark Mode', ar: 'الوضع الداكن' },
  
  // Onboarding
  getStarted: { en: 'Get Started', ar: 'ابدأ الآن' },
  onboardingTitle1: { en: 'Take Control', ar: 'تحكم بحياتك' },
  onboardingDesc1: { en: 'Your journey to freedom starts here. We\'re with you every step of the way.', ar: 'رحلتك نحو الحرية تبدأ هنا. نحن معك في كل خطوة.' },
  onboardingTitle2: { en: 'Track Progress', ar: 'تتبع التقدم' },
  onboardingDesc2: { en: 'Celebrate every day of progress with visual streaks and achievements.', ar: 'احتفل بكل يوم من التقدم مع السلاسل المرئية والإنجازات.' },
  onboardingTitle3: { en: 'Find Support', ar: 'اعثر على الدعم' },
  onboardingDesc3: { en: 'Access tools for urge management and build healthier habits.', ar: 'الوصول إلى أدوات إدارة الرغبات وبناء عادات صحية.' },
  next: { en: 'Next', ar: 'التالي' },
  skip: { en: 'Skip', ar: 'تخطي' },
  
  // Motivation
  motivationalQuote: { en: 'Daily Motivation', ar: 'تحفيز يومي' },
  youGotThis: { en: 'You\'ve got this!', ar: 'يمكنك فعلها!' },
  everyDayMatters: { en: 'Every day matters', ar: 'كل يوم مهم' },
  
  // Stats
  statistics: { en: 'Statistics', ar: 'الإحصائيات' },
  thisWeek: { en: 'This Week', ar: 'هذا الأسبوع' },
  thisMonth: { en: 'This Month', ar: 'هذا الشهر' },
  allTime: { en: 'All Time', ar: 'كل الوقت' },
  successRate: { en: 'Success Rate', ar: 'معدل النجاح' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('reboot-language') as Language;
    return saved || 'ar'; // Default to Arabic
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('reboot-language', lang);
  };

  // Set initial direction on mount
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
