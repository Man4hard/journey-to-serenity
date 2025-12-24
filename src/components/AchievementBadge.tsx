import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  requiredDays: number;
  size?: 'sm' | 'md' | 'lg';
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  name,
  description,
  unlocked,
  requiredDays,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const iconSizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative rounded-2xl flex items-center justify-center transition-all duration-500",
          sizeClasses[size],
          unlocked
            ? "bg-gradient-success shadow-glow badge-unlock"
            : "bg-muted/50 border-2 border-dashed border-border"
        )}
      >
        {unlocked ? (
          <span className={cn("", iconSizeClasses[size])}>{icon}</span>
        ) : (
          <Lock className="h-6 w-6 text-muted-foreground/50" />
        )}
        
        {/* Day badge */}
        <div className={cn(
          "absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold",
          unlocked 
            ? "bg-secondary text-secondary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {requiredDays}d
        </div>
      </div>
      
      <div className="text-center">
        <p className={cn(
          "text-sm font-medium",
          unlocked ? "text-foreground" : "text-muted-foreground"
        )}>
          {name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementBadge;
