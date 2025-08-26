You are Cursor Composer. Create a Next.js 14 (App Router) + Tailwind + shadcn/ui scaffold for an app named “PicklePath” using Firebase client SDK already configured at src/lib/firebase/firebase.ts. Do not add server-only Firebase Admin.

Goals
- Marketing landing page
- Auth (email/password + Google)
- Protected dashboard
- Session logging (minutes, date, focus, issues, wentWell, notes)
- Streak + last 7 days view
- Courses placeholder
- Public share page with OG image

Tech
- Next.js App Router in /app
- Client auth guard (redirect to /login when unauthenticated)
- Firestore reads/writes with optimistic UI
- Tailwind + shadcn/ui
- Reusable hooks in src/hooks

Create/modify files

/app/layout.tsx
- Base layout with Tailwind, <Toaster /> for toasts.

/app/page.tsx
- Landing page: hero, features, CTA to /login.

/app/login/page.tsx
- Login form (email/password) + “Continue with Google”.
- On success: push('/dashboard').

/app/signup/page.tsx
- Sign-up form (email/password) + link to login.

/app/dashboard/page.tsx (protected)
/app/dashboard/components/WeeklyHeatRow.tsx
- Shows: 🔥 current streak, 🏆 best streak, last 7 days total minutes, “Log Session” button.

/app/sessions/page.tsx (protected)
/app/sessions/components/NewSessionDrawer.tsx
- Drawer form: date (default today), minutes (number), focus (select: drills|matches|serves|dinks|footwork|strategy), issues (tag input), wentWell (tag input), notes (textarea).
- On submit: write to Firestore, optimistic update, toast success.

/app/courses/page.tsx (protected)
- Categories: Beginner Foundations, Consistency, Spin, Power.
- Checkbox progress stored at users/{uid}/courseProgress.

/app/share/[uid]/page.tsx
- Public read-only card with username, current streak, last 7 days minutes.
- Add /app/share/og/route.ts for OG image (static placeholder ok).

/app/(protected)/layout.tsx
- Wraps protected routes; uses <AuthGuard>.

/components/AuthGuard.tsx
- Client component: listens to firebase auth; if no user after initial check, redirect('/login').

/components/NavBar.tsx
- App nav with links to Dashboard, Sessions, Courses, Share.

/src/hooks/useUser.ts
- Returns { user, loading } via onAuthStateChanged.

/src/hooks/useSessions.ts
- subscribe to sessions by uid with optional date range.

/src/hooks/useStreak.ts
- computes current and best streak based on sessions (a “day counts” if minutes >= 20).

/src/lib/firestore.ts
- helpers: addSession, getUserPublicProfile, upsertCourseProgress.

/src/lib/streak.ts
- pure functions: datesEqualByTZ, computeDailyBuckets, computeStreaks.

/src/components/ui/* 
- Use shadcn/ui primitives for Button, Input, Card, Drawer, Separator, Badge.

Firestore model (create with these shapes)
- users/{uid}: { displayName?: string, createdAt: serverTimestamp() }
- sessions/{autoId}: { uid, date: Timestamp, minutes: number, focus: "drills"|"matches"|"serves"|"dinks"|"footwork"|"strategy", issues: string[], wentWell: string[], notes: string[] }
- streaks/{uid}: { current: number, best: number, updatedAt: Timestamp }

Behavior details
- After addSession: recompute streaks locally with useStreak; optionally write to streaks/{uid}.
- WeeklyHeatRow renders 7 squares using last 7 daily totals.
- Share page reads sessions by uid (public read ok for demo).
- Minimal styling, mobile-first, clean spacing.

Routing
- Public: /, /login, /signup, /share/[uid]
- Protected: /dashboard, /sessions, /courses

Finish by ensuring:
- All imports resolve.
- No server-side Firebase usage.
- Builds and runs with `pnpm dev`.
