export type SkillId =
  | "serve" | "forehand" | "backhand" | "dink" | "volley"
  | "thirdshot" | "footwork" | "strategy" | "matches";

export const SKILLS: { id: SkillId; label: string }[] = [
  { id: "serve", label: "Serving" },
  { id: "forehand", label: "Forehand" },
  { id: "backhand", label: "Backhand" },
  { id: "dink", label: "Dinking" },
  { id: "volley", label: "Volleying" },
  { id: "thirdshot", label: "3rd Shot" },
  { id: "footwork", label: "Footwork" },
  { id: "strategy", label: "Strategy" },
  { id: "matches", label: "Real Matches" },
];

export const INTENSITY_WEIGHT = { 1: 0.7, 2: 0.85, 3: 1, 4: 1.2, 5: 1.4 } as const;
export const BASE_XP_PER_MIN = 1;

// Cumulative XP thresholds
export const LEVELS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];

export function xpToLevel(xp: number) {
  let level = 1, next = LEVELS[1] ?? Infinity;
  for (let i = 1; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i]) { level = i + 1; next = LEVELS[i + 1] ?? Infinity; } else break;
  }
  const prev = LEVELS[level - 1] ?? 0;
  return { level, nextRequired: next, progress: next === Infinity ? 1 : (xp - prev) / (next - prev) };
}

export function minutesToXp(minutes: number, rating: 1|2|3|4|5) {
  return Math.round(minutes * BASE_XP_PER_MIN * INTENSITY_WEIGHT[rating]);
}
