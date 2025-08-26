'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getUserPublicProfile } from '@/lib/firestore';
import { subscribeToUserSessions } from '@/lib/firestore';
import { useStreak } from '@/lib/hooks/useStreak';
import { Session } from '@/lib/firestore';

interface SharePageProps {
  params: {
    uid: string;
  };
}

export default function SharePage({ params }: SharePageProps) {
  const { uid } = params;
  const [userProfile, setUserProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { current, best } = useStreak(sessions);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load user profile
        const profile = await getUserPublicProfile(uid);
        setUserProfile(profile);

        // Subscribe to user sessions
        const unsubscribe = subscribeToUserSessions(uid, (newSessions) => {
          setSessions(newSessions);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error loading user data:', error);
        setLoading(false);
      }
    };

    loadUserData();
  }, [uid]);

  const getLast7DaysMinutes = () => {
    const today = new Date();
    let totalMinutes = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      const daySessions = sessions.filter(session => {
        const sessionDateKey = session.date.toISOString().split('T')[0];
        return sessionDateKey === dateKey;
      });
      
      totalMinutes += daySessions.reduce((sum, session) => sum + session.minutes, 0);
    }
    
    return totalMinutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              User Not Found
            </h3>
            <p className="text-gray-600">
              This user profile could not be found or is not public.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const last7DaysMinutes = getLast7DaysMinutes();
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏓 PicklePath Profile
          </h1>
          <p className="text-xl text-gray-600">
            {userProfile.displayName || 'Pickleball Player'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {current}
              </div>
              <div className="text-sm text-gray-500">Current Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {best}
              </div>
              <div className="text-sm text-gray-500">Best Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {last7DaysMinutes}
              </div>
              <div className="text-sm text-gray-500">Last 7 Days (min)</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {totalSessions}
              </div>
              <div className="text-sm text-gray-500">Total Sessions</div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Practice Time:</span>
                <span className="font-semibold">{totalMinutes} minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Session Length:</span>
                <span className="font-semibold">
                  {totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0} minutes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="font-semibold">
                  {userProfile.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {sessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.slice(0, 5).map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">
                        {session.focus.charAt(0).toUpperCase() + session.focus.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {session.date.toLocaleDateString()}
                      </span>
                    </div>
                    <span className="font-medium text-green-600">
                      {session.minutes}m
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Your Own PicklePath Journey!
            </h3>
            <p className="text-gray-600 mb-4">
              Track your progress, build streaks, and improve your pickleball game
            </p>
            <a
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Get Started
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}














