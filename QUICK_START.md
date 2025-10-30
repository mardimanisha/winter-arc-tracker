# Quick Start Guide - Winter Arc Tracker

## 🚀 Get Started in 5 Minutes

### Step 1: Clone and Install

```bash
cd winter-arc-tracker
npm install
```

### Step 2: Setup Supabase

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Wait for setup to complete

2. **Run Database Schema**
   - Open Supabase Dashboard → SQL Editor
   - Copy contents from `database/schema.sql`
   - Run the SQL script
   - Verify tables are created in Table Editor

### Step 3: Configure Environment

1. **Create `.env.local` file** in root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

2. **Get values from Supabase**:
   - Dashboard → Settings → API
   - Copy Project URL, anon key, and service_role key

See `ENV_SETUP.md` for detailed instructions.

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Step 5: Test the App

1. **Sign Up**
   - Create a new account
   - Use a valid email format

2. **Create a Habit**
   - Click "Add Habit"
   - Choose category (mind/body/skill)
   - Enter title and description

3. **Log Your Mood**
   - Select mood, energy, and focus levels (1-5)
   - Optionally add sleep hours and notes
   - Click "Save Mood"

4. **Write Journal Entry**
   - Type your thoughts for the day
   - Click "Save Journal"

5. **View Dashboard**
   - Check your progress
   - View analytics and streaks

## 📁 Project Structure

```
winter-arc-tracker/
├── app/api/              # API Routes (server-side)
├── src/
│   ├── components/       # React Components
│   ├── hooks/           # Custom Hooks
│   ├── services/        # Business Logic
│   └── types/           # TypeScript Types
├── database/            # Database Schema
└── *.md                 # Documentation
```

## 🎯 Features Available

- ✅ User Authentication (Sign Up/Sign In)
- ✅ Habit Tracking (Create, Update, Delete)
- ✅ Daily Habit Logging
- ✅ Mood Tracking (Mood, Energy, Focus, Sleep)
- ✅ Journal Entries
- ✅ Analytics Dashboard
- ✅ Progress Tracking
- ✅ Streak Calculations

---

**Ready to build your winter arc? Let's go! 🏔️❄️**
