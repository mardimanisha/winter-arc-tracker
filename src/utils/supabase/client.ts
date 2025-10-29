import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export type TypedSupabaseClient = SupabaseClient<any>;

export const createSupabaseClient = (): TypedSupabaseClient => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
