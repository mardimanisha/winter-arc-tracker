import React from "react";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Flame, Plus, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';
import type { Habit, HabitEntry, HabitCategory } from '../types/winter-arc.types';

interface HabitTrackerProps {
  habits: Habit[];
  habitEntries: HabitEntry[];
  onCreateHabit: (category: HabitCategory, title: string, description?: string) => Promise<void>;
  onToggleHabit: (habitId: string, completed: boolean) => Promise<void>;
  date: string;
}

const categoryEmojis: Record<HabitCategory, string> = {
  mind: '🧠',
  body: '💪',
  skill: '🎯',
};

const categoryColors: Record<HabitCategory, string> = {
  mind: 'bg-purple-500/20 border-purple-400',
  body: 'bg-green-500/20 border-green-400',
  skill: 'bg-blue-500/20 border-blue-400',
};

const categoryLabels: Record<HabitCategory, string> = {
  mind: 'Mind',
  body: 'Body',
  skill: 'Skill',
};

export const HabitTracker = ({ habits, habitEntries, onCreateHabit, onToggleHabit, date }: HabitTrackerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    category: 'mind' as HabitCategory,
    title: '',
    description: '',
  });
  const [openCategories, setOpenCategories] = useState<Record<HabitCategory, boolean>>({
    mind: true,
    body: true,
    skill: true,
  });

  const handleCreateHabit = async () => {
    if (!newHabit.title) return;

    await onCreateHabit(newHabit.category, newHabit.title, newHabit.description);
    setNewHabit({ category: 'mind', title: '', description: '' });
    setIsDialogOpen(false);
  };

  const isHabitCompleted = (habitId: string) => {
    const entry = habitEntries.find(e => e.habitId === habitId);
    return entry?.completed || false;
  };

  const getHabitsByCategory = (category: HabitCategory) => {
    return habits.filter(h => h.category === category);
  };

  const getCategoryCompletion = (category: HabitCategory) => {
    const categoryHabits = getHabitsByCategory(category);
    const completed = categoryHabits.filter(h => isHabitCompleted(h.id)).length;
    return { completed, total: categoryHabits.length };
  };

  const totalCompleted = habitEntries.filter(e => e.completed).length;
  const totalHabits = habits.length;

  return (
    <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Flame className="text-orange-400" size={20} />
              Daily Rituals
            </CardTitle>
            <CardDescription className="text-blue-200">
              Complete your personalized habits across Mind, Body, and Skill
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus size={16} className="mr-1" />
                Add Habit
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a2d4a] border-[#2d5080]">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Habit</DialogTitle>
                <DialogDescription className="text-blue-200">Add a new habit to your winter arc</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-white">Category</Label>
                  <Select
                    value={newHabit.category}
                    onValueChange={(value: HabitCategory) => setNewHabit({ ...newHabit, category: value })}
                  >
                    <SelectTrigger className="bg-[#0f1c34] border-[#2d5080] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2d4a] border-[#2d5080]">
                      <SelectItem value="mind" className="text-white">🧠 Mind</SelectItem>
                      <SelectItem value="body" className="text-white">💪 Body</SelectItem>
                      <SelectItem value="skill" className="text-white">🎯 Skill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Title</Label>
                  <Input
                    placeholder="e.g., Morning meditation"
                    value={newHabit.title}
                    onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                    className="bg-[#0f1c34] border-[#2d5080] text-white placeholder:text-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Description (optional)</Label>
                  <Input
                    placeholder="e.g., 10 minutes of mindfulness"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    className="bg-[#0f1c34] border-[#2d5080] text-white placeholder:text-blue-300"
                  />
                </div>
                <Button onClick={handleCreateHabit} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Create Habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4 p-3 bg-[#1a2d4a]/50 rounded-lg border border-[#2d5080]">
          <p className="text-sm text-white">
            Today's Progress
          </p>
          <p className="text-2xl text-white mt-1">
            {totalCompleted}/{totalHabits} completed today
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.length === 0 ? (
            <p className="text-center text-blue-300 py-8">
              No habits yet. Add your first habit to get started!
            </p>
          ) : (
            (['mind', 'body', 'skill'] as HabitCategory[]).map((category) => {
              const categoryHabits = getHabitsByCategory(category);
              if (categoryHabits.length === 0) return null;

              const { completed, total } = getCategoryCompletion(category);

              return (
                <Collapsible
                  key={category}
                  open={openCategories[category]}
                  onOpenChange={(open) => setOpenCategories({ ...openCategories, [category]: open })}
                >
                  <div className={`rounded-lg border-2 ${categoryColors[category]} overflow-hidden`}>
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{categoryEmojis[category]}</span>
                        <div className="text-left">
                          <h3 className="text-white">{categoryLabels[category]}</h3>
                          <p className="text-xs text-blue-200">
                            {completed}/{total} completed
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`text-white transition-transform ${
                          openCategories[category] ? 'rotate-180' : ''
                        }`}
                        size={20}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-2">
                        {categoryHabits.map((habit) => {
                          const isCompleted = isHabitCompleted(habit.id);

                          return (
                            <div
                              key={habit.id}
                              className="flex items-center gap-3 p-3 bg-[#0f1c34]/30 rounded-lg"
                            >
                              <Checkbox
                                id={habit.id}
                                checked={isCompleted}
                                onCheckedChange={(checked) => onToggleHabit(habit.id, checked as boolean)}
                                className="border-white"
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor={habit.id}
                                  className={`cursor-pointer text-white ${
                                    isCompleted ? 'line-through opacity-60' : ''
                                  }`}
                                >
                                  {habit.title}
                                </Label>
                                {habit.description && (
                                  <p className="text-xs text-blue-200 mt-0.5">{habit.description}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
