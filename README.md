# ❄️ Winter Arc Tracker

> **Transform your winter into your most productive season yet.**

A personal development app for tracking habits, mood, energy, and daily reflections during your winter transformation journey.

---

## 🌟 What is This?

Winter Arc Tracker helps you build lasting habits and track your progress through:

- **Habit Tracking** - Track Mind, Body, and Skill habits with streak calculation
- **Mood & Energy Logging** - Monitor daily mood, energy, focus, and sleep patterns
- **Daily Journal** - Write and review daily reflections
- **Analytics Dashboard** - Visualize progress with charts and statistics
- **Story Mode** - View your journey as a narrative with milestones

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19.2, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth), Next.js API Routes
- **Security**: Row Level Security (RLS), JWT authentication

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `database/schema.sql` in Supabase SQL Editor
3. Get your API keys from Settings → API

### 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
winter-arc-tracker/
├── app/
│   ├── api/              # API routes (habits, mood, journal)
│   └── page.tsx          # Main app page
├── src/
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks (useAuth, useHabits, etc.)
│   ├── services/         # Business logic (API calls)
│   ├── types/            # TypeScript definitions
│   └── utils/            # Supabase client
├── database/
│   └── schema.sql        # Database schema
└── components/ui/        # shadcn/ui components
```

---

## 📚 Key Features

### Habit Tracking
- Create habits in Mind/Body/Skill categories
- Daily completion tracking with notes
- Automatic streak calculation

### Mood & Energy
- Log mood, energy, focus (1-5 scale)
- Track sleep hours
- Visualize trends over time

### Analytics
- Completion rate statistics
- Streak tracking per habit
- Mood and energy trend charts
- Consistency percentage

---

## 🔌 API Endpoints

- `GET/POST /api/habits` - Manage habits
- `GET/POST /api/habit-entries` - Track daily completions
- `GET/POST /api/mood-entries` - Log mood/energy
- `GET/POST /api/journal-entries` - Save journal entries

All endpoints require `userId` and use Supabase RLS for security.

---

## 🗄️ Database

**Tables:**
- `habits` - User habits with categories
- `habit_entries` - Daily habit completions
- `mood_entries` - Daily mood/energy logs
- `journal_entries` - Daily journal content

**Security:** Row Level Security enabled on all tables. Users can only access their own data.

See [database/schema.sql](./database/schema.sql) for complete schema.

---

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture and design patterns
- **[QUICK_START.md](./QUICK_START.md)** - Step-by-step setup guide

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow TypeScript strict mode and ESLint rules
4. Submit a pull request

---

**Built with ❄️ for winter transformation. Start your arc today! 🏔️**
