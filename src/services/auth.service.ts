// Authentication Service
// Single Responsibility: Handle all authentication operations

import type { IAuthService } from "../types/services.interfaces";
import { User, SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../utils/supabase/client";
import { createSupabaseAdminClient } from "../supabase/server/adminClient";

class AuthService implements IAuthService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient | null = null;

  constructor() {
    // Always create the public (anon) client — safe for browser
    this.supabase = createSupabaseClient();

    // Only create the admin client in server-side environments
    if (typeof window === "undefined") {
      this.supabaseAdmin = createSupabaseAdminClient();
    }
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) throw new Error(error.message || "Sign up failed");
      if (!data.user) throw new Error("User not created");

      // Store user client-side (only in browser)
      if (typeof window !== "undefined") {
        localStorage.setItem("winter_arc_user", JSON.stringify(data.user));
      }

      return data.user;
    } catch (error) {
      console.error("Auth error during sign up:", error);
      throw error;
    }
  }

  async signIn(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message || "Sign in failed");
      if (!data.session || !data.user) throw new Error("Sign in failed - no session");

      // Save credentials in browser only
      if (typeof window !== "undefined") {
        localStorage.setItem("winter_arc_token", data.session.access_token);
        localStorage.setItem("winter_arc_user", JSON.stringify(data.user));
      }

      return { user: data.user, token: data.session.access_token };
    } catch (error) {
      console.error("Auth error during sign in:", error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.supabase.auth.signOut();
      if (typeof window !== "undefined") {
        localStorage.removeItem("winter_arc_token");
        localStorage.removeItem("winter_arc_user");
      }
    } catch (error) {
      console.error("Auth error during sign out:", error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();

      if (error) {
        // fallback to localStorage in browser
        if (typeof window !== "undefined") {
          const userStr = localStorage.getItem("winter_arc_user");
          return userStr ? JSON.parse(userStr) : null;
        }
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      if (typeof window !== "undefined") {
        const userStr = localStorage.getItem("winter_arc_user");
        return userStr ? JSON.parse(userStr) : null;
      }
      return null;
    }
  }

  async getSession(): Promise<string | null> {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      return session ? session.access_token : null;
    } catch (error) {
      console.error("Error getting session:", error);
      if (typeof window !== "undefined") {
        return localStorage.getItem("winter_arc_token");
      }
      return null;
    }
  }

  // Optionally: safe admin usage example
  async getAllUsersServerOnly() {
    if (!this.supabaseAdmin) {
      throw new Error("Admin client only available on the server");
    }

    const { data, error } = await this.supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;
    return data;
  }
}

// Singleton instance
let authInstance: AuthService | null = null;

export const getAuthService = (): IAuthService => {
  if (!authInstance) {
    authInstance = new AuthService();
  }
  return authInstance;
};
