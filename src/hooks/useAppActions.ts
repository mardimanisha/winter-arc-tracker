import { useCallback } from "react";
import { toast } from "sonner";
import type { HabitCategory, MoodLevel } from "../types/winter-arc.types";
import { AppState } from "../types/app-state";

/**
 * Centralized event handlers for the application
 * Separates business logic from UI components
 */
export function useAppActions(appState: AppState, selectedDate: Date) {
  const dateString = selectedDate.toISOString().split("T")[0];

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        await appState.signIn(email, password);
        toast.success("Welcome back!");
      } catch (error: any) {
        toast.error(error.message || "Sign in failed");
      }
    },
    [appState.signIn]
  );

  const handleSignUp = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        await appState.signUp(email, password, name);
        toast.success("Account created successfully!");
      } catch (error: any) {
        toast.error(error.message || "Sign up failed");
      }
    },
    [appState.signUp]
  );

  const handleSignOut = useCallback(async () => {
    await appState.signOut();
    toast.info("Signed out successfully");
  }, [appState.signOut]);

  const handleCreateHabit = useCallback(
    async (category: HabitCategory, title: string, description?: string) => {
      try {
        await appState.createHabit(category, title, description);
        toast.success("Habit created!");
      } catch (error: any) {
        toast.error(error.message || "Failed to create habit");
      }
    },
    [appState.createHabit]
  );

  const handleToggleHabit = useCallback(
    async (habitId: string, completed: boolean) => {
      try {
        await appState.logEntry(habitId, dateString, completed);
        toast.success(completed ? "Great job! 🔥" : "Marked as incomplete");
      } catch (error: any) {
        toast.error(error.message || "Failed to update habit");
      }
    },
    [appState.logEntry, dateString]
  );

  const handleSaveMood = useCallback(
    async (
      mood: MoodLevel,
      energy: MoodLevel,
      focus: MoodLevel,
      sleep?: number,
      notes?: string
    ) => {
      try {
        await appState.logMood(mood, energy, focus, sleep, notes);
        toast.success("Mood saved!");
      } catch (error: any) {
        toast.error(error.message || "Failed to save mood");
      }
    },
    [appState.logMood]
  );

  const handleSaveJournal = useCallback(
    async (content: string) => {
      try {
        await appState.saveJournal(content);
        toast.success("Journal entry saved!");
      } catch (error: any) {
        toast.error(error.message || "Failed to save journal");
      }
    },
    [appState.saveJournal]
  );

  return {
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleCreateHabit,
    handleToggleHabit,
    handleSaveMood,
    handleSaveJournal,
  };
}
