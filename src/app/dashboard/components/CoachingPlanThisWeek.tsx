'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface CoachingPlanThisWeekProps {
  onOpenPlan: () => void;
}

export function CoachingPlanThisWeek({ onOpenPlan }: CoachingPlanThisWeekProps) {
  const planSteps = [
    {
      icon: '📚',
      title: 'Structured Video Lessons',
      description: 'Watch 2 lessons (10–12 min each)',
      progress: { completed: 0, total: 2 },
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '🎯',
      title: 'Targeted Practice',
      description: '2× 30-min drills: accuracy + footwork',
      progress: { completed: 0, total: 2 },
      color: 'from-teal-500 to-emerald-600'
    },
    {
      icon: '🏆',
      title: 'Match Play Challenge',
      description: 'Play 1–2 sets; log notes',
      progress: { completed: 0, total: 1 },
      color: 'from-coral-500 to-red-500'
    }
  ];

  return (
    <Card className="card hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-ink-heading">This Week&apos;s Coaching Plan</CardTitle>
          <Button
            onClick={onOpenPlan}
            variant="outline"
            size="sm"
            className="border-brand-teal text-brand-teal hover:bg-brand-teal/10 focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 transition-all duration-200 hover:translate-y-[-1px]"
          >
            Open Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-5">
          {/* Plan Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="relative z-10 bg-navy-s2 rounded-xl border border-white/12 p-4 hover:shadow-md hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:border-white/20 group">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <span className="text-white text-base">{step.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-ink-heading mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-ink-body mb-3 leading-relaxed">{step.description}</p>
                  
                  {/* Progress Pill */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    step.progress.completed === 0 
                      ? 'bg-white/5 text-ink-muted border border-white/12'
                      : step.progress.completed === step.progress.total
                      ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                      : 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20'
                  }`}>
                    <span>{step.progress.completed}/{step.progress.total}</span>
                    <span>done</span>
                  </div>
                </div>
                
                {/* Progress Node */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white/20 transition-all duration-300 ${
                  step.progress.completed === 0 
                    ? 'bg-white/20'
                    : step.progress.completed === step.progress.total
                    ? 'bg-brand-gold border-brand-gold'
                    : 'bg-brand-teal border-brand-teal'
                }`} />
              </div>
            ))}
          </div>
          
          {/* Horizontal Connector Line (Desktop) */}
          <div className="hidden md:block relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
            {/* Position connector line under the progress nodes */}
            <div className="absolute top-0 left-1/6 right-1/6 h-px bg-white/10" />
          </div>
          
          {/* Vertical Connector Lines (Mobile) */}
          <div className="md:hidden space-y-4">
            {planSteps.slice(0, -1).map((_, index) => (
              <div key={index} className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-4 bg-white/10" />
              </div>
            ))}
          </div>
          
          {/* Empty state message */}
          <div className="text-center py-5 bg-navy-s1 rounded-xl border border-white/12 hover:border-white/20 transition-colors duration-200">
            <div className="text-3xl mb-2">🎾</div>
            <p className="text-ink-body mb-3 text-sm">Your plan unlocks after onboarding.</p>
            <Button
              onClick={onOpenPlan}
              size="sm"
              className="bg-brand-teal hover:bg-brand-teal-hover text-white focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 transition-all duration-200 hover:translate-y-[-1px]"
            >
              Start now →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
