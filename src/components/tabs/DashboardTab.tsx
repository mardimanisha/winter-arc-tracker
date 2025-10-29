import React from "react";
import type { AppState } from "../../types/app-state";
import { RecentReflections } from "../dashboard/RecentReflections";
import { RewardsBadges } from "../dashboard/RewardsBadges";
import { StatsCards } from "../stats/StatsCards";
import { WinterArcProgress } from "../WinterArcProgress";

interface DashboardTabProps {
  appState: AppState;
}

/**
 * Dashboard tab component
 * Overview of user's progress and key metrics
 */
export function DashboardTab({ appState }: DashboardTabProps) {
  const { stats, analytics, journalEntry } = appState;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards stats={stats} analytics={analytics} />

      {/* Winter Arc Progress */}
      <WinterArcProgress currentDay={stats.currentDay} />

      {/* Recent Reflections */}
      <RecentReflections journalEntry={journalEntry} />

      {/* Rewards & Badges */}
      <RewardsBadges
        earnedBadges={stats.earnedBadges}
        totalBadges={stats.totalBadges}
      />
    </div>
  );
}
