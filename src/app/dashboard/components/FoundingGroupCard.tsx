'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function FoundingGroupCard() {
  return (
    <Card className="card-strong hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out hover:translate-y-[-1px] border-white/8 hover:border-white/15">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-ink-heading flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-xs">⭐</span>
          </div>
          Founding Player Group
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-ink-body leading-relaxed">
            Early features & community events. Share feedback →
          </p>
          
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Early Access
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 hover:translate-y-[-1px]"
          >
            Join Community
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
