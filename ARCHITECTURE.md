# Winter Arc Tracker - Architecture Documentation

## 📐 System Architecture

### Overview

The Winter Arc Tracker follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                    │
│  React Components (src/components/*)                         │
│  - AuthPage, HabitTracker, MoodTracker, JournalEditor       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      Application Layer                       │
│  Custom Hooks (src/hooks/*)                                  │
│  - useAuth, useHabits, useDailyTracking, useAnalytics       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                       Service Layer                          │
│  Services (src/services/*)                                   │
│  - HabitService, MoodService, JournalService, AuthService   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                         API Layer                            │
│  Next.js API Routes (app/api/*)                              │
│  - /api/habits, /api/mood-entries, /api/journal-entries     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                       Data Layer                             │
│  Supabase (PostgreSQL + Auth)                                │
│  - Database Tables, RLS Policies, Auth                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

### Sign Up Process

```
User Input → AuthPage → useAuth.signUp() → AuthService.signUp()
    ↓
Supabase Auth (creates user)
    ↓
Auto Sign In → Store user in localStorage
    ↓
Redirect to Main App
```

### Sign In Process

```
User Input → AuthPage → useAuth.signIn() → AuthService.signIn()
    ↓
Supabase Auth (validates credentials)
    ↓
Store user + token in localStorage
    ↓
Update app state → Redirect to Main App
```

### Session Management

- **Client-side**: User object stored in `localStorage` as fallback
- **Server-side**: Session validated via Supabase Auth
- **Token**: Access token stored for API calls (future enhancement)

---

## 📊 Data Flow Examples

### Creating a Habit

```
1. User clicks "Create Habit" button
   ↓
2. HabitTracker component calls handler
   ↓
3. useAppActions.handleCreateHabit() invoked
   ↓
4. useHabits.createHabit() called with (category, title, description)
   ↓
5. HabitService.createHabit() makes fetch call
   ↓
6. POST /api/habits with { userId, category, title, description }
   ↓
7. API route validates input
   ↓
8. createSupabaseAdminClient() used (service role)
   ↓
9. Insert into habits table
   ↓
10. Return created habit
   ↓
11. Update local state in useHabits
   ↓
12. UI re-renders with new habit
```

### Logging Mood Entry

```
1. User selects mood levels and clicks "Save"
   ↓
2. MoodTracker component calls handler
   ↓
3. useDailyTracking.logMood() called
   ↓
4. MoodService.createMoodEntry() makes fetch call
   ↓
5. POST /api/mood-entries with { userId, date, mood, energy, focus, sleep, notes }
   ↓
6. API route validates mood levels (1-5)
   ↓
7. Upsert into mood_entries table (handles duplicates)
   ↓
8. Return mood entry
   ↓
9. Update local state
   ↓
10. UI shows success message
```

---

## 🗂️ File Structure

```
winter-arc-tracker/
├── app/
│   ├── api/                          # Next.js API Routes
│   │   ├── habits/
│   │   │   ├── route.ts             # GET, POST /api/habits
│   │   │   └── [id]/route.ts        # PATCH, DELETE /api/habits/:id
│   │   ├── habit-entries/
│   │   │   └── route.ts             # GET, POST /api/habit-entries
│   │   ├── mood-entries/
│   │   │   ├── route.ts             # GET, POST /api/mood-entries
│   │   │   └── [id]/route.ts        # PATCH, DELETE /api/mood-entries/:id
│   │   └── journal-entries/
│   │       ├── route.ts             # GET, POST /api/journal-entries
│   │       └── [id]/route.ts        # PATCH, DELETE /api/journal-entries/:id
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/                   # React Components
│   │   ├── AuthPage.tsx             # Authentication UI
│   │   ├── HabitTracker.tsx         # Habit management
│   │   ├── MoodTracker.tsx          # Mood logging
│   │   ├── JournalEditor.tsx        # Journal writing
│   │   └── layout/                  # Layout components
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useAuth.ts               # Authentication state
│   │   ├── useHabits.ts             # Habits state
│   │   ├── useDailyTracking.ts      # Daily data state
│   │   ├── useAnalytics.ts          # Analytics state
│   │   ├── useAppState.ts           # Centralized state
│   │   └── useAppActions.ts         # Centralized actions
│   ├── services/                     # Business Logic Layer
│   │   ├── auth.service.ts          # Authentication operations
│   │   ├── habit.service.ts         # Habit CRUD operations
│   │   ├── mood.service.ts          # Mood CRUD operations
│   │   ├── journal.service.ts       # Journal CRUD operations
│   │   └── analytics.service.ts     # Analytics calculations
│   ├── types/                        # TypeScript Definitions
│   │   ├── database.ts              # Supabase database types
│   │   ├── winter-arc.types.ts      # Application domain types
│   │   ├── app-state.ts             # App state types
│   │   └── services.interfaces.ts   # Service interfaces
│   ├── utils/                        # Utility Functions
│   │   └── supabase/
│   │       └── client.ts            # Supabase client factory
│   └── supabase/
│       └── server/
│           └── adminClient.ts       # Admin client (service role)
├── database/
│   └── schema.sql                    # Complete database schema
├── SUPABASE_SETUP.md                 # Setup guide
├── ARCHITECTURE.md                   # This file
└── README.md
```

---

## 🎯 Design Principles

### 1. Single Responsibility Principle (SRP)

Each module has one clear purpose:
- **Services**: Handle API communication
- **Hooks**: Manage state and side effects
- **Components**: Render UI and handle user interactions
- **API Routes**: Validate requests and interact with database

### 2. Dependency Inversion

- High-level modules (components) don't depend on low-level modules (database)
- Both depend on abstractions (services, hooks)
- Services implement interfaces defined in `types/services.interfaces.ts`

### 3. Don't Repeat Yourself (DRY)

- Centralized state management in `useAppState`
- Centralized event handlers in `useAppActions`
- Reusable service classes
- Shared type definitions

### 4. Type Safety

- Strict TypeScript throughout
- Database types match application types
- No `any` types in production code
- Proper error handling with typed errors

### 5. Security First

- RLS policies on all tables
- Service role key only used server-side
- User authentication required for all operations
- Input validation in API routes

---

## 🔄 State Management

### Centralized State (useAppState)

```typescript
const appState = {
  // Authentication
  user: User | null,
  isAuthenticated: boolean,
  authLoading: boolean,
  authError: string | null,
  
  // Habits
  habits: Habit[],
  habitsLoading: boolean,
  
  // Daily Tracking
  habitEntries: HabitEntry[],
  moodEntry: MoodEntry | null,
  journalEntry: JournalEntry | null,
  
  // Analytics
  analytics: AnalyticsData,
  
  // Derived State
  dateString: string,
  stats: AppStats,
}
```

### State Updates

1. **Optimistic Updates**: Local state updated immediately
2. **Server Sync**: API call made in background
3. **Error Handling**: Rollback on failure
4. **Refresh**: Manual refresh available via `refresh()` function

---

## 🔌 API Design

### REST Principles

All API routes follow RESTful conventions:

- **GET**: Retrieve resources
- **POST**: Create resources
- **PATCH**: Update resources (partial)
- **DELETE**: Remove resources

### Request/Response Format

**Request:**
```json
{
  "userId": "uuid",
  "date": "2024-01-15",
  "mood": "4",
  "energy": "3",
  "focus": "5"
}
```

**Success Response:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "date": "2024-01-15",
  "mood": "4",
  "energy": "3",
  "focus": "5",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Error Response:**
```json
{
  "error": "userId is required"
}
```

### Error Handling

- **400**: Bad Request (validation errors)
- **500**: Internal Server Error (database errors)
- Detailed error messages in development
- Generic messages in production

---

## 📈 Performance Considerations

### Database Optimization

- **Indexes**: Created on frequently queried columns
- **Unique Constraints**: Prevent duplicate entries
- **Soft Deletes**: Preserve data integrity

### Client-Side Optimization

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Expensive calculations cached
- **Debouncing**: API calls throttled

### Caching Strategy

- **Local State**: Recent data cached in React state
- **localStorage**: User session persisted
- **Future**: Add React Query for advanced caching

---

## 🧪 Testing Strategy

### Unit Tests (Future)

- Service methods
- Utility functions
- Type validators

### Integration Tests (Future)

- API routes
- Database operations
- Authentication flow

### E2E Tests (Future)

- User workflows
- Critical paths
- Error scenarios

---

## 🚀 Deployment

### Environment Variables

Required in production:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Build Process

```bash
npm run build
npm start
```

### Recommended Platforms

- **Vercel**: Optimal for Next.js
- **Netlify**: Alternative option
- **Railway**: Full-stack deployment

---

## 🔮 Future Enhancements

### Planned Features

1. **Real-time Updates**: Supabase Realtime subscriptions
2. **Offline Support**: Service Workers + IndexedDB
3. **Push Notifications**: Habit reminders
4. **Social Features**: Share progress, compete with friends
5. **Advanced Analytics**: ML-based insights
6. **Export Data**: PDF reports, CSV downloads

### Technical Improvements

1. **React Query**: Advanced caching and synchronization
2. **Zod**: Runtime type validation
3. **Storybook**: Component documentation
4. **Playwright**: E2E testing
5. **Sentry**: Error tracking
6. **Vercel Analytics**: Performance monitoring

---

## 📝 Contributing Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive commit messages

### Pull Request Process

1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit PR with description

### Code Review Checklist

- [ ] Types are properly defined
- [ ] Error handling is comprehensive
- [ ] No console.logs in production
- [ ] Documentation is updated
- [ ] Tests pass
- [ ] No security vulnerabilities

---

## 📞 Support

For issues or questions:
1. Check `SUPABASE_SETUP.md` for setup help
2. Review this architecture doc for design decisions
3. Check Supabase documentation
4. Open an issue on GitHub

---

**Last Updated**: 2024-01-15
**Version**: 1.0.0
