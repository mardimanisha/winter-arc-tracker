// src/hooks/useAnalytics.ts

import { useState, useEffect } from "react";
import { AnalyticsService } from "../services/analytics.service";
import { HabitService } from "../services/habit.service";
import { MoodService } from "../services/mood.service";
import { JournalService } from "../services/journal.service"; 
import type { AnalyticsData } from "../types/winter-arc.types";

export const useAnalytics = (userId: string | undefined) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const habitService = new HabitService();
  const moodService = new MoodService();
  const journalService = new JournalService();
  const analyticsService = new AnalyticsService(
    habitService,
    moodService,
    journalService
  );

  useEffect(() => {
    if (userId) {
      loadAnalytics();
    }
  }, [userId]);

  const loadAnalytics = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await analyticsService.getAnalytics(userId);
      setAnalytics(data);
    } catch (err) {
      console.error("Error loading analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    refresh: loadAnalytics,
  };
};
