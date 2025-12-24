import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Smile, Meh, Frown, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Journal: React.FC = () => {
  const { t } = useLanguage();
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useApp();
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(5);

  const moodOptions = [
    { value: 3, icon: Frown, label: 'Low', color: 'text-destructive' },
    { value: 5, icon: Meh, label: 'Okay', color: 'text-warning' },
    { value: 8, icon: Smile, label: 'Good', color: 'text-success' },
  ];

  const handleSave = () => {
    if (!content.trim()) {
      toast.error('Please write something first');
      return;
    }
    addJournalEntry(content.trim(), mood);
    setContent('');
    setMood(5);
    setIsWriting(false);
    toast.success('Entry saved!');
  };

  const handleDelete = (id: string) => {
    deleteJournalEntry(id);
    toast.success('Entry deleted');
  };

  const getMoodIcon = (moodValue: number) => {
    if (moodValue >= 7) return <Smile className="h-4 w-4 text-success" />;
    if (moodValue >= 4) return <Meh className="h-4 w-4 text-warning" />;
    return <Frown className="h-4 w-4 text-destructive" />;
  };

  return (
    <div className="min-h-screen bg-gradient-ocean pb-24">
      <div className="max-w-lg mx-auto px-4 pt-16 pb-8 space-y-6 page-enter">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('journal')}</h1>
            <p className="text-muted-foreground">Your private reflection space</p>
          </div>
          {!isWriting && (
            <Button variant="success" size="icon" onClick={() => setIsWriting(true)}>
              <Plus className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* New Entry Form */}
        {isWriting && (
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-4 space-y-4">
              <Textarea
                placeholder={t('writeThoughts')}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px] resize-none border-0 bg-muted/50 focus:ring-2 focus:ring-secondary"
              />
              
              {/* Mood Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('mood')}</label>
                <div className="flex items-center gap-2">
                  {moodOptions.map(({ value, icon: Icon, label, color }) => (
                    <button
                      key={value}
                      onClick={() => setMood(value)}
                      className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                        mood === value
                          ? 'bg-secondary/20 border-2 border-secondary'
                          : 'bg-muted/50 border-2 border-transparent'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${color}`} />
                      <span className="text-xs text-foreground">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1" onClick={() => setIsWriting(false)}>
                  Cancel
                </Button>
                <Button variant="success" className="flex-1" onClick={handleSave}>
                  {t('save')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        {journalEntries.length === 0 ? (
          <Card variant="glass" className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No entries yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Start journaling to track your thoughts
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id} variant="default" className="card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getMoodIcon(entry.mood)}
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(entry.date), 'MMM d, yyyy • h:mm a')}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
