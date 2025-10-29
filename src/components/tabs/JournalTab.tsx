import React from "react";
import { JournalSection } from "../JournalSection";
import type { AppState } from "../../types/app-state";
import { RewardsBadges } from "../dashboard/RewardsBadges";

interface JournalTabProps {
  appState: AppState;
  onSaveJournal: (content: string) => Promise<void>;
}

/**
 * Journal tab component
 * Writing and reflection interface
 */
export function JournalTab({ appState, onSaveJournal }: JournalTabProps) {
  const { journalEntry, stats } = appState;

  return (
    <div className="space-y-6">
      <JournalSection
        journalEntry={journalEntry}
        onSaveJournal={onSaveJournal}
      />

      <RewardsBadges
        earnedBadges={stats.earnedBadges}
        totalBadges={stats.totalBadges}
      />
    </div>
  );
}
