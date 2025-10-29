// Custom Hook for Authentication
// Single Responsibility: Manage authentication state

import { useState, useEffect } from "react";
import { getAuthService } from "../services/auth.service";
import type { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authService = getAuthService();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Error checking user:", err);
      setError("Failed to check authentication status");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      setLoading(true);
      const newUser = await authService.signUp(email, password, name);
      // After signup, sign in automatically
      await signIn(email, password);
      return newUser;
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to sign up");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { user: signedInUser } = await authService.signIn(email, password);
      setUser(signedInUser);
      return signedInUser;
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
    } catch (err: any) {
      console.error("Sign out error:", err);
      setError(err.message || "Failed to sign out");
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
