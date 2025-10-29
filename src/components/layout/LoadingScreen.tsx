import React from "react";
import { Snowflake } from "lucide-react";

/**
 * Loading screen component
 * Displayed while authentication and initial data loads
 */
export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0f1c34] flex items-center justify-center">
      <div className="text-center">
        <Snowflake
          className="animate-spin mx-auto mb-4 text-blue-400"
          size={48}
        />
        <p className="text-blue-200">Loading your winter arc...</p>
      </div>
    </div>
  );
}
