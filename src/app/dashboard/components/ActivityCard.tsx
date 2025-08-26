'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Session } from '@/lib/firestore';

interface ActivityCardProps {
  sessions: Session[];
  onLogSession: () => void;
}

export function ActivityCard({ sessions, onLogSession }: ActivityCardProps) {
  const hasData = sessions.length > 0;

  if (!hasData) {
    return (
      <Card className="card hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-ink-heading">Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-8">
            {/* Enhanced illustration */}
            <div className="mb-6">
              <div className="flex items-end justify-center gap-1 h-24 mb-3">
                {[...Array(7)].map((_, index) => {
                  // Generate varied heights for visual interest
                  const heights = [25, 40, 20, 55, 30, 45, 22];
                  const height = heights[index];
                  
                  return (
                    <div key={index} className="w-7 bg-white/8 rounded-t-sm transition-all duration-500 animate-pulse hover:bg-white/12" 
                         style={{ height: `${height}%` }}>
                    </div>
                  );
                })}
              </div>
              
              {/* Activity icon */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white/8 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              
              <p className="text-sm text-ink-muted">This week&apos;s activity will appear here</p>
            </div>
            
            {/* Softer, friendlier copy */}
            <p className="text-ink-muted text-sm mb-6 leading-relaxed max-w-sm mx-auto">
              No activity yet — start your first session to see progress!
            </p>
            
            <Button
              onClick={onLogSession}
              size="sm"
              className="bg-brand-teal hover:bg-brand-teal-hover text-white focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 transition-all duration-200 hover:translate-y-[-1px]"
            >
              Log Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Generate last 14 days data for the chart
  const generateLast14Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const last14Days = generateLast14Days();
  
  // Calculate minutes for each day
  const getMinutesForDay = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    const daySessions = sessions.filter(session => 
      session.date.toISOString().split('T')[0] === dateKey
    );
    
    const practice = daySessions.reduce((sum, session) => sum + session.minutes, 0);
    const matches = 0; // Placeholder for match data
    
    return { practice, matches };
  };

  const maxMinutes = Math.max(...last14Days.map(d => getMinutesForDay(d).practice), 60);
  
  // Calculate week total
  const weekTotal = last14Days.reduce((sum, date) => {
    const dayData = getMinutesForDay(date);
    return sum + dayData.practice + dayData.matches;
  }, 0);

  return (
    <Card className="card hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-ink-heading">Activity — Last 14 Days</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-5">
          {/* Chart */}
          <div className="h-40 flex items-end justify-between gap-1">
            {last14Days.map((date, index) => {
              const dayData = getMinutesForDay(date);
              const height = (dayData.practice / maxMinutes) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  {/* Bar */}
                  <div className="w-full max-w-7 relative group">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-500 ease-out hover:brightness-110 ${
                        dayData.practice > 0 
                          ? 'bg-gradient-to-t from-brand-teal to-brand-teal-hover' 
                          : 'bg-white/12'
                      }`}
                      style={{ height: `${Math.max(height, 2)}%` }}
                    />
                    
                    {/* Tooltip */}
                    {dayData.practice > 0 && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-s2 border border-white/12 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 min-w-[120px]">
                        <div className="text-xs font-medium text-ink-heading mb-2 text-center">
                          {date.toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                            <span className="text-ink-body">Practice: {dayData.practice}m</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-brand-coral"></div>
                            <span className="text-ink-body">Matches: {dayData.matches}m</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Date label - show every 3rd day only */}
                  <div className="mt-2 text-xs text-ink-muted text-center">
                    {index % 3 === 0 ? date.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    }) : ''}
                  </div>
                  
                  {/* Minutes label */}
                  {dayData.practice > 0 && (
                    <div className="mt-1 text-xs font-medium text-ink-body">
                      {dayData.practice}m
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm text-ink-muted">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand-teal rounded-sm"></div>
              <span>Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand-coral rounded-sm"></div>
              <span>Matches</span>
            </div>
          </div>
          
          {/* Week Total Badge */}
          <div className="mt-2 text-xs text-ink-muted text-center">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 hover:bg-white/10 transition-colors duration-200">
              <span className="h-2 w-2 rounded-full bg-brand-teal"></span>
              Week total: {weekTotal} min
            </span>
          </div>
          
          {/* View full history link */}
          <div className="text-center pt-2">
            <button className="text-brand-teal hover:brightness-110 font-medium text-sm transition-all duration-200 focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 rounded hover:underline">
              View full history →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


