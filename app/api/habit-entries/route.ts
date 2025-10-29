import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../src/supabase/server/adminClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const habitId = searchParams.get("habitId");
    const date = searchParams.get("date");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    let query = supabase.from("habit_entries").select("*").eq("user_id", userId);

    if (habitId) {
      query = query.eq("habit_id", habitId);
    }

    if (date) {
      query = query.eq("date", date);
    }

    const { data, error } = await query.order("date", { ascending: false });

    if (error) {
      console.error("Error fetching habit entries:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform snake_case to camelCase
    const transformedData = data?.map((entry: any) => ({
      id: entry.id,
      habitId: entry.habit_id,
      userId: entry.user_id,
      date: entry.date,
      completed: entry.completed,
      notes: entry.notes,
      createdAt: entry.created_at,
    }));

    return NextResponse.json(transformedData);
  } catch (error: any) {
    console.error("Error in GET /api/habit-entries:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, habitId, date, completed, notes } = body;

    if (!userId || !habitId || !date || completed === undefined) {
      return NextResponse.json(
        { error: "userId, habitId, date, and completed are required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("habit_entries")
      .upsert(
        {
          user_id: userId,
          habit_id: habitId,
          date,
          completed,
          notes: notes || null,
        },
        {
          onConflict: "habit_id,date",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Error creating habit entry:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Transform snake_case to camelCase
    const transformedData = {
      id: data.id,
      habitId: data.habit_id,
      userId: data.user_id,
      date: data.date,
      completed: data.completed,
      notes: data.notes,
      createdAt: data.created_at,
    };

    return NextResponse.json(transformedData, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/habit-entries:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
