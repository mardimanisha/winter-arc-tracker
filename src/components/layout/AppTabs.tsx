import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import type { AppState } from "../../types/app-state";
import { DashboardTab } from "../tabs/DashboardTab";
import { DailyRitualsTab } from "../tabs/DailyRitualsTab";
import { JournalTab } from "../tabs/JournalTab";
import { StoryModeTab } from "../tabs/StoryModeTab";
import { AnalyticsTab } from "../tabs/AnalyticsTab";

interface AppTabsProps {
  appState: AppState;
  handlers: {
    handleCreateHabit: (
      category: any,
      title: string,
      description?: string
    ) => Promise<void>;
    handleToggleHabit: (habitId: string, completed: boolean) => Promise<void>;
    handleSaveMood: (
      mood: any,
      energy: any,
      focus: any,
      sleep?: number,
      notes?: string
    ) => Promise<void>;
    handleSaveJournal: (content: string) => Promise<void>;
  };
  selectedDate: Date;
}

/**
 * Main tabs navigation component
 * Organizes the application into distinct sections
 */
export function AppTabs({ appState, handlers, selectedDate }: AppTabsProps) {
  return (
    <Tabs defaultValue="dashboard" className="space-y-6">
      <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 bg-[#1e3a5f] border border-[#2d5080]">
        <TabsTrigger
          value="dashboard"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200"
        >
          Dashboard
        </TabsTrigger>
        <TabsTrigger
          value="daily"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200"
        >
          Daily Rituals
        </TabsTrigger>
        <TabsTrigger
          value="journal"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200"
        >
          Journal
        </TabsTrigger>
        <TabsTrigger
          value="story"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200"
        >
          Story Mode
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200"
        >
          Analytics
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <DashboardTab appState={appState} />
      </TabsContent>

      <TabsContent value="daily">
        <DailyRitualsTab
          appState={appState}
          onCreateHabit={handlers.handleCreateHabit}
          onToggleHabit={handlers.handleToggleHabit}
          onSaveMood={handlers.handleSaveMood}
        />
      </TabsContent>

      <TabsContent value="journal">
        <JournalTab
          appState={appState}
          onSaveJournal={handlers.handleSaveJournal}
        />
      </TabsContent>

      <TabsContent value="story">
        <StoryModeTab appState={appState} />
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsTab appState={appState} />
      </TabsContent>
    </Tabs>
  );
}
