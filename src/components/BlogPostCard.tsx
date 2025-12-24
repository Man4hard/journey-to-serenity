import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
  url?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  excerpt,
  category,
  readTime,
  image,
  url,
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'science': return 'from-blue-500 to-blue-600';
      case 'motivation': return 'from-secondary to-secondary-dark';
      case 'tips': return 'from-primary to-primary-dark';
      case 'success stories': return 'from-success to-green-600';
      default: return 'from-primary to-secondary';
    }
  };

  return (
    <Card 
      variant="default" 
      className="overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {image && (
        <div className="relative aspect-[2/1] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      )}
      
      <CardContent className={image ? "p-4 -mt-8 relative" : "p-4"}>
        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-md`}>
            {category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
        </div>
        
        {/* Blog indicator */}
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/20">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">BLOG POST</span>
        </div>
        
        <h3 className="font-bold text-lg text-foreground line-clamp-2 group-hover:text-gradient transition-all duration-300 mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {excerpt}
        </p>
        
        <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
          Read More
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
