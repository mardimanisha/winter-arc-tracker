import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { TrendingUp, Flame, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { AnalyticsData, Habit } from '../types/winter-arc.types';

interface AnalyticsDashboardProps {
  analytics: AnalyticsData | null;
  habits: Habit[];
}

export const AnalyticsDashboard = ({ analytics, habits }: AnalyticsDashboardProps) => {
  if (!analytics) {
    return (
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardContent className="py-12">
          <p className="text-center text-blue-300">Loading analytics...</p>
        </CardContent>
      </Card>
    );
  }

  const categoryEmojis = {
    mind: '🧠',
    body: '💪',
    skill: '🎯',
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-blue-200">
              <Calendar size={16} />
              Days Remaining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{analytics.daysRemaining}</div>
            <p className="text-xs text-blue-300 mt-1">Until New Year</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-blue-200">
              <Target size={16} />
              Consistency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{analytics.consistencyPercentage.toFixed(0)}%</div>
            <Progress value={analytics.consistencyPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-blue-200">
              <Flame size={16} />
              Total Completions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{analytics.completionRate}</div>
            <p className="text-xs text-blue-300 mt-1">Habits completed</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-blue-200">
              <TrendingUp size={16} />
              Mood Correlation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{analytics.energyCorrelation.toFixed(1)}</div>
            <p className="text-xs text-blue-300 mt-1">Mood score</p>
          </CardContent>
        </Card>
      </div>

      {/* Streaks */}
      <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Flame className="text-orange-400" size={24} />
            Habit Streaks
          </CardTitle>
          <CardDescription className="text-blue-200">Your current and longest streaks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.map((habit) => {
              const streak = analytics.streaks[habit.id];
              if (!streak) return null;

              return (
                <div key={habit.id} className="flex items-center justify-between p-3 bg-[#1a2d4a]/50 rounded-lg border border-[#2d5080]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryEmojis[habit.category]}</span>
                    <div>
                      <p className="text-white">{habit.title}</p>
                      <p className="text-xs text-blue-300">
                        {streak.total} total completions
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-1 bg-blue-500/20 text-white border-blue-400">
                        {streak.current} 🔥
                      </Badge>
                      <p className="text-xs text-blue-300">Current</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="mb-1 border-blue-400 text-white">
                        {streak.longest} 🏆
                      </Badge>
                      <p className="text-xs text-blue-300">Longest</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {habits.length === 0 && (
              <p className="text-center text-blue-300 py-4">
                Create habits to see your streaks!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mood Trend */}
      {analytics.moodTrend.length > 0 && (
        <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
          <CardHeader>
            <CardTitle className="text-white">Mood Trend</CardTitle>
            <CardDescription className="text-blue-200">Your mood over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analytics.moodTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d5080" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date: string | number | Date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  stroke="#60a5fa"
                />
                <YAxis domain={[1, 5]} stroke="#60a5fa" />
                <Tooltip 
                  labelFormatter={(date: string | number | Date) => new Date(date).toLocaleDateString()}
                  contentStyle={{ backgroundColor: '#1a2d4a', border: '1px solid #2d5080', color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
