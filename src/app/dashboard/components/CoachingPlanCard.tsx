'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface CoachingPlanCardProps {
  onOpenPlan: () => void;
}

export function CoachingPlanCard({ onOpenPlan }: CoachingPlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
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

  const totalCompleted = planSteps.reduce((sum, step) => sum + step.progress.completed, 0);
  const totalTasks = planSteps.reduce((sum, step) => sum + step.progress.total, 0);

  return (
    <Card className="card hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-ink-heading">Your Coaching Plan</CardTitle>
            <p className="text-sm text-ink-muted font-light">A guided path from 0 → 4.0 at your pace.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Progress summary with horizontal bar */}
            <div className="text-right min-w-[120px]">
              <div className="text-sm text-ink-muted mb-2">Progress</div>
              
              {/* Horizontal progress bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-brand-teal to-brand-teal-hover h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalCompleted / totalTasks) * 100, 100)}%` }}
                  role="progressbar"
                  aria-valuenow={totalCompleted}
                  aria-valuemin={0}
                  aria-valuemax={totalTasks}
                  aria-label="Coaching plan progress"
                />
              </div>
              
              <div className="text-lg font-semibold text-ink-heading">
                {totalCompleted} / {totalTasks} modules done
              </div>
            </div>
            
            {/* Expand/collapse button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 h-auto text-ink-muted hover:text-ink-body hover:bg-white/5"
              aria-label={isExpanded ? "Hide details" : "Show details"}
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {!isExpanded ? (
          /* Collapsed view */
          <div className="space-y-4">
            <div className="text-center py-4">
              <Button
                onClick={onOpenPlan}
                size="lg"
                className="bg-brand-teal hover:bg-brand-teal-hover text-white focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 transition-all duration-200 hover:translate-y-[-1px]"
              >
                Continue Guided Coaching
              </Button>
            </div>
          </div>
        ) : (
          /* Expanded view */
          <div className="space-y-6">
            {/* Plan Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {planSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="relative z-10 bg-navy-s2 rounded-xl border border-white/12 p-5 hover:shadow-md hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:border-white/20 group">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <span className="text-white text-lg">{step.icon}</span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-semibold text-ink-heading mb-3 text-base">{step.title}</h3>
                    <p className="text-sm text-ink-body mb-4 leading-relaxed">{step.description}</p>
                    
                    {/* Progress Pill */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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
            
            {/* Continue button */}
            <div className="text-center pt-2">
              <Button
                onClick={onOpenPlan}
                size="lg"
                className="bg-brand-teal hover:bg-brand-teal-hover text-white focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 transition-all duration-200 hover:translate-y-[-1px]"
              >
                Continue Guided Coaching
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


