// src/services/journal.service.ts
// Single Responsibility: Handle all journal operations via API routes

import type { IJournalService } from "../types/services.interfaces";
import type { JournalEntry } from "../types/winter-arc.types";

export class JournalService implements IJournalService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== "undefined" ? "" : "http://localhost:3000";
  }

  // ✅ Create a new journal entry
  async createJournalEntry(
    userId: string,
    date: string,
    content: string
  ): Promise<JournalEntry> {
    const response = await fetch(`${this.baseUrl}/api/journal-entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, date, content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create journal entry: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Fetch all journal entries for a user, optionally filtered by date range
  async getJournalEntries(
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<JournalEntry[]> {
    const params = new URLSearchParams({ userId });
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await fetch(`${this.baseUrl}/api/journal-entries?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch journal entries: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Fetch a single journal entry for a specific date
  async getJournalEntryForDate(
    userId: string,
    date: string
  ): Promise<JournalEntry | null> {
    const params = new URLSearchParams({ userId, date });
    const response = await fetch(`${this.baseUrl}/api/journal-entries?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch journal entry: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Update an existing journal entry
  async updateJournalEntry(entryId: string, content: string): Promise<JournalEntry> {
    const response = await fetch(`${this.baseUrl}/api/journal-entries/${entryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update journal entry: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  // ✅ Delete a journal entry
  async deleteJournalEntry(entryId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/journal-entries/${entryId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to delete journal entry: ${error.error || response.statusText}`);
    }
  }
}
