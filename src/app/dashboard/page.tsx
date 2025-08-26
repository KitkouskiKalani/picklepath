'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessions } from '@/lib/hooks/useSessions';
import { useStreak } from '@/lib/hooks/useStreak';
import { useAuth } from '@/lib/hooks/useAuth';
import { NavBar } from '@/components/NavBar';
import { DashboardHeader } from './components/DashboardHeader';
import { TodayFocusCard } from './components/TodayFocusCard';
import { GoalsCard } from './components/GoalsCard';
import { ActivityCard } from './components/ActivityCard';
import { CoachingPlanCard } from './components/CoachingPlanCard';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { sessions, loading } = useSessions();
  const { current } = useStreak(sessions);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-base">
        <NavBar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <div className="h-40 bg-slate-200 rounded-3xl"></div>
            
            {/* Today's Focus skeleton */}
            <div className="h-32 bg-slate-200 rounded-2xl"></div>
            
            {/* Goals skeleton */}
            <div className="h-40 bg-slate-200 rounded-2xl"></div>
            
            {/* Activity skeleton */}
            <div className="h-48 bg-slate-200 rounded-2xl"></div>
            
            {/* Coaching Plan skeleton */}
            <div className="h-32 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate weekly data
  const getWeekStart = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  };

  const getLastWeekStart = () => {
    const weekStart = getWeekStart();
    const lastWeekStart = new Date(weekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    return lastWeekStart;
  };

  const weekStart = getWeekStart();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const lastWeekStart = getLastWeekStart();
  const lastWeekEnd = new Date(lastWeekStart);
  lastWeekEnd.setDate(lastWeekEnd.getDate() + 6);

  const sessionsThisWeek = sessions.filter(session => 
    session.date >= weekStart && session.date <= weekEnd
  );

  const sessionsLastWeek = sessions.filter(session => 
    session.date >= lastWeekStart && session.date <= lastWeekEnd
  );

  const minutesThisWeek = sessionsThisWeek.reduce((sum, session) => sum + session.minutes, 0);
  const minutesLastWeek = sessionsLastWeek.reduce((sum, session) => sum + session.minutes, 0);
  const weeklyGoal = 120; // Default weekly goal in minutes

  // Extract skill focus from recent sessions
  const recentSessions = sessions.slice(0, 5);
  const focusToDisplayName: Record<string, string> = {
    'drills': 'Drills',
    'matches': 'Matches',
    'serves': 'Serves',
    'dinks': 'Dinks',
    'footwork': 'Footwork',
    'strategy': 'Strategy'
  };
  const skillFocus = Array.from(new Set(recentSessions.map(session => focusToDisplayName[session.focus]))).slice(0, 3);

  // Handler functions
  const handleStartPlan = () => {
    router.push('/skills');
  };

  const handleOpenPlan = () => {
    // TODO: Navigate to full coaching plan
    console.log('Open plan clicked');
  };

  return (
    <div className="min-h-screen bg-navy-base">
      <NavBar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header/Hero Section */}
        <div className="mb-6 sm:mb-8">
          <DashboardHeader
            weeklyProgress={minutesThisWeek}
            weeklyGoal={weeklyGoal}
            currentStreak={current}
            onStartPlan={handleStartPlan}
          />
        </div>

        {/* Today's Focus */}
        <div className="mb-5 sm:mb-6">
          <TodayFocusCard skillFocus={skillFocus} />
        </div>

        {/* Your Goals */}
        <div className="mb-5 sm:mb-6">
          <GoalsCard />
        </div>

        {/* Activity */}
        <div className="mb-5 sm:mb-6">
          <ActivityCard sessions={sessions} onLogSession={() => {}} />
        </div>

        {/* Coaching Plan */}
        <div className="mb-5 sm:mb-6">
          <CoachingPlanCard onOpenPlan={handleOpenPlan} />
        </div>
      </div>
    </div>
  );
}


