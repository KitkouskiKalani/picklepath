'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function UpcomingGoalsCard() {
  const goals = [
    {
      text: "Hit 4 sessions this week",
      progress: 2,
      target: 4,
      type: "sessions"
    },
    {
      text: "Record serve accuracy ≥ 70%",
      progress: 0,
      target: 70,
      type: "percentage"
    },
    {
      text: "Practice 3 different skills",
      progress: 1,
      target: 3,
      type: "count"
    }
  ];

  const getProgressColor = (progress: number, target: number) => {
    const percentage = progress / target;
    if (percentage >= 0.8) return 'text-green-600';
    if (percentage >= 0.5) return 'text-yellow-600';
    return 'text-slate-400';
  };

  const getProgressText = (goal: typeof goals[0]) => {
    if (goal.type === 'percentage') {
      return `${goal.progress}% / ${goal.target}%`;
    }
    return `${goal.progress} / ${goal.target}`;
  };

  return (
    <Card className="card hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-ink-heading flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-xs">🎯</span>
          </div>
          Upcoming Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-navy-s2 rounded-lg border border-white/12 hover:border-white/20 hover:bg-navy-s1 transition-all duration-200">
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-body">{goal.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-white/12 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.progress / goal.target >= 0.8 ? 'bg-green-500' :
                        goal.progress / goal.target >= 0.5 ? 'bg-yellow-500' : 'bg-white/20'
                      }`}
                      style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${getProgressColor(goal.progress, goal.target)}`}>
                    {getProgressText(goal)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
