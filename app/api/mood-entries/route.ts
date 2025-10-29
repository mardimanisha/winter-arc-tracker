import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../src/supabase/server/adminClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    let query = supabase.from("mood_entries").select("*").eq("user_id", userId);

    // Filter by specific date
    if (date) {
      query = query.eq("date", date);
      const { data, error } = await query.maybeSingle();
      
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching mood entry:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      
      return NextResponse.json(data);
    }

    // Filter by date range
    if (startDate && endDate) {
      query = query.gte("date", startDate).lte("date", endDate);
    }

    const { data, error } = await query.order("date", { ascending: false });

    if (error) {
      console.error("Error fetching mood entries:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error in GET /api/mood-entries:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, date, mood, energy, focus, sleep, notes } = body;

    if (!userId || !date || !mood || !energy || !focus) {
      return NextResponse.json(
        { error: "userId, date, mood, energy, and focus are required" },
        { status: 400 }
      );
    }

    // Validate mood levels
    const validLevels = ['1', '2', '3', '4', '5'];
    if (!validLevels.includes(mood) || !validLevels.includes(energy) || !validLevels.includes(focus)) {
      return NextResponse.json(
        { error: "mood, energy, and focus must be between 1 and 5" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    
    // Use upsert to handle duplicate date entries
    const { data, error } = await supabase
      .from("mood_entries")
      .upsert({
        user_id: userId,
        date,
        mood,
        energy,
        focus,
        sleep: sleep || null,
        notes: notes || null,
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,date'
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating mood entry:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/mood-entries:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
