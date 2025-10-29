'use client'
import { AuthPage } from "@/src/components/AuthPage";
import { AppHeader } from "@/src/components/layout/AppHeader";
import { AppTabs } from "@/src/components/layout/AppTabs";
import { LoadingScreen } from "@/src/components/layout/LoadingScreen";
import { Snowfall } from "@/src/components/Snowfall";
import { useAppActions } from "@/src/hooks/useAppActions";
import { useAppState } from "@/src/hooks/useAppState";
import React from "react";
import { useState } from "react";
import { Toaster } from "sonner";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCozyMode, setIsCozyMode] = useState(true);

  // Centralized state management
  const appState = useAppState(selectedDate);

  // Centralized event handlers
  const handlers = useAppActions(appState, selectedDate);

  // Show auth page if not authenticated
  if (!appState.isAuthenticated && !appState.authLoading) {
    return (
      <>
        <AuthPage
          onSignIn={handlers.handleSignIn}
          onSignUp={handlers.handleSignUp}
          error={appState.authError}
          loading={appState.authLoading}
        />
        <Toaster position="top-center" />
      </>
    );
  }

  // Show loading state
  if (appState.authLoading || !appState.user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f1c34] via-[#1a2849] to-[#0f1c34] text-white">
      {isCozyMode && <Snowfall />}

      <AppHeader
        isCozyMode={isCozyMode}
        onToggleCozyMode={setIsCozyMode}
        onSignOut={handlers.handleSignOut}
      />

      <main className="container mx-auto px-4 py-6">
        <AppTabs
          appState={appState}
          handlers={handlers}
          selectedDate={selectedDate}
        />
      </main>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
