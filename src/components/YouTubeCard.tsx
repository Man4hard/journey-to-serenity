import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ExternalLink, Clock } from 'lucide-react';

interface YouTubeCardProps {
  title: string;
  thumbnail: string;
  channelName: string;
  duration: string;
  videoId: string;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({
  title,
  thumbnail,
  channelName,
  duration,
  videoId,
}) => {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <Card 
      variant="default" 
      className="overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-4 rounded-full bg-accent/90 shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Play className="h-8 w-8 text-accent-foreground fill-current" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-mono font-medium flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {duration}
        </div>
        {/* Video indicator */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-destructive/90 text-destructive-foreground text-xs font-semibold flex items-center gap-1">
          <Play className="h-3 w-3 fill-current" />
          VIDEO
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{channelName}</span>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeCard;
