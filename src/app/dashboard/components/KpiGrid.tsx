'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Session } from '@/lib/firestore';
import { SKILLS } from '@/lib/skills';

interface KpiGridProps {
  currentStreak: number;
  bestStreak: number;
  sessionsThisWeek: number;
  minutesThisWeek: number;
  skillFocus: string[];
}

export function KpiGrid({ 
  currentStreak, 
  bestStreak, 
  sessionsThisWeek, 
  minutesThisWeek,
  skillFocus 
}: KpiGridProps) {
  const defaultSkills = ['Serve', 'Consistency', 'Footwork'];
  const displaySkills = skillFocus.length > 0 ? skillFocus : defaultSkills;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Current Streak */}
      <Card className="card hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-2px] group border-white/8 hover:border-white/15">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-ink-heading flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">🔥</span>
            </div>
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {currentStreak > 0 ? (
            <>
              <p className="text-2xl font-bold text-[#22C55E] mb-1">{currentStreak}</p>
              <p className="text-xs text-ink-muted font-medium">days</p>
            </>
          ) : (
            <div className="space-y-1.5">
              <p className="text-base text-ink-muted font-medium">No streak yet</p>
              <p className="text-xs text-ink-muted leading-relaxed">Log your first 20-minute practice to start a streak</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Streak */}
      <Card className="card hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300 ease-in-out hover:translate-y-[-2px] group border-white/8 hover:border-white/15">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-ink-heading flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-gold to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">🏆</span>
            </div>
            Best Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-2xl font-bold text-[#22C55E] mb-1">{bestStreak}</p>
          <p className="text-xs text-ink-muted font-medium">days</p>
        </CardContent>
      </Card>

      {/* Sessions This Week */}
      <Card className="card hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-2px] group border-white/8 hover:border-white/15">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-ink-heading flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">📊</span>
            </div>
            Sessions This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-2xl font-bold text-[#22C55E] mb-1">{sessionsThisWeek}</p>
          <p className="text-xs text-ink-muted font-medium">{minutesThisWeek} total minutes</p>
        </CardContent>
      </Card>

      {/* Skill Focus */}
      <Card className="card hover:shadow-xl hover:shadow-brand-coral/10 transition-all duration-300 ease-in-out hover:translate-y-[-2px] group border-white/8 hover:border-white/15">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-ink-heading flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-coral to-red-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">🎯</span>
            </div>
            Skill Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {displaySkills.map((skill, index) => (
              <div key={index} className="inline-block bg-white/5 border border-white/12 text-ink-body px-2 py-1 rounded-md text-xs font-medium mr-1 mb-1 hover:bg-white/10 hover:border-white/20 transition-colors duration-200">
                {skill}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
