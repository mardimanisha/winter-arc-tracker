import React from "react";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import { LogOut, Snowflake } from "lucide-react";

interface AppHeaderProps {
  isCozyMode: boolean;
  onToggleCozyMode: (value: boolean) => void;
  onSignOut: () => void;
}

/**
 * Application header component
 * Displays branding, cozy mode toggle, and sign out button
 */
export function AppHeader({
  isCozyMode,
  onToggleCozyMode,
  onSignOut,
}: AppHeaderProps) {
  return (
    <header className="border-b border-[#2d5080] bg-[#0f1c34]/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Snowflake className="text-blue-300" size={24} />
            <div>
              <h1 className="text-xl text-white flex items-center gap-2">
                <Snowflake className="text-blue-300" size={20} />
                Winter Arc Tracker
                <Snowflake className="text-blue-300" size={20} />
              </h1>
              <p className="text-sm text-blue-200">
                Build your winter arc — grow quietly, rise stronger
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1e3a5f] px-3 py-2 rounded-lg border border-[#2d5080]">
              <Snowflake className="text-blue-300" size={16} />
              <Label
                htmlFor="cozy-mode"
                className="text-sm text-white cursor-pointer"
              >
                Cozy Mode
              </Label>
              <Switch
                id="cozy-mode"
                checked={isCozyMode}
                onCheckedChange={onToggleCozyMode}
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              className="text-white hover:bg-[#2d5080]"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
