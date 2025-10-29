import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useHabits } from "./useHabits";
import { useDailyTracking } from "./useDailyTracking";
import { useAnalytics } from "./useAnalytics";
import { calculateAppStats } from "../utils/stats-calculator";
import type  { AppState } from "../types/app-state";

/**
 * Centralized state management hook for the entire application
 * Consolidates all data fetching and state management logic
 */
export function useAppState(selectedDate: Date): AppState {
  const dateString = selectedDate.toISOString().split("T")[0];

  // Auth state
  const {
    user,
    loading: authLoading,
    error: authError,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
  } = useAuth();

  // Daily tracking state
  const {
    habitEntries,
    moodEntry,
    journalEntry,
    logMood,
    saveJournal,
    refresh,
    refreshHabitEntries,
  } = useDailyTracking(user?.id, dateString);

  // Habits state (with selective refresh callback)
  const {
    habits,
    loading: habitsLoading,
    createHabit,
    logEntry,
  } = useHabits(user?.id, refreshHabitEntries);

  // Analytics state
  const { analytics } = useAnalytics(user?.id);

  // Calculate derived stats
  const stats = calculateAppStats({
    habits,
    habitEntries,
    analytics,
    selectedDate,
  });

  return {
    // Auth
    user,
    authLoading,
    authError,
    isAuthenticated,
    signIn,
    signUp,
    signOut,

    // Habits
    habits,
    habitsLoading,
    createHabit,
    logEntry,

    // Daily tracking
    habitEntries,
    moodEntry,
    journalEntry,
    logMood,
    saveJournal,
    refresh,

    // Analytics
    analytics,

    // Derived state
    dateString,
    stats,
  };
}
