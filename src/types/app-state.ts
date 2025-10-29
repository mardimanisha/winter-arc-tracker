import type {
  Habit,
  HabitEntry,
  MoodEntry,
  JournalEntry,
  AnalyticsData,
  HabitCategory,
  MoodLevel,
} from "./winter-arc.types";
import { User } from "@supabase/supabase-js";
import type { AppStats } from "../utils/stats-calculator";

/**
 * Centralized application state interface
 * Aggregates all state from various hooks
 */
export interface AppState {
  // Authentication state
  user: User | null;
  authLoading: boolean;
  authError: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, name: string) => Promise<User | null>;
  signOut: () => Promise<void>;

  // Habits state
  habits: Habit[];
  habitsLoading: boolean;
  createHabit: (
    category: HabitCategory,
    title: string,
    description?: string
  ) => Promise<Habit>;
  logEntry: (
    habitId: string,
    date: string,
    completed: boolean
  ) => Promise<HabitEntry>;

  // Daily tracking state
  habitEntries: HabitEntry[];
  moodEntry: MoodEntry | null;
  journalEntry: JournalEntry | null;
  logMood: (
    mood: MoodLevel,
    energy: MoodLevel,
    focus: MoodLevel,
    sleep?: number,
    notes?: string
  ) => Promise<MoodEntry>;

  saveJournal: (content: string) => Promise<JournalEntry>;
  refresh: () => Promise<void>;

  // Analytics state
  analytics: AnalyticsData | null;

  // Derived state
  dateString: string;
  stats: AppStats;
}

/**
 * Event handlers interface
 * Defines all user interaction callbacks
 */
export interface AppHandlers {
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleCreateHabit: (
    category: HabitCategory,
    title: string,
    description?: string
  ) => Promise<void>;
  handleToggleHabit: (habitId: string, completed: boolean) => Promise<void>;
  handleSaveMood: (
    mood: MoodLevel,
    energy: MoodLevel,
    focus: MoodLevel,
    sleep?: number,
    notes?: string
  ) => Promise<void>;
  handleSaveJournal: (content: string) => Promise<void>;
}
