import React from "react";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { BookOpen, FileText } from 'lucide-react';
import type { JournalEntry } from '../types/winter-arc.types';

interface JournalSectionProps {
  journalEntry: JournalEntry | null;
  onSaveJournal: (content: string) => Promise<void>;
}

export const JournalSection = ({ journalEntry, onSaveJournal }: JournalSectionProps) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(journalEntry?.content || '');
  }, [journalEntry]);

  const handleSave = async () => {
    if (!content.trim()) return;

    setIsSaving(true);
    try {
      await onSaveJournal(content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Arc Journal */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BookOpen className="text-amber-400" size={20} />
            Arc Journal
          </CardTitle>
          <CardDescription className="text-blue-200">
            What did you do today to build your winter arc?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Reflect on your goal etc... What went well? What can you learn? Ideas as you head? Take all perspective"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="resize-none bg-[#0f1c34] border-[#2d5080] text-white placeholder:text-blue-300"
          />
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="flex-1 bg-[#1a2d4a] border-[#2d5080] text-white hover:bg-[#2d5080]"
            >
              <BookOpen size={16} className="mr-2" />
              Save Entry
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white" 
              disabled={isSaving || !content.trim()}
            >
              {isSaving ? 'Saving...' : journalEntry ? 'Update' : 'Submit'}
            </Button>
          </div>
          <div className="p-3 bg-[#1a2d4a]/50 rounded-lg border border-[#2d5080]">
            <p className="text-xs text-blue-200 flex items-start gap-2">
              <span>💡</span>
              <span>Tip: Consistent reflection helps you understand patterns and stay accountable</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Past Entries */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="text-blue-400" size={20} />
            Past Entries
          </CardTitle>
          <CardDescription className="text-blue-200">
            Review your past reflections
          </CardDescription>
        </CardHeader>
        <CardContent>
          {journalEntry ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#1a2d4a]/50 rounded-lg border border-[#2d5080]">
                <p className="text-sm text-blue-100 mb-2">{journalEntry.content}</p>
                <p className="text-xs text-blue-300">
                  {new Date(journalEntry.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-blue-300">No entries yet. Start your first reflection!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
