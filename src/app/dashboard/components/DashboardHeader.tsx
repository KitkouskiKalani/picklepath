'use client';

import { Button } from '@/components/ui/Button';
import ProgressRing from '@/components/ui/ProgressRing';
import { useAuth } from '@/lib/hooks/useAuth';
import LogSessionButton from './LogSessionButton';

interface DashboardHeaderProps {
  weeklyProgress: number;
  weeklyGoal: number;
  currentStreak: number;
  onStartPlan: () => void;
}

export function DashboardHeader({ 
  weeklyProgress, 
  weeklyGoal, 
  currentStreak,
  onStartPlan
}: DashboardHeaderProps) {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(' ')[0] || 'Player';

  // Calculate progress percentage and remaining minutes
  const progressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);
  const remainingMinutes = Math.max(weeklyGoal - weeklyProgress, 0);

  // Adaptive motivational subline
  const getMotivationalMessage = () => {
    if (currentStreak === 0) {
      return "Start your first 20 min to begin your streak.";
    } else if (progressPercentage < 100) {
      return `You're ${remainingMinutes} min away from this week's target.`;
    } else {
      return "Great work! Keep the momentum going 🔥";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-s2 to-navy-s1 shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out hover:scale-[1.01]">
      {/* Court line pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,white_49%,white_51%,transparent_51%)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49%,white_49%,white_51%,transparent_51%)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Top row: greeting + streak pill */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Welcome back, {firstName} 👋
            </h1>
            
            {/* Premium streak chip */}
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                currentStreak > 0 
                  ? 'bg-white/10 border-white/20 text-ink-heading' 
                  : 'bg-white/5 border-white/10 text-ink-muted'
              }`}>
                <span className="text-lg">🔥</span>
                <span className="text-sm font-medium">
                  {currentStreak > 0 ? `${currentStreak} days` : '0 days'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-ink-body leading-relaxed font-light">
            Your coaching plan, streaks, and progress — all in one place.
          </p>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onStartPlan}
              size="lg"
              className="bg-brand-teal hover:bg-brand-teal-hover text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-brand-teal/25 focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 focus:ring-offset-navy-s2"
              aria-label="Continue guided coaching plan"
            >
              Continue Guided Coaching
            </Button>
          </div>
          
          {/* Progress Ring Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Progress Ring */}
            <div className="w-32 sm:w-40 animate-[fadeIn_300ms_ease]">
              <ProgressRing
                value={weeklyProgress}
                goal={weeklyGoal}
                size={160}
              />
            </div>
            
            {/* Motivational subline */}
            <p className="text-sm text-ink-muted text-center max-w-md leading-relaxed">
              {getMotivationalMessage()}
            </p>
            
                        {/* Log Session button */}
            <div className="pt-2">
              <LogSessionButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
