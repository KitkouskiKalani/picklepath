export function datesEqualByTZ(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function computeDailyBuckets(sessions: Array<{ date: Date; minutes: number }>): Map<string, number> {
  const buckets = new Map<string, number>();
  
  sessions.forEach(session => {
    const dateKey = session.date.toISOString().split('T')[0];
    const current = buckets.get(dateKey) || 0;
    buckets.set(dateKey, current + session.minutes);
  });
  
  return buckets;
}

export function computeStreaks(sessions: Array<{ date: Date; minutes: number }>): { current: number; best: number } {
  if (sessions.length === 0) return { current: 0, best: 0 };
  
  const dailyBuckets = computeDailyBuckets(sessions);
  const sortedDates = Array.from(dailyBuckets.keys())
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => b.getTime() - a.getTime());
  
  let currentStreak = 0;
  let bestStreak = 0;
  let runningStreak = 0;
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if today or yesterday has activity
  const todayKey = today.toISOString().split('T')[0];
  const yesterdayKey = yesterday.toISOString().split('T')[0];
  
  let checkDate = new Date(today);
  
  while (true) {
    const dateKey = checkDate.toISOString().split('T')[0];
    const minutes = dailyBuckets.get(dateKey) || 0;
    
    if (minutes >= 20) {
      runningStreak++;
      if (dateKey === todayKey || dateKey === yesterdayKey) {
        currentStreak = runningStreak;
      }
    } else {
      bestStreak = Math.max(bestStreak, runningStreak);
      runningStreak = 0;
      
      // If we've gone back more than 2 days and haven't found current streak, break
      const daysDiff = Math.floor((today.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 2 && currentStreak === 0) break;
    }
    
    checkDate.setDate(checkDate.getDate() - 1);
    
    // Safety break to prevent infinite loops
    if (checkDate.getTime() < new Date('2020-01-01').getTime()) break;
  }
  
  bestStreak = Math.max(bestStreak, runningStreak);
  
  return { current: currentStreak, best: bestStreak };
}

