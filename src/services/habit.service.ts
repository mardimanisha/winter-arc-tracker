// src/services/habit.service.ts
// Single Responsibility: Handle all habit-related operations via API routes

import type { Habit, HabitEntry, HabitCategory } from "../types/winter-arc.types";

export class HabitService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== "undefined" ? "" : "http://localhost:3000";
  }

  // ✅ Create a new habit
  async createHabit(
    userId: string,
    category: HabitCategory,
    title: string,
    description?: string
  ): Promise<Habit> {
    const response = await fetch(`${this.baseUrl}/api/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, category, title, description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error creating habit: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Get all active habits for a user
  async getHabits(userId: string): Promise<Habit[]> {
    const response = await fetch(`${this.baseUrl}/api/habits?userId=${userId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching habits: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Update a habit
  async updateHabit(habitId: string, updates: Partial<Habit>): Promise<Habit> {
    const response = await fetch(`${this.baseUrl}/api/habits/${habitId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error updating habit: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Soft delete (deactivate) a habit
  async deleteHabit(habitId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/habits/${habitId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error deleting habit: ${error.error || response.statusText}`);
    }
  }

  // ✅ Log a habit entry
  async logHabitEntry(
    userId: string,
    habitId: string,
    date: string,
    completed: boolean,
    notes?: string
  ): Promise<HabitEntry> {
    const response = await fetch(`${this.baseUrl}/api/habit-entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, habitId, date, completed, notes }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error logging habit entry: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Get all habit entries for a user
  async getHabitEntries(userId: string, habitId?: string): Promise<HabitEntry[]> {
    const params = new URLSearchParams({ userId });
    if (habitId) params.append("habitId", habitId);

    const response = await fetch(`${this.baseUrl}/api/habit-entries?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching habit entries: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Get all habit entries for a specific date
  async getUserHabitEntriesForDate(userId: string, date: string): Promise<HabitEntry[]> {
    const params = new URLSearchParams({ userId, date });
    const response = await fetch(`${this.baseUrl}/api/habit-entries?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching habit entries for date: ${error.error || response.statusText}`);
    }

    return response.json();
  }
}
