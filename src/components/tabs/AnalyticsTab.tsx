import React from "react";
import { AnalyticsDashboard } from "../AnalyticsDashboard";
import type { AppState } from "../../types/app-state";

interface AnalyticsTabProps {
  appState: AppState;
}

/**
 * Analytics tab component
 * Data visualization and insights interface
 */
export function AnalyticsTab({ appState }: AnalyticsTabProps) {
  const { analytics, habits } = appState;

  return <AnalyticsDashboard analytics={analytics} habits={habits} />;
}
