import React from "react";
import { StoryMode } from "../StoryMode";
import type { AppState } from "../../types/app-state";

interface StoryModeTabProps {
  appState: AppState;
}

/**
 * Story Mode tab component
 * Narrative visualization of user progress
 */
export function StoryModeTab({ appState }: StoryModeTabProps) {
  const { analytics } = appState;

  return (
    <div className="max-w-2xl mx-auto">
      <StoryMode
        completionPercentage={analytics?.consistencyPercentage || 0}
        daysRemaining={analytics?.daysRemaining || 0}
      />
    </div>
  );
}
