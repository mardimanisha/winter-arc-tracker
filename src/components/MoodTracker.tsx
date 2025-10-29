import React from "react";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Brain } from 'lucide-react';
import type { MoodEntry, MoodLevel } from '../types/winter-arc.types';

interface MoodTrackerProps {
  moodEntry: MoodEntry | null;
  onSaveMood: (mood: MoodLevel, energy: MoodLevel, focus: MoodLevel, sleep?: number, notes?: string) => Promise<void>;
}

export const MoodTracker = ({ moodEntry, onSaveMood }: MoodTrackerProps) => {
  const [mood, setMood] = useState<number>(moodEntry?.mood || 3);
  const [energy, setEnergy] = useState<number>(moodEntry?.energy || 3);
  const [focus, setFocus] = useState<number>(moodEntry?.focus || 3);
  const [sleep, setSleep] = useState<number>(moodEntry?.sleep || 7);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (moodEntry) {
      setMood(moodEntry.mood);
      setEnergy(moodEntry.energy);
      setFocus(moodEntry.focus);
      setSleep(moodEntry.sleep || 7);
    }
  }, [moodEntry]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveMood(mood as MoodLevel, energy as MoodLevel, focus as MoodLevel, sleep);
    } finally {
      setIsSaving(false);
    }
  };

  const getLevelLabel = (value: number) => {
    const labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return labels[value - 1] || 'Medium';
  };

  return (
    <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="text-purple-400" size={20} />
          Mood & Energy Tracker
        </CardTitle>
        <CardDescription className="text-blue-200">
          Log today's mood, energy and focus levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Mood</Label>
            <span className="text-sm text-blue-200">{getLevelLabel(mood)}</span>
          </div>
          <Slider
            value={[mood]}
            onValueChange={(value) => setMood(value[0])}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        {/* Energy Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Energy Level</Label>
            <span className="text-sm text-blue-200">{getLevelLabel(energy)}</span>
          </div>
          <Slider
            value={[energy]}
            onValueChange={(value) => setEnergy(value[0])}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        {/* Focus Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Focus Level</Label>
            <span className="text-sm text-blue-200">{getLevelLabel(focus)}</span>
          </div>
          <Slider
            value={[focus]}
            onValueChange={(value) => setFocus(value[0])}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        {/* Sleep */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white">Sleep (hours)</Label>
            <span className="text-sm text-blue-200">{sleep}h</span>
          </div>
          <Slider
            value={[sleep]}
            onValueChange={(value) => setSleep(value[0])}
            min={0}
            max={12}
            step={0.5}
            className="w-full"
          />
        </div>

        <div className="pt-2">
          <p className="text-xs text-blue-300 mb-3">
            💡 Tip: Consistent reflection helps you understand patterns and stay accountable
          </p>
          <Button 
            onClick={handleSave} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : moodEntry ? 'Update' : 'Submit'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
