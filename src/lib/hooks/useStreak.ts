import { useMemo } from 'react';
import { computeStreaks } from '@/lib/streak';
import { Session } from '@/lib/firestore';

export function useStreak(sessions: Session[]) {
  const streaks = useMemo(() => {
    return computeStreaks(sessions);
  }, [sessions]);

  return streaks;
}

