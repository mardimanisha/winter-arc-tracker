import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../../../components/ui/card";
import { Flame, Calendar, Target, TrendingUp } from "lucide-react";
import type { AnalyticsData } from "../../types/winter-arc.types";
import { AppStats } from "../../utils/stats-calculator";

interface StatsCardsProps {
  stats: AppStats;
  analytics: AnalyticsData | null;
}

/**
 * Statistics cards component
 * Displays key metrics in a grid layout
 */
export function StatsCards({ stats, analytics }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Current Streak */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-blue-200">
            <Flame className="text-orange-400" size={16} />
            Current Streak
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl text-white">{stats.currentStreak} days</div>
          <p className="text-xs text-blue-300 mt-1">Keep the fire burning!</p>
        </CardContent>
      </Card>

      {/* Days Until New Year */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-blue-200">
            <Calendar className="text-blue-400" size={16} />
            Days Until New Year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl text-white">
            {stats.daysUntilNewYear} days
          </div>
          <p className="text-xs text-blue-300 mt-1">Make them count!</p>
        </CardContent>
      </Card>

      {/* Today's Progress */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-blue-200">
            <Target className="text-green-400" size={16} />
            Today's Progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl text-white">
            {stats.completedToday}/{stats.totalHabits}
          </div>
          <p className="text-xs text-blue-300 mt-1">Tasks completed</p>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-blue-200">
            <TrendingUp className="text-purple-400" size={16} />
            Completion Rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl text-white">
            {analytics?.consistencyPercentage.toFixed(0) || 0}%
          </div>
          <p className="text-xs text-blue-300 mt-1">Overall consistency</p>
        </CardContent>
      </Card>
    </div>
  );
}
