// Domain Types - Single Responsibility Principle
// Each type represents a single domain concept

export type HabitCategory = "mind" | "body" | "skill";

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type ArcPhase = "foundation" | "focus" | "finish";

export interface Habit {
  id: string;
  userId: string;
  category: HabitCategory;
  title: string;
  description?: string;
  createdAt: string;
  isActive: boolean;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  userId: string;
  date: string; // ISO date string
  completed: boolean;
  notes?: string;
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  date: string;
  mood: MoodLevel;
  energy: MoodLevel;
  focus: MoodLevel;
  sleep?: number; // hours
  notes?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArcGoal {
  id: string;
  userId: string;
  phase: ArcPhase;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface StreakData {
  current: number;
  longest: number;
  total: number;
}

export interface AnalyticsData {
  streaks: Record<string, StreakData>; // habitId -> streak
  completionRate: number;
  moodTrend: Array<{ date: string; mood: number }>;
  energyCorrelation: number;
  daysRemaining: number;
  consistencyPercentage: number;
}

export interface DailyProgress {
  date: string;
  habitsCompleted: number;
  totalHabits: number;
  hasMoodEntry: boolean;
  hasJournalEntry: boolean;
  completionPercentage: number;
}
