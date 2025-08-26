'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface QuickActionsProps {
  onLogPractice: () => void;
  onLogMatch: () => void;
  onAddNotes: () => void;
  onStartTimer: () => void;
}

export function QuickActions({ 
  onLogPractice, 
  onLogMatch, 
  onAddNotes, 
  onStartTimer 
}: QuickActionsProps) {
  const actions = [
    {
      icon: '🏓',
      label: 'Log Practice Session',
      onClick: onLogPractice,
      variant: 'default' as const,
      className: 'bg-brand-teal hover:bg-brand-teal-hover text-white'
    },
    {
      icon: '🏆',
      label: 'Log Match Result',
      onClick: onLogMatch,
      variant: 'outline' as const,
      className: 'border-white/15 text-ink-body hover:bg-white/5'
    },
    {
      icon: '📝',
      label: 'Add Notes/Reflection',
      onClick: onAddNotes,
      variant: 'outline' as const,
      className: 'border-white/15 text-ink-body hover:bg-white/5'
    },
    {
      icon: '⏱️',
      label: 'Start Timer',
      onClick: onStartTimer,
      variant: 'outline' as const,
      className: 'border-white/15 text-ink-body hover:bg-white/5'
    }
  ];

  return (
    <Card className="card hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-ink-heading">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant}
              size="lg"
              className={`w-full justify-start gap-3 font-medium transition-all duration-300 ease-in-out hover:translate-y-[-2px] focus:ring-2 focus:ring-offset-2 hover:shadow-lg ${action.className}`}
            >
              <span className="text-base">{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
