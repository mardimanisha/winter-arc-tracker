// src/services/data-repository.service.ts

import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../utils/supabase/client";

import type {
  Habit,
  HabitEntry,
  MoodEntry,
  JournalEntry,
} from "../types/winter-arc.types";


export class DataRepositoryService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createSupabaseClient();
  }

  // --- HABITS ---
  async insertHabit(habit: Partial<Habit>) {
    const { data, error } = await this.supabase
      .from("habits")
      .insert(habit)
      .select()
      .single();

    if (error) throw new Error(`Failed to insert habit: ${error.message}`);
    return data;
  }

  async getUserHabits(userId: string) {
    const { data, error } = await this.supabase
      .from("habits")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true);

    if (error) throw new Error(`Failed to get habits: ${error.message}`);
    return data || [];
  }

  async updateHabit(habitId: string, updates: Partial<Habit>) {
    const { data, error } = await this.supabase
      .from("habits")
      .update(updates)
      .eq("id", habitId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update habit: ${error.message}`);
    return data;
  }

  async softDeleteHabit(habitId: string) {
    const { error } = await this.supabase
      .from("habits")
      .update({ is_active: false })
      .eq("id", habitId);

    if (error) throw new Error(`Failed to delete habit: ${error.message}`);
  }

  // --- HABIT ENTRIES ---
  async insertHabitEntry(entry: Partial<HabitEntry>) {
    const { data, error } = await this.supabase
      .from("habit_entries")
      .insert(entry)
      .select()
      .single();

    if (error) throw new Error(`Failed to insert habit entry: ${error.message}`);
    return data;
  }

  async getUserHabitEntries(userId: string, habitId?: string) {
    let query = this.supabase
      .from("habit_entries")
      .select("*")
      .eq("user_id", userId);

    if (habitId) query = query.eq("habit_id", habitId);

    const { data, error } = await query;

    if (error) throw new Error(`Failed to get habit entries: ${error.message}`);
    return data || [];
  }

  async getUserHabitEntriesForDate(userId: string, date: string) {
    const { data, error } = await this.supabase
      .from("habit_completions")
      .select("*")
      .eq("user_id", userId)
      .gte("completed_at", `${date}T00:00:00Z`)
      .lte("completed_at", `${date}T23:59:59Z`);
  
    if (error) throw new Error(`Failed to fetch habit entries for date: ${error.message}`);
    return data;
  }

  // ---------- MOOD ENTRIES ----------
  async insertMoodEntry(entry: Partial<MoodEntry>) {
    const { data, error } = await this.supabase
      .from("moods")
      .insert(entry)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getUserMoodEntries(userId: string, startDate?: string, endDate?: string) {
    let query = this.supabase.from("moods").select("*").eq("user_id", userId);
    if (startDate) query = query.gte("date", startDate);
    if (endDate) query = query.lte("date", endDate);
    const { data, error } = await query.order("date", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
  }

  async getUserMoodEntryForDate(userId: string, date: string) {
    const { data, error } = await this.supabase
      .from("moods")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .maybeSingle(); // avoids crash when no entry

    if (error) throw new Error(error.message);
    return data;
  }

  async updateMoodEntry(entryId: string, updates: Partial<MoodEntry>) {
    const { data, error } = await this.supabase
      .from("moods")
      .update(updates)
      .eq("id", entryId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // ---------- JOURNAL ENTRIES ----------
  async insertJournalEntry(entry: Partial<JournalEntry>) {
    const { data, error } = await this.supabase
      .from("journal_entries")
      .insert(entry)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getUserJournalEntries(userId: string, startDate?: string, endDate?: string) {
    let query = this.supabase.from("journal_entries").select("*").eq("user_id", userId);
    if (startDate) query = query.gte("date", startDate);
    if (endDate) query = query.lte("date", endDate);
    const { data, error } = await query.order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  async getUserJournalEntryForDate(userId: string, date: string) {
    const { data, error } = await this.supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateJournalEntry(entryId: string, updates: Partial<JournalEntry>) {
    const { data, error } = await this.supabase
      .from("journal_entries")
      .update(updates)
      .eq("id", entryId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteJournalEntry(entryId: string) {
    const { error } = await this.supabase
      .from("journal_entries")
      .delete()
      .eq("id", entryId);

    if (error) throw new Error(error.message);
  }  
}

// Singleton instance
let instance: DataRepositoryService | null = null;
export const getDataRepository = () => {
  if (!instance) instance = new DataRepositoryService();
  return instance;
};
