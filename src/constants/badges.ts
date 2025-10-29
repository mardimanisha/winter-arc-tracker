// Badge definitions
// Following Open/Closed Principle: Easy to add new badges without modifying existing code

import type { Badge } from '../types/winter-arc.types';

export const BADGES: Badge[] = [
  {
    id: 'frost_focused',
    name: 'Frost Focused',
    description: 'Complete all habits for 7 consecutive days',
    icon: '❄️',
    requirement: '7_day_streak',
  },
  {
    id: 'winter_warrior',
    name: 'Winter Warrior',
    description: 'Complete all habits for 30 consecutive days',
    icon: '⚔️',
    requirement: '30_day_streak',
  },
  {
    id: 'consistency_penguin',
    name: 'Consistency Penguin',
    description: 'Log your mood for 14 consecutive days',
    icon: '🐧',
    requirement: '14_mood_entries',
  },
  {
    id: 'mindful_monk',
    name: 'Mindful Monk',
    description: 'Complete 20 journal entries',
    icon: '🧘',
    requirement: '20_journal_entries',
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete all habits before 12 PM for 5 days',
    icon: '🐦',
    requirement: 'early_completion',
  },
  {
    id: 'perfect_week',
    name: 'Perfect Week',
    description: 'Complete all daily activities (habits, mood, journal) for 7 days',
    icon: '⭐',
    requirement: 'perfect_week',
  },
  {
    id: 'habit_master',
    name: 'Habit Master',
    description: 'Create and maintain 3 active habits',
    icon: '🎯',
    requirement: '3_active_habits',
  },
  {
    id: 'summit_seeker',
    name: 'Summit Seeker',
    description: 'Reach 80% overall completion',
    icon: '🏔️',
    requirement: '80_percent_completion',
  },
  {
    id: 'winter_champion',
    name: 'Winter Champion',
    description: 'Complete your entire winter arc with 90%+ consistency',
    icon: '🏆',
    requirement: '90_percent_completion',
  },
];

export const getBadgeById = (badgeId: string): Badge | undefined => {
  return BADGES.find(badge => badge.id === badgeId);
};

export const checkBadgeRequirement = (
  requirement: string,
  userStats: {
    longestStreak?: number;
    moodEntryCount?: number;
    journalEntryCount?: number;
    activeHabitCount?: number;
    completionPercentage?: number;
  }
): boolean => {
  switch (requirement) {
    case '7_day_streak':
      return (userStats.longestStreak || 0) >= 7;
    case '30_day_streak':
      return (userStats.longestStreak || 0) >= 30;
    case '14_mood_entries':
      return (userStats.moodEntryCount || 0) >= 14;
    case '20_journal_entries':
      return (userStats.journalEntryCount || 0) >= 20;
    case '3_active_habits':
      return (userStats.activeHabitCount || 0) >= 3;
    case '80_percent_completion':
      return (userStats.completionPercentage || 0) >= 80;
    case '90_percent_completion':
      return (userStats.completionPercentage || 0) >= 90;
    default:
      return false;
  }
};
