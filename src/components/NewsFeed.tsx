import React from 'react';
import YouTubeCard from './YouTubeCard';
import BlogPostCard from './BlogPostCard';
import KegalExerciseCard from './KegalExerciseCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Rss, Video } from 'lucide-react';

// Curated YouTube videos for recovery (using real YouTube thumbnails format)
// TODO: Replace with YouTube Data API v3 when API key is added
const youtubeVideos = [
  {
    id: '1',
    title: 'How to Rewire Your Brain for Success',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=360&fit=crop',
    channelName: 'Motivation Daily',
    duration: '15:42',
    videoId: 'BvPmY24pMKw', // Placeholder - will use real video IDs
  },
  {
    id: '2',
    title: '10-Minute Morning Meditation for Clarity',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=360&fit=crop',
    channelName: 'Peaceful Mind',
    duration: '10:15',
    videoId: 'inpok4MKVLM',
  },
  {
    id: '3',
    title: 'The Science of Breaking Bad Habits',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&h=360&fit=crop',
    channelName: 'TED-Ed',
    duration: '8:33',
    videoId: 'W_fQvcBCNbA',
  },
  {
    id: '4',
    title: 'Building Discipline: Navy SEAL Motivation',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&h=360&fit=crop',
    channelName: 'Jocko Podcast',
    duration: '22:18',
    videoId: 'IdTMDpizis8',
  },
  {
    id: '5',
    title: 'How Exercise Changes Your Brain',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=640&h=360&fit=crop',
    channelName: 'SciShow',
    duration: '11:45',
    videoId: 'BHY0FxzoKZE',
  },
];

// Blog posts - TODO: Replace with WordPress REST API
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Your Brain: The Neuroscience of Habit Formation',
    excerpt: 'Learn how habits are formed in the brain and discover science-backed strategies to rewire your neural pathways for lasting change. The key lies in understanding dopamine cycles.',
    category: 'Science',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    url: '#',
  },
  {
    id: '2',
    title: '7 Morning Rituals That Will Transform Your Day',
    excerpt: 'Start your day with purpose and intention. These proven morning rituals will help you stay focused, energized, and motivated throughout the entire day.',
    category: 'Tips',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    url: '#',
  },
  {
    id: '3',
    title: 'From Struggle to Strength: A 90-Day Transformation',
    excerpt: 'Read about how determination, support, and the right mindset can lead to incredible personal transformation. This inspiring story will motivate you.',
    category: 'Success Stories',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=400&fit=crop',
    url: '#',
  },
  {
    id: '4',
    title: 'The Power of Cold Showers: Physical and Mental Benefits',
    excerpt: 'Cold exposure therapy has been used for centuries. Discover how cold showers can boost your mood, increase willpower, and improve your overall health.',
    category: 'Science',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800&h=400&fit=crop',
    url: '#',
  },
  {
    id: '5',
    title: 'Accountability Partners: Why They Work',
    excerpt: 'Having someone to share your journey with can make all the difference. Learn how to find and work with an accountability partner effectively.',
    category: 'Motivation',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
    url: '#',
  },
];

type FeedItem = 
  | { type: 'youtube'; data: typeof youtubeVideos[0] }
  | { type: 'blog'; data: typeof blogPosts[0] }
  | { type: 'kegel' }
  | { type: 'section-header'; title: string; icon: 'video' | 'blog' };

const NewsFeed: React.FC = () => {
  const { t } = useLanguage();

  // Create a rich, mixed feed experience
  const feedItems: FeedItem[] = [
    { type: 'section-header', title: 'Featured Video', icon: 'video' },
    { type: 'youtube', data: youtubeVideos[0] },
    { type: 'blog', data: blogPosts[0] },
    { type: 'kegel' },
    { type: 'section-header', title: 'More Videos', icon: 'video' },
    { type: 'youtube', data: youtubeVideos[1] },
    { type: 'youtube', data: youtubeVideos[2] },
    { type: 'section-header', title: 'Latest Articles', icon: 'blog' },
    { type: 'blog', data: blogPosts[1] },
    { type: 'blog', data: blogPosts[2] },
    { type: 'youtube', data: youtubeVideos[3] },
    { type: 'blog', data: blogPosts[3] },
    { type: 'youtube', data: youtubeVideos[4] },
    { type: 'blog', data: blogPosts[4] },
  ];

  const renderSectionHeader = (title: string, icon: 'video' | 'blog') => (
    <div className="flex items-center gap-3 pt-4 pb-2">
      <div className={`p-2 rounded-lg ${icon === 'video' ? 'bg-destructive/20' : 'bg-primary/20'}`}>
        {icon === 'video' ? (
          <Video className="h-4 w-4 text-destructive" />
        ) : (
          <Rss className="h-4 w-4 text-primary" />
        )}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gradient">Your Feed</h2>
        <span className="text-xs text-muted-foreground px-3 py-1 rounded-full glass-subtle">
          Curated for you
        </span>
      </div>

      {/* Feed Items */}
      <div className="space-y-4 stagger-children">
        {feedItems.map((item, index) => {
          if (item.type === 'section-header') {
            return (
              <div key={`header-${index}`}>
                {renderSectionHeader(item.title, item.icon)}
              </div>
            );
          }
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
    </div>
  );
};

export default NewsFeed;
