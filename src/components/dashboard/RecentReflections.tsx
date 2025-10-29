'use client'
import { JournalEntry } from "../../types/winter-arc.types";
import { formatDate } from "../../utils/stats-calculator";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Scroll } from "lucide-react";

interface RecentReflectionsProps {
  journalEntry: JournalEntry | null;
}

/**
 * Recent reflections component
 * Displays the most recent journal entry
 */
export function RecentReflections({ journalEntry }: RecentReflectionsProps) {
  return (
    <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Scroll className="text-amber-300" size={20} />
          Recent Reflections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {journalEntry ? (
          <div className="p-4 bg-[#1a2d4a]/50 rounded-lg border border-[#2d5080]">
            <p className="text-blue-100">{journalEntry.content}</p>
            <p className="text-xs text-blue-300 mt-2">
              {formatDate(new Date(journalEntry.date))}
            </p>
          </div>
        ) : (
          <p className="text-center text-blue-300 py-8">
            No journal entries yet. Start documenting your journey!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
