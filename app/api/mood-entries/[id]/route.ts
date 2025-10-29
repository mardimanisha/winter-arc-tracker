import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../../src/supabase/server/adminClient";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const entryId = params.id;

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entryId = params.id;

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
