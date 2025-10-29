import type {
  Habit,
  HabitEntry,
  AnalyticsData,
} from "../types/winter-arc.types";

interface StatsInput {
  habits: Habit[];
  habitEntries: HabitEntry[];
  analytics: AnalyticsData | null;
  selectedDate: Date;
}

export interface AppStats {
  completedToday: number;
  totalHabits: number;
  todayProgress: number;
  daysUntilNewYear: number;
  currentStreak: number;
  currentDay: number;
  earnedBadges: number;
  totalBadges: number;
  isToday: boolean;
}

/**
 * Calculates all application statistics
 * Centralized calculation logic for derived state
 */
export function calculateAppStats({
  habits,
  habitEntries,
  analytics,
  selectedDate,
}: StatsInput): AppStats {
  const dateString = selectedDate.toISOString().split("T")[0];
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // Today's progress
  const completedToday = habitEntries.filter((e) => e.completed).length;
  const totalHabits = habits.length;
  const todayProgress =
    totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  // Days until New Year
  const newYear = new Date(today.getFullYear() + 1, 0, 1);
  const daysUntilNewYear = Math.ceil(
    (newYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Current streak
  const currentStreak = analytics?.streaks
    ? Math.max(...Object.values(analytics.streaks).map((s) => s.current), 0)
    : 0;

  // Winter Arc progress (90-day arc starting Oct 1)
  const winterArcStart = new Date(today.getFullYear(), 9, 1);
  const daysSinceStart = Math.ceil(
    (today.getTime() - winterArcStart.getTime()) / (1000 * 60 * 60 * 24)
  );
  const currentDay = Math.max(1, Math.min(daysSinceStart, 90));

  // Badges (placeholder - will be calculated from actual badge system)
  const earnedBadges = 0;
  const totalBadges = 8;

  // Check if viewing today
  const isToday = dateString === todayString;

  return {
    completedToday,
    totalHabits,
    todayProgress,
    daysUntilNewYear,
    currentStreak,
    currentDay,
    earnedBadges,
    totalBadges,
    isToday,
  };
}

/**
 * Formats a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculates completion percentage
 */
export function calculateCompletionRate(
  completed: number,
  total: number
): number {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}
