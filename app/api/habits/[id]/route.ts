import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../../src/supabase/server/adminClient";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const habitId = params.id;

    if (!habitId) {
      return NextResponse.json(
        { error: "Habit ID is required" },
        { status: 400 }
      );
    }

    // Map camelCase to snake_case
    const dbUpdates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.userId !== undefined) dbUpdates.user_id = body.userId;
    if (body.category !== undefined) dbUpdates.category = body.category;
    if (body.title !== undefined) dbUpdates.title = body.title;
    if (body.description !== undefined) dbUpdates.description = body.description;
    if (body.isActive !== undefined) dbUpdates.is_active = body.isActive;
    if (body.createdAt !== undefined) dbUpdates.created_at = body.createdAt;

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("habits")
      .update(dbUpdates)
      .eq("id", habitId)
      .select()
      .single();

    if (error) {
      console.error("Error updating habit:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in PATCH /api/habits/[id]:", error);
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
    const habitId = params.id;

    if (!habitId) {
      return NextResponse.json(
        { error: "Habit ID is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("habits")
      .update({
        is_active: false,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", habitId);

    if (error) {
      console.error("Error deleting habit:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in DELETE /api/habits/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
