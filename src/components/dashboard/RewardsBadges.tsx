import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface RewardsBadgesProps {
  earnedBadges: number;
  totalBadges: number;
}

/**
 * Rewards and badges component
 * Displays badge progress and achievements
 */
export function RewardsBadges({
  earnedBadges,
  totalBadges,
}: RewardsBadgesProps) {
  return (
    <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Award className="text-yellow-400" size={20} />
          Rewards & Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <Award className="text-blue-300/30 mb-4" size={64} />
          <p className="text-blue-200 mb-2">
            Keep building your arc to unlock badges!
          </p>
          <div className="mt-4 text-center">
            <p className="text-2xl text-white">
              {earnedBadges} of {totalBadges} badges earned
            </p>
            <p className="text-sm text-blue-300 mt-1">
              Keep going to unlock more achievements!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
