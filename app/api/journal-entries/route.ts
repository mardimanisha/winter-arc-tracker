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
    let query = supabase.from("journal_entries").select("*").eq("user_id", userId);

    // Filter by specific date
    if (date) {
      query = query.eq("date", date);
      const { data, error } = await query.maybeSingle();
      
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching journal entry:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      
      return NextResponse.json(data);
    }

    // Filter by date range
    if (startDate) query = query.gte("date", startDate);
    if (endDate) query = query.lte("date", endDate);

    const { data, error } = await query.order("date", { ascending: false });

    if (error) {
      console.error("Error fetching journal entries:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error in GET /api/journal-entries:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, date, content } = body;

    if (!userId || !date || !content) {
      return NextResponse.json(
        { error: "userId, date, and content are required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    
    // Use upsert to handle duplicate date entries
    const { data, error } = await supabase
      .from("journal_entries")
      .upsert({
        user_id: userId,
        date,
        content,
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,date'
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating journal entry:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/journal-entries:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
