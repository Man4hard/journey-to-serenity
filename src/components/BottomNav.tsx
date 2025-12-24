import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Wrench, BookOpen, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/progress', icon: BarChart2, label: t('progress') },
    { path: '/tools', icon: Wrench, label: t('tools') },
    { path: '/journal', icon: BookOpen, label: t('journal') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px]",
                isActive 
                  ? "text-secondary bg-secondary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
              <span className="text-xs font-medium">{label}</span>
              {isActive && (
                <span className="absolute -bottom-0 w-1 h-1 rounded-full bg-secondary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
