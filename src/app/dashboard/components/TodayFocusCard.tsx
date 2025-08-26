'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/IconTile';
import { useState, useEffect } from 'react';

interface TodayFocusCardProps {
  skillFocus: string[];
}

export function TodayFocusCard({ skillFocus }: TodayFocusCardProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const tips = [
    "20 min daily keeps your streak",
    "Film 3 serves; review contact point",
    "Practice dinks with a partner",
    "Focus on footwork before power",
    "Record your matches to analyze",
    "Mix up practice locations"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 6000); // Change tip every 6 seconds

    return () => clearInterval(interval);
  }, [tips.length]);

  const defaultSkills = ['Serve', 'Consistency', 'Footwork'];
  const displaySkills = skillFocus.length > 0 ? skillFocus : defaultSkills;

  return (
    <Card className="card hover:shadow-xl hover:shadow-brand-teal/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-ink-heading">Today&apos;s Focus</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-5">
          {/* Skill tags */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-ink-muted">Skills to practice</h3>
            <div className="flex flex-wrap gap-2">
              {displaySkills.map((skill, index) => {
                // Define color variations for different skills
                const skillColors = [
                  'bg-brand-teal/10 border-brand-teal/20 text-brand-teal',
                  'bg-slate-600/20 border-slate-500/30 text-slate-300',
                  'bg-blue-600/20 border-blue-500/30 text-blue-300',
                  'bg-purple-600/20 border-purple-500/30 text-purple-300'
                ];
                const colorClass = skillColors[index % skillColors.length];
                
                return (
                  <div 
                    key={index} 
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium hover:scale-105 transition-all duration-200 ${colorClass}`}
                  >
                    <IconTile icon={<span className="text-sm">⭐</span>} size="sm" variant="skill" />
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Rotating tip with enhanced styling */}
          <div className="pt-3 border-t border-white/8">
            <div className="flex items-start gap-3">
              <IconTile icon={<span className="text-amber-400 text-base">💡</span>} size="md" variant="accent" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink-body leading-relaxed mb-3">
                  {tips[currentTipIndex]}
                </p>
                
                {/* Tip indicator dots */}
                <div className="flex gap-1.5">
                  {tips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTipIndex 
                          ? 'bg-amber-400' 
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Empty state CTA if no skills */}
          {displaySkills.length === 0 && (
            <div className="text-center py-3">
              <button className="text-brand-teal hover:brightness-110 font-medium text-sm transition-colors focus:ring-2 focus:ring-brand-teal-ring focus:ring-offset-2 rounded hover:underline">
                See suggested drills →
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


