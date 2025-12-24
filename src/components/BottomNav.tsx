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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/20 safe-area-pb">
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-2xl transition-all duration-300 min-w-[64px]",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active Background */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl" />
              )}
              
              <Icon className={cn(
                "h-5 w-5 transition-all duration-300 relative z-10",
                isActive && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium relative z-10",
                isActive && "font-semibold"
              )}>
                {label}
              </span>
              
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -bottom-1 w-8 h-1 rounded-full bg-gradient-hero" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
