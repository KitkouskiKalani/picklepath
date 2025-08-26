import { useState, useEffect } from 'react';
import { Session } from '@/lib/firestore';
import { subscribeToUserSessions } from '@/lib/firestore';
import { useAuth } from './useAuth';

export function useSessions(dateRange?: { start: Date; end: Date }) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSessions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const unsubscribe = subscribeToUserSessions(user.uid, (newSessions) => {
      setSessions(newSessions);
      setLoading(false);
    }, dateRange);

    return () => unsubscribe();
  }, [user, dateRange]);

  return { sessions, loading };
}

