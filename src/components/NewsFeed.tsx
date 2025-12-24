import React from 'react';
import YouTubeCard from './YouTubeCard';
import BlogPostCard from './BlogPostCard';
import KegalExerciseCard from './KegalExerciseCard';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample data - in production, this would come from APIs
const youtubeVideos = [
  {
    id: '1',
    title: 'The Science Behind Addiction Recovery',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=450&fit=crop',
    channelName: 'Recovery Science',
    duration: '12:34',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Meditation for Inner Peace - 10 Minute Guided Session',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop',
    channelName: 'Mindful Living',
    duration: '10:00',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Building Healthy Habits That Last',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
    channelName: 'Life Mastery',
    duration: '18:22',
    videoId: 'dQw4w9WgXcQ',
  },
];

const blogPosts = [
  {
    id: '1',
    title: 'Understanding Your Brain: The Neuroscience of Habit Formation',
    excerpt: 'Learn how habits are formed in the brain and discover science-backed strategies to rewire your neural pathways for lasting change.',
    category: 'Science',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    url: '#',
  },
  {
    id: '2',
    title: '7 Morning Rituals That Will Transform Your Day',
    excerpt: 'Start your day with purpose and intention. These proven morning rituals will help you stay focused and motivated throughout the day.',
    category: 'Tips',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    url: '#',
  },
  {
    id: '3',
    title: 'From Struggle to Strength: John\'s 90-Day Journey',
    excerpt: 'Read about how John overcame his challenges and rebuilt his life with determination, support, and the right mindset.',
    category: 'Success Stories',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=400&fit=crop',
    url: '#',
  },
];

type FeedItem = 
  | { type: 'youtube'; data: typeof youtubeVideos[0] }
  | { type: 'blog'; data: typeof blogPosts[0] }
  | { type: 'kegel' };

const NewsFeed: React.FC = () => {
  const { t } = useLanguage();

  // Interleave content for a mixed feed experience
  const feedItems: FeedItem[] = [
    { type: 'youtube', data: youtubeVideos[0] },
    { type: 'blog', data: blogPosts[0] },
    { type: 'kegel' },
    { type: 'youtube', data: youtubeVideos[1] },
    { type: 'blog', data: blogPosts[1] },
    { type: 'youtube', data: youtubeVideos[2] },
    { type: 'blog', data: blogPosts[2] },
  ];

  return (
    <div className="space-y-4 stagger-children">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gradient">Your Feed</h2>
        <span className="text-xs text-muted-foreground px-3 py-1 rounded-full glass-subtle">
          Curated for you
        </span>
      </div>

      {/* Feed Items */}
      {feedItems.map((item, index) => {
        if (item.type === 'youtube') {
          return (
            <YouTubeCard
              key={`youtube-${item.data.id}`}
              {...item.data}
            />
          );
        }
        if (item.type === 'blog') {
          return (
            <BlogPostCard
              key={`blog-${item.data.id}`}
              {...item.data}
            />
          );
        }
        if (item.type === 'kegel') {
          return <KegalExerciseCard key="kegel" />;
        }
        return null;
      })}
    </div>
  );
};

export default NewsFeed;
