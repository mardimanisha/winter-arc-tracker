/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../../src/supabase/server/adminClient";

// ✅ PATCH handler — updated for Next.js 16
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // updated type
) {
  try {
    const { id: entryId } = await context.params; // ✅ await params
    const body = await request.json();

    if (!entryId) {
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );
    }

    if (!body.content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("journal_entries")
      .update({
        content: body.content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", entryId)
      .select()
      .single();

    if (error) {
      console.error("Error updating journal entry:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in PATCH /api/journal-entries/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE handler — updated for Next.js 16
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // updated type
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
      .from("journal_entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      console.error("Error deleting journal entry:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in DELETE /api/journal-entries/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
