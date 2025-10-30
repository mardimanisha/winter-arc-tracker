/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../../src/supabase/server/adminClient";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id: entryId } = await context.params; 
    const body = await request.json();

    if (!entryId) {
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );
    }

    const dbUpdates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.mood !== undefined) dbUpdates.mood = body.mood;
    if (body.energy !== undefined) dbUpdates.energy = body.energy;
    if (body.focus !== undefined) dbUpdates.focus = body.focus;
    if (body.sleep !== undefined) dbUpdates.sleep = body.sleep;
    if (body.notes !== undefined) dbUpdates.notes = body.notes;

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("mood_entries")
      .update(dbUpdates)
      .eq("id", entryId)
      .select()
      .single();

    if (error) {
      console.error("Error updating mood entry:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in PATCH /api/mood-entries/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE — updated for Next.js 16
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ updated type
) {
  try {
    const { id: entryId } = await context.params; // ✅ await params

    if (!entryId) {
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("mood_entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      console.error("Error deleting mood entry:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in DELETE /api/mood-entries/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
