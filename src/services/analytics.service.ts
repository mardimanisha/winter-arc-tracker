// src/services/analytics.service.ts

import type {
  IAnalyticsService,
  IHabitService,
  IMoodService,
  IJournalService,
} from "../types/services.interfaces";
import type {
  AnalyticsData,
  DailyProgress,
  StreakData,
} from "../types/winter-arc.types";

export class AnalyticsService implements IAnalyticsService {
  constructor(
    private habitService: IHabitService,
    private moodService: IMoodService,
    private journalService: IJournalService
  ) {}

  async getAnalytics(userId: string): Promise<AnalyticsData> {
    const habits = await this.habitService.getHabits(userId);
    const streaks: Record<string, StreakData> = {};

    for (const habit of habits) {
      streaks[habit.id] = await this.getStreakForHabit(userId, habit.id);
    }

    const now = new Date();
    const winterStart = new Date(now.getFullYear(), 9, 1); // October 1
    const newYear = new Date(now.getFullYear() + 1, 0, 1); // January 1
    const daysRemaining = Math.ceil(
      (newYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const completionRate = await this.calculateCompletionRate(
      userId,
      winterStart.toISOString().split("T")[0],
      now.toISOString().split("T")[0]
    );

    const moodEntries = await this.moodService.getMoodEntries(
      userId,
      winterStart.toISOString().split("T")[0],
      now.toISOString().split("T")[0]
    );

    const moodTrend = moodEntries.map((entry) => ({
      date: entry.date,
      mood: entry.mood,
    }));

    const energyCorrelation = await this.getMoodCorrelation(userId);

    const totalDays = Math.ceil(
      (now.getTime() - winterStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    const consistencyPercentage =
      totalDays > 0 ? (completionRate / totalDays) * 100 : 0;

    return {
      streaks,
      completionRate,
      moodTrend,
      energyCorrelation,
      daysRemaining,
      consistencyPercentage: Math.min(100, Math.max(0, consistencyPercentage)),
    };
  }

  async getDailyProgress(userId: string, date: string): Promise<DailyProgress> {
    const habits = await this.habitService.getHabits(userId);
    const habitEntries = await this.habitService.getUserHabitEntriesForDate(
      userId,
      date
    );
    const moodEntry = await this.moodService.getMoodEntryForDate(userId, date);
    const journalEntry = await this.journalService.getJournalEntryForDate(
      userId,
      date
    );

    const habitsCompleted = habitEntries.filter((e) => e.completed).length;
    const totalHabits = habits.length;

    return {
      date,
      habitsCompleted,
      totalHabits,
      hasMoodEntry: !!moodEntry,
      hasJournalEntry: !!journalEntry,
      completionPercentage:
        totalHabits > 0 ? (habitsCompleted / totalHabits) * 100 : 0,
    };
  }

  async getStreakForHabit(
    userId: string,
    habitId: string
  ): Promise<StreakData> {
    const entries = await this.habitService.getHabitEntries(userId, habitId);
    const completedEntries = entries
      .filter((e) => e.completed)
      .sort((a, b) => b.date.localeCompare(a.date));

    if (completedEntries.length === 0) {
      return { current: 0, longest: 0, total: 0 };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let consecutiveDays = 1;

    const today = new Date().toISOString().split("T")[0];
    let checkDate = new Date();

    // Calculate current streak
    for (let i = 0; i < 90; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const hasEntry = completedEntries.some((e) => e.date === dateStr);
      if (hasEntry) {
        if (dateStr <= today) currentStreak++;
      } else if (dateStr < today) break;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Calculate longest streak
    for (let i = 1; i < completedEntries.length; i++) {
      const prevDate = new Date(completedEntries[i - 1].date);
      const currDate = new Date(completedEntries[i].date);
      const dayDiff = Math.floor(
        (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (dayDiff === 1) {
        consecutiveDays++;
        longestStreak = Math.max(longestStreak, consecutiveDays);
      } else consecutiveDays = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);
    return {
      current: currentStreak,
      longest: longestStreak,
      total: completedEntries.length,
    };
  }

  async calculateCompletionRate(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    const habits = await this.habitService.getHabits(userId);
    if (habits.length === 0) return 0;

    let totalCompleted = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayCount =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    for (const habit of habits) {
      const entries = await this.habitService.getHabitEntries(userId, habit.id);
      totalCompleted += entries.filter((e) => e.completed).length;
    }

    const totalPossible = habits.length * dayCount;
    return totalPossible > 0 ? totalCompleted : 0;
  }

  async getMoodCorrelation(userId: string): Promise<number> {
    const habits = await this.habitService.getHabits(userId);
    const moodEntries = await this.moodService.getMoodEntries(userId);
    if (moodEntries.length === 0 || habits.length === 0) return 0;

    let correlation = 0;
    let count = 0;

    for (const moodEntry of moodEntries) {
      const habitEntries =
        await this.habitService.getUserHabitEntriesForDate(
          userId,
          moodEntry.date
        );
      const completionRate =
        habitEntries.length > 0
          ? habitEntries.filter((e) => e.completed).length /
            habitEntries.length
          : 0;

      const avgMood = (moodEntry.mood + moodEntry.energy + moodEntry.focus) / 3;
      correlation += avgMood * completionRate;
      count++;
    }

    return count > 0 ? correlation / count : 0;
  }
}
