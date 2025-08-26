'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useState, useEffect } from 'react';

export function TipsCard() {
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
    }, 8000); // Change tip every 8 seconds

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <Card className="card hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-ink-heading flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-xs">💡</span>
          </div>
          Tips & Cues
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="min-h-[60px] flex items-center">
          <p className="text-ink-body text-sm leading-relaxed">
            {tips[currentTipIndex]}
          </p>
        </div>
        
        {/* Tip indicator dots */}
        <div className="flex justify-center gap-1 mt-3">
          {tips.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTipIndex 
                  ? 'bg-amber-500' 
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
