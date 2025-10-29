import React from "react";
import { HabitTracker } from "../HabitTracker";
import { MoodTracker } from "../MoodTracker";
import type { AppState } from "../../types/app-state";
import type { HabitCategory, MoodLevel } from "../../types/winter-arc.types";
import { RewardsBadges } from "../dashboard/RewardsBadges";

interface DailyRitualsTabProps {
  appState: AppState;
  onCreateHabit: (
    category: HabitCategory,
    title: string,
    description?: string
  ) => Promise<void>;
  onToggleHabit: (habitId: string, completed: boolean) => Promise<void>;
  onSaveMood: (
    mood: MoodLevel,
    energy: MoodLevel,
    focus: MoodLevel,
    sleep?: number,
    notes?: string
  ) => Promise<void>;
}

/**
 * Daily Rituals tab component
 * Habit tracking and mood logging interface
 */
export function DailyRitualsTab({
  appState,
  onCreateHabit,
  onToggleHabit,
  onSaveMood,
}: DailyRitualsTabProps) {
  const { habits, habitEntries, moodEntry, dateString, stats } = appState;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HabitTracker
          habits={habits}
          habitEntries={habitEntries}
          onCreateHabit={onCreateHabit}
          onToggleHabit={onToggleHabit}
          date={dateString}
        />

        <MoodTracker moodEntry={moodEntry} onSaveMood={onSaveMood} />
      </div>

      <RewardsBadges
        earnedBadges={stats.earnedBadges}
        totalBadges={stats.totalBadges}
      />
    </div>
  );
}
