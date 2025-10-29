// Custom Hook for Daily Tracking (Habits + Mood + Journal)
// Single Responsibility: Manage daily tracking state

import { useState, useEffect } from "react";
import { HabitService } from "../services/habit.service";
import { MoodService } from "../services/mood.service";
import { JournalService } from "../services/journal.service";
import type {
  HabitEntry,
  MoodEntry,
  JournalEntry,
  MoodLevel,
} from "../types/winter-arc.types";

export const useDailyTracking = (userId: string | undefined, date: string) => {
  const [habitEntries, setHabitEntries] = useState<HabitEntry[]>([]);
  const [moodEntry, setMoodEntry] = useState<MoodEntry | null>(null);
  const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  const habitService = new HabitService();
  const moodService = new MoodService();
  const journalService = new JournalService();

  useEffect(() => {
    if (userId && date) {
      loadDailyData();
    }
  }, [userId, date]);

  const loadDailyData = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const [habits, mood, journal] = await Promise.all([
        habitService.getUserHabitEntriesForDate(userId, date),
        moodService.getMoodEntryForDate(userId, date),
        journalService.getJournalEntryForDate(userId, date),
      ]);

      setHabitEntries(habits);
      setMoodEntry(mood);
      setJournalEntry(journal);
    } catch (err) {
      console.error("Error loading daily data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh only habit entries (called after logging habit entry)
  const refreshHabitEntries = async () => {
    if (!userId) return;
    try {
      const habits = await habitService.getUserHabitEntriesForDate(userId, date);
      setHabitEntries(habits);
    } catch (err) {
      console.error("Error refreshing habit entries:", err);
    }
  };

  const logMood = async (
    mood: MoodLevel,
    energy: MoodLevel,
    focus: MoodLevel,
    sleep?: number,
    notes?: string
  ) => {
    if (!userId) throw new Error("User not authenticated");

    try {
      const entry = await moodService.createMoodEntry(
        userId,
        date,
        mood,
        energy,
        focus,
        sleep,
        notes
      );
      setMoodEntry(entry);
      return entry;
    } catch (err) {
      console.error("Error logging mood:", err);
      throw err;
    }
  };

  const saveJournal = async (content: string) => {
    if (!userId) throw new Error("User not authenticated");

    try {
      let entry;
      if (journalEntry) {
        entry = await journalService.updateJournalEntry(
          journalEntry.id,
          content
        );
      } else {
        entry = await journalService.createJournalEntry(userId, date, content);
      }
      setJournalEntry(entry);
      return entry;
    } catch (err) {
      console.error("Error saving journal:", err);
      throw err;
    }
  };

  return {
    habitEntries,
    moodEntry,
    journalEntry,
    loading,
    logMood,
    saveJournal,
    refresh: loadDailyData,
    refreshHabitEntries,
  };
};
