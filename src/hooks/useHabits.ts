// Custom Hook for Habits Management
// Single Responsibility: Manage habits state and operations

import { useState, useEffect } from "react";
import { HabitService } from "../services/habit.service";
import type {
  Habit,
  HabitEntry,
  HabitCategory,
} from "../types/winter-arc.types";

export const useHabits = (
  userId: string | undefined,
  onEntryLogged?: () => void
) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const habitService = new HabitService();

  useEffect(() => {
    if (userId) {
      loadHabits();
    }
  }, [userId]);

  const loadHabits = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await habitService.getHabits(userId);
      setHabits(data);
    } catch (err: any) {
      console.error("Error loading habits:", err);
      setError(err.message || "Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  const createHabit = async (
    category: HabitCategory,
    title: string,
    description?: string
  ) => {
    if (!userId) throw new Error("User not authenticated");

    try {
      const newHabit = await habitService.createHabit(
        userId,
        category,
        title,
        description
      );
      setHabits((prev) => [...prev, newHabit]);
      return newHabit;
    } catch (err: any) {
      console.error("Error creating habit:", err);
      setError(err.message || "Failed to create habit");
      throw err;
    }
  };

  const updateHabit = async (habitId: string, updates: Partial<Habit>) => {
    try {
      const updated = await habitService.updateHabit(habitId, updates);
      setHabits((prev) => prev.map((h) => (h.id === habitId ? updated : h)));
      return updated;
    } catch (err: any) {
      console.error("Error updating habit:", err);
      setError(err.message || "Failed to update habit");
      throw err;
    }
  };

  const deleteHabit = async (habitId: string) => {
    try {
      await habitService.deleteHabit(habitId);
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    } catch (err: any) {
      console.error("Error deleting habit:", err);
      setError(err.message || "Failed to delete habit");
      throw err;
    }
  };

  const logEntry = async (
    habitId: string,
    date: string,
    completed: boolean,
    notes?: string
  ) => {
    if (!userId) throw new Error("User not authenticated");

    try {
      const result = await habitService.logHabitEntry(
        userId,
        habitId,
        date,
        completed,
        notes
      );
      // Trigger refresh callback if provided
      if (onEntryLogged) {
        onEntryLogged();
      }
      return result;
    } catch (err: any) {
      console.error("Error logging habit entry:", err);
      setError(err.message || "Failed to log habit entry");
      throw err;
    }
  };

  const getEntriesForDate = async (date: string): Promise<HabitEntry[]> => {
    if (!userId) return [];

    try {
      return await habitService.getUserHabitEntriesForDate(userId, date);
    } catch (err: any) {
      console.error("Error getting entries for date:", err);
      return [];
    }
  };

  return {
    habits,
    loading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    logEntry,
    getEntriesForDate,
    refresh: loadHabits,
  };
};
