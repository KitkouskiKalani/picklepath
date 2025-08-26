'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/IconTile';
import { useState, useEffect } from 'react';

export function GoalsCard() {
  const todayGoals = [
    {
      text: "Record 10 serves today",
      progress: 3,
      target: 10,
      type: "count",
      icon: "🏓"
    },
    {
      text: "Practice footwork drills",
      progress: 1,
      target: 1,
      type: "count",
      icon: "👣"
    }
  ];

  const weekGoals = [
    {
      text: "Complete 2 guided sessions",
      progress: 1,
      target: 2,
      type: "count",
      icon: "⭐️"
    },
    {
      text: "Hit 4 sessions this week",
      progress: 2,
      target: 4,
      type: "count",
      icon: "📊"
    },
    {
      text: "Record serve accuracy ≥ 70%",
      progress: 0,
      target: 70,
      type: "percentage",
      icon: "🎯"
    }
  ];

  const hasTodayGoals = todayGoals.some(g => g.progress > 0);
  const [activeTab, setActiveTab] = useState<'today' | 'week'>(hasTodayGoals ? 'today' : 'week');

  // Update tab if goals change
  useEffect(() => {
    if (hasTodayGoals && activeTab !== 'today') {
      setActiveTab('today');
    } else if (!hasTodayGoals && activeTab !== 'week') {
      setActiveTab('week');
    }
  }, [hasTodayGoals, activeTab]);

  const getProgressColor = (progress: number, target: number) => {
    const percentage = progress / target;
    if (percentage >= 0.8) return 'text-green-500';
    if (percentage >= 0.5) return 'text-yellow-500';
    return 'text-ink-muted';
  };

  const getProgressText = (goal: typeof todayGoals[0]) => {
    if (goal.type === 'percentage') {
      return `${goal.progress}% / ${goal.target}%`;
    }
    return `${goal.progress} / ${goal.target}`;
  };

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  const activeGoals = activeTab === 'today' ? todayGoals : weekGoals;

  return (
    <Card className="card hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-ink-heading">Your Goals</CardTitle>
          
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'today'
                  ? 'bg-white/10 text-ink-heading'
                  : 'text-ink-muted hover:text-ink-body'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'week'
                  ? 'bg-white/10 text-ink-heading'
                  : 'text-ink-muted hover:text-ink-body'
              }`}
            >
              This Week
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {activeGoals.map((goal, index) => {
            const progressPercentage = getProgressPercentage(goal.progress, goal.target);
            const isCompleted = progressPercentage >= 100;
            
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-navy-s2 rounded-lg border border-white/12 hover:border-white/20 hover:bg-navy-s1 transition-all duration-200 min-h-[44px]">
                {/* Icon */}
                <IconTile icon={<span className="text-base">{goal.icon}</span>} size="md" />
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-body mb-2">{goal.text}</p>
                  
                  {/* Progress bar */}
                  <div className="relative h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-brand-gold' 
                          : progressPercentage > 0 
                          ? 'bg-brand-teal' 
                          : 'bg-white/8'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                      role="progressbar"
                      aria-valuenow={goal.progress}
                      aria-valuemin={0}
                      aria-valuemax={goal.target}
                      aria-label={`Progress for ${goal.text}`}
                    />
                  </div>
                </div>
                
                {/* Progress label */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-medium ${getProgressColor(goal.progress, goal.target)}`}>
                    {getProgressText(goal)}
                  </span>
                  
                  {/* Completion check */}
                  {isCompleted && (
                    <div className="w-4 h-4 rounded-full bg-brand-gold flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Empty state */}
          {activeGoals.length === 0 && (
            <div className="text-center py-6">
              <p className="text-ink-muted text-sm mb-3">No {activeTab === 'today' ? 'daily' : 'weekly'} goals set yet.</p>
              <button className="text-brand-teal hover:brightness-110 font-medium text-sm transition-colors focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 rounded hover:underline">
                Set your first goal →
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
