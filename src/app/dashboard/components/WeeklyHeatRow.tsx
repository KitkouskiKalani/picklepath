'use client';

import { useMemo } from 'react';
import { Session } from '@/lib/firestore';

interface WeeklyHeatRowProps {
  sessions: Session[];
}

export function WeeklyHeatRow({ sessions }: WeeklyHeatRowProps) {
  const weeklyData = useMemo(() => {
    const today = new Date();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      const daySessions = sessions.filter(session => {
        const sessionDateKey = session.date.toISOString().split('T')[0];
        return sessionDateKey === dateKey;
      });
      
      const totalMinutes = daySessions.reduce((sum, session) => sum + session.minutes, 0);
      weekData.push({ date, totalMinutes });
    }
    
    return weekData;
  }, [sessions]);

  const getIntensityColor = (minutes: number) => {
    if (minutes === 0) return 'bg-gray-100';
    if (minutes < 30) return 'bg-green-200';
    if (minutes < 60) return 'bg-green-400';
    if (minutes < 90) return 'bg-green-600';
    return 'bg-green-800';
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Last 7 Days</h3>
      <div className="flex space-x-2">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div
              className={`w-8 h-8 rounded ${getIntensityColor(day.totalMinutes)} border border-gray-200`}
              title={`${formatDate(day.date)}: ${day.totalMinutes} minutes`}
            />
            <span className="text-xs text-gray-500">{formatDate(day.date)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}














