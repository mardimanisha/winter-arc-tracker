# ❄️ Winter Arc Tracker

**Build your winter arc before the year ends.**

A comprehensive 90-day personal growth tracker designed to help you turn winter into a focused arc of transformation. Track habits, mood, energy, and journal your journey from October through New Year's Day.

## 🎯 Features

### Core Features
- **🔥 Daily Rituals** - Track 3 core habits across Mind, Body, and Skill categories
- **🌙 Mood & Energy Tracker** - Log mood, energy, focus, and sleep daily
- **📖 Arc Journal** - Daily reflections and growth documentation
- **📊 Progress Analytics** - Comprehensive charts, streaks, and completion rates
- **🏔️ Story Mode** - Visual mountain climbing progress tracker
- **❄️ Cozy Mode** - Beautiful winter aesthetic with snow animations
- **⏳ Countdown** - Days remaining until New Year with consistency tracking
- **✨ Rewards System** - Earn badges like "Frost Focused," "Winter Warrior," "Consistency Penguin"

## 🏗️ Architecture

This application follows **SOLID principles** with a clean, layered architecture:

```
├── types/                      # Domain types and service interfaces
│   ├── winter-arc.types.ts    # Core domain models
│   └── services.interfaces.ts  # Service contracts (Interface Segregation)
│
├── services/                   # Business logic layer
│   ├── data-repository.service.ts  # Data access abstraction
│   ├── auth.service.ts        # Authentication operations
│   ├── habit.service.ts       # Habit management
│   ├── mood.service.ts        # Mood tracking
│   ├── journal.service.ts     # Journal operations
│   └── analytics.service.ts   # Analytics calculations
│
├── hooks/                      # React custom hooks
│   ├── useAuth.ts             # Authentication state
│   ├── useHabits.ts           # Habit state management
│   ├── useDailyTracking.ts    # Daily tracking state
│   └── useAnalytics.ts        # Analytics state
│
└── components/                 # UI components
    ├── AuthPage.tsx           # Authentication UI
    ├── HabitTracker.tsx       # Habit tracking UI
    ├── MoodTracker.tsx        # Mood logging UI
    ├── JournalSection.tsx     # Journal UI
    ├── AnalyticsDashboard.tsx # Analytics visualization
    ├── StoryMode.tsx          # Visual progress tracker
    └── CozyModeToggle.tsx     # Theme toggle with effects
```

## 🔧 SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each service handles one domain concept (habits, mood, journal, etc.)
- Each component has one clear responsibility
- Hooks manage specific pieces of state

### Open/Closed Principle (OCP)
- Services implement interfaces, making them extensible
- Easy to add new badge types without modifying existing code
- New analytics can be added without changing core services

### Liskov Substitution Principle (LSP)
- All services implement their respective interfaces
- Services can be swapped for different implementations (e.g., different data stores)

### Interface Segregation Principle (ISP)
- Separate interfaces for each service (IHabitService, IMoodService, etc.)
- Clients only depend on methods they use

### Dependency Inversion Principle (DIP)
- Services depend on IDataRepository abstraction, not concrete implementation
- Hooks depend on service interfaces, not concrete classes
- Easy to swap data layer (KV store, SQL, etc.)

## 🛠️ Tech Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Auth + Edge Functions + KV Store)
- **Charts**: Recharts
- **State Management**: Custom React hooks
- **Notifications**: Sonner
- **Icons**: Lucide React

## 🚀 Getting Started

1. **Sign Up** - Create an account to start your winter arc
2. **Create Habits** - Add 3 core habits across Mind, Body, and Skill
3. **Track Daily** - Log habits, mood, and journal each day
4. **Monitor Progress** - View analytics and your mountain climbing progress
5. **Earn Badges** - Unlock achievements as you build consistency

## 📊 Data Structure

The app uses a key-value store with the following key patterns:

- `user:{userId}` - User profile
- `habit:{habitId}` - Habit definition
- `habit_entry:{userId}:{date}:{habitId}` - Daily habit completion
- `mood:{userId}:{date}` - Daily mood entry
- `journal:{userId}:{date}` - Daily journal entry

## 🎨 Themes

### Cozy Mode
Toggle winter aesthetics including:
- Snowfall animation
- Winter gradient backgrounds
- Calming color palette
- Smooth transitions

## 📈 Analytics

Track your progress with:
- **Streaks** - Current and longest streaks per habit
- **Completion Rate** - Total habits completed
- **Consistency Percentage** - Overall completion rate
- **Mood Trends** - Mood visualization over time
- **Energy Correlation** - Relationship between habits and mood

## 🏆 Badge System

Earn badges for milestones:
- ❄️ **Frost Focused** - 7 day streak
- ⚔️ **Winter Warrior** - 30 day streak
- 🐧 **Consistency Penguin** - 14 mood entries
- 🧘 **Mindful Monk** - 20 journal entries
- 🏔️ **Summit Seeker** - 80% completion
- 🏆 **Winter Champion** - 90% completion

## 🔐 Security

- Secure authentication via Supabase Auth
- User data isolation
- Token-based API authentication
- No PII exposure to frontend

## 📝 License

Built with ❄️ for the Winter Arc community.
