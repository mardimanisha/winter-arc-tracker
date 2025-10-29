// src/services/mood.service.ts
// Single Responsibility: Handle all mood tracking operations via API routes

import type { MoodEntry, MoodLevel } from "../types/winter-arc.types";

export class MoodService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== "undefined" ? "" : "http://localhost:3000";
  }

  // ✅ Create a new mood entry
  async createMoodEntry(
    userId: string,
    date: string,
    mood: MoodLevel,
    energy: MoodLevel,
    focus: MoodLevel,
    sleep?: number,
    notes?: string
  ): Promise<MoodEntry> {
    const response = await fetch(`${this.baseUrl}/api/mood-entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        date,
        mood: mood.toString(),
        energy: energy.toString(),
        focus: focus.toString(),
        sleep,
        notes,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error creating mood entry: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Get all mood entries for a user (optionally filtered by date range)
  async getMoodEntries(
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<MoodEntry[]> {
    const params = new URLSearchParams({ userId });
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await fetch(`${this.baseUrl}/api/mood-entries?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching mood entries: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Get mood entry for a specific date
  async getMoodEntryForDate(userId: string, date: string): Promise<MoodEntry | null> {
    const params = new URLSearchParams({ userId, date });
    const response = await fetch(`${this.baseUrl}/api/mood-entries?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching mood entry for date: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Update a mood entry
  async updateMoodEntry(entryId: string, updates: Partial<MoodEntry>): Promise<MoodEntry> {
    const response = await fetch(`${this.baseUrl}/api/mood-entries/${entryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error updating mood entry: ${error.error || response.statusText}`);
    }

    return response.json();
  }
}
