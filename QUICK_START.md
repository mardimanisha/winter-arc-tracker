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

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `database/schema.sql` | Database schema with RLS |
| `SUPABASE_SETUP.md` | Complete setup guide |
| `ARCHITECTURE.md` | System architecture |
| `IMPLEMENTATION_SUMMARY.md` | What was built |
| `ENV_SETUP.md` | Environment variables guide |

## 🐛 Common Issues

### "RLS policy violation"
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set
- Restart dev server after adding env vars

### "Cannot find module"
- Run `npm install`
- Check all dependencies are installed

### "User not authenticated"
- Sign in first
- Check Supabase Auth is configured

### Database errors
- Verify schema is created in Supabase
- Check table names match exactly

## 📚 Next Steps

1. ✅ Read `SUPABASE_SETUP.md` for detailed setup
2. ✅ Review `ARCHITECTURE.md` to understand the system
3. ✅ Check `IMPLEMENTATION_SUMMARY.md` for what's built
4. ✅ Start building your winter arc!

## 🎯 Features Available

- ✅ User Authentication (Sign Up/Sign In)
- ✅ Habit Tracking (Create, Update, Delete)
- ✅ Daily Habit Logging
- ✅ Mood Tracking (Mood, Energy, Focus, Sleep)
- ✅ Journal Entries
- ✅ Analytics Dashboard
- ✅ Progress Tracking
- ✅ Streak Calculations

## 💡 Tips

- **One entry per day**: Mood and journal are unique per date
- **Soft deletes**: Habits are deactivated, not permanently deleted
- **Type safety**: All operations are type-checked
- **Secure**: RLS policies protect your data

## 🆘 Need Help?

1. Check troubleshooting in `SUPABASE_SETUP.md`
2. Review architecture in `ARCHITECTURE.md`
3. Verify environment variables in `ENV_SETUP.md`
4. Check browser console for errors
5. Check terminal for API errors

---

**Ready to build your winter arc? Let's go! 🏔️❄️**
