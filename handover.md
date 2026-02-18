# HANDOVER.md — TaskMaster

### Bug Fixes

1. **Memory leak** — Removed `requestMetrics` Map and `trackRequest()` function that stored ~2MB per request with no cleanup
2. **POST validation** — Added input validation for required `text` field, returns 400 on invalid input
3. **PUT validation** — Returns 404 when todo ID doesn't exist (handles Supabase `PGRST116` error code from `.single()`)
4. **DELETE safety** — Validates ID parameter, returns 404 if todo not found (same `PGRST116` handling)
5. **Artificial latency** — Removed `setTimeout` delay in GET handler
6. **Race conditions** — Added `AbortController` to `useEffect` fetch with cleanup on unmount
7. **Optimistic UI rollbacks** — All 5 mutation functions (`addTodo`, `toggleTodo`, `deleteTodo`, `saveEdit`, `updateTodoPriority`) save previous state, attempt the request, and roll back on failure with toast error notifications
8. **Persistence** — Solved with database migration

### Containerization

- `Dockerfile` build + production stages
- `docker-compose.yml` with Supabase env vars passed as build args

### Performance Optimization

- **Debounced search** — 300ms debounce on search input to prevent API calls on every keystroke
- **API pagination** — Server-side pagination with `page` and `limit` query params, `Load more` button on frontend
- **ESLint** — Configured with `typescript-eslint` for code quality
- **Rate limiting** — In-memory rate limiter (30 requests/minute per user) on all API endpoints, returns 429 when exceeded
- **Toast notifications** — Error toasts on all failed mutations with rollback, success toast on sign out (using `sonner`)
- **Code cleanup** — Extracted `mapTodo()` helper to eliminate repeated field mapping, shared types in `lib/types.ts`, UI split into 6 components

### Database

- Migrated to Supabase
- API routes rewritten to use Supabase query builder
- Field mapping via `mapTodo()` helper between snake_case (database) and camelCase (frontend API contract)

### Authentication

- Supabase Auth with email/password signup and login
- Server-side auth client with cookie-based sessions (`@supabase/ssr`)
- Next.js middleware for automatic session refresh and route protection
- Row Level Security (RLS) — Each user can only CRUD their own todos
- Sign out button with success toast
- Login page with toggle between sign in and sign up

### Realtime

- Supabase Broadcast — API routes broadcast a refresh event after every mutation (POST, PUT, DELETE)
- Frontend subscribes to broadcast channel and refetches data when events arrive

---

## Remaining Work

#### Replace Manual Fetch with TanStack Query (React Query)

- The current optimistic update pattern manually saves previous state, makes the request, and rolls back on failure in every mutation function. This works but is repetitive and doesn't handle caching, deduplication, or retries. This is directly related to the original memory leak bug — the `requestMetrics` Map was a misguided attempt at "request deduplication and caching" that TanStack Query solves properly.

---

#### Email Confirmation Flow

- Currently Supabase Auth is configured with email/password but the email confirmation flow is very basic with email/password being the only possible way of registering/login. A proper flow would include a confirmation callback route and allow the user to choose from login via Gmail etc.

---

#### Testing
- Currently there are no tests. Add integration tests for all endpoints (for success, errors, rate limits and unauth access). Add unit tests for add/toggle/delete/edit features, filter changes, etc.

## Database Schema

```sql
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium',
  category TEXT DEFAULT 'other',
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  user_id UUID REFERENCES auth.users(id)
);

-- RLS policies ensure each user only accesses their own todos
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own todos" ON todos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own todos" ON todos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own todos" ON todos FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own todos" ON todos FOR DELETE TO authenticated USING (auth.uid() = user_id);
```