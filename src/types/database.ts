// Database types matching Supabase schema exactly
// All fields use snake_case as stored in database

export type HabitCategory = 'mind' | 'body' | 'skill';
export type MoodLevel = '1' | '2' | '3' | '4' | '5';

export interface Database {
  public: {
    Tables: {
      habits: {
        Row: {
          id: string;
          user_id: string;
          category: HabitCategory;
          title: string;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: HabitCategory;
          title: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: HabitCategory;
          title?: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
      };

      habit_entries: {
        Row: {
          id: string;
          user_id: string;
          habit_id: string;
          date: string;
          completed: boolean;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          habit_id: string;
          date: string;
          completed?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          habit_id?: string;
          date?: string;
          completed?: boolean;
          notes?: string | null;
          created_at?: string;
        };
      };

      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: MoodLevel;
          energy: MoodLevel;
          focus: MoodLevel;
          sleep: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          mood: MoodLevel;
          energy: MoodLevel;
          focus: MoodLevel;
          sleep?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mood?: MoodLevel;
          energy?: MoodLevel;
          focus?: MoodLevel;
          sleep?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };

      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          content: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          content: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          content?: string;
          created_at?: string;
          updated_at?: string | null;
        };
      };
    };
  };
}
