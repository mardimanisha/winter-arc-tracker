// Service Interfaces - Interface Segregation Principle
// Each interface defines a specific contract for a service

import { User } from '@supabase/supabase-js';
import type {
  Habit,
  HabitEntry,
  MoodEntry,
  JournalEntry,
  ArcGoal,
  AnalyticsData,
  DailyProgress,
  StreakData,
  UserBadge,
  Badge,
  HabitCategory,
  MoodLevel,
  ArcPhase,
} from './winter-arc.types';

// Authentication Service Interface
export interface IAuthService {
  signUp(email: string, password: string, name: string): Promise<User>;
  signIn(email: string, password: string): Promise<{ user: User; token: string }>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  getSession(): Promise<string | null>;
}

// Habit Service Interface
export interface IHabitService {
  createHabit(userId: string, category: HabitCategory, title: string, description?: string): Promise<Habit>;
  getHabits(userId: string): Promise<Habit[]>;
  updateHabit(habitId: string, updates: Partial<Habit>): Promise<Habit>;
  deleteHabit(habitId: string): Promise<void>;
  
  // Habit Entries
  logHabitEntry(habitId: string, userId: string, date: string, completed: boolean, notes?: string): Promise<HabitEntry>;
  getHabitEntries(habitId: string, startDate?: string, endDate?: string): Promise<HabitEntry[]>;
  getUserHabitEntriesForDate(userId: string, date: string): Promise<HabitEntry[]>;
}

// Mood Service Interface
export interface IMoodService {
  createMoodEntry(
    userId: string,
    date: string,
    mood: MoodLevel,
    energy: MoodLevel,
    focus: MoodLevel,
    sleep?: number,
    notes?: string
  ): Promise<MoodEntry>;
  getMoodEntries(userId: string, startDate?: string, endDate?: string): Promise<MoodEntry[]>;
  getMoodEntryForDate(userId: string, date: string): Promise<MoodEntry | null>;
  updateMoodEntry(entryId: string, updates: Partial<MoodEntry>): Promise<MoodEntry>;
}

// Journal Service Interface
export interface IJournalService {
  createJournalEntry(userId: string, date: string, content: string): Promise<JournalEntry>;
  getJournalEntries(userId: string, startDate?: string, endDate?: string): Promise<JournalEntry[]>;
  getJournalEntryForDate(userId: string, date: string): Promise<JournalEntry | null>;
  updateJournalEntry(entryId: string, content: string): Promise<JournalEntry>;
  deleteJournalEntry(entryId: string): Promise<void>;
}

// Arc Goal Service Interface
export interface IArcGoalService {
  createArcGoal(userId: string, phase: ArcPhase, title: string, description: string, startDate: string, endDate: string): Promise<ArcGoal>;
  getArcGoals(userId: string): Promise<ArcGoal[]>;
  updateArcGoal(goalId: string, updates: Partial<ArcGoal>): Promise<ArcGoal>;
  deleteArcGoal(goalId: string): Promise<void>;
}

// Analytics Service Interface
export interface IAnalyticsService {
  getAnalytics(userId: string): Promise<AnalyticsData>;
  getDailyProgress(userId: string, date: string): Promise<DailyProgress>;
  getStreakForHabit(userId: string, habitId: string): Promise<StreakData>;
  calculateCompletionRate(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<number>;
  getMoodCorrelation(userId: string): Promise<number>;
}

// Badge Service Interface
export interface IBadgeService {
  getAllBadges(): Promise<Badge[]>;
  getUserBadges(userId: string): Promise<UserBadge[]>;
  checkAndAwardBadges(userId: string): Promise<UserBadge[]>;
}

// Data Repository Interface (Dependency Inversion Principle)
// Services depend on this abstraction, not concrete implementation
export interface IDataRepository {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  getByPrefix<T>(prefix: string): Promise<T[]>;
  delete(key: string): Promise<void>;
  mget<T>(keys: string[]): Promise<T[]>;
  mset<T>(entries: Record<string, T>): Promise<void>;
}
