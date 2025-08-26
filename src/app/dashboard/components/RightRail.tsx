'use client';

import { TipsCard } from './TipsCard';
import { FoundingGroupCard } from './FoundingGroupCard';
import { UpcomingGoalsCard } from './UpcomingGoalsCard';

export function RightRail() {
  return (
    <div className="space-y-5">
      <TipsCard />
      <FoundingGroupCard />
      <UpcomingGoalsCard />
    </div>
  );
}
