import { CoachingLevel, CoachingModule, UserProgress } from "@/types/coaching";

export const levels: CoachingLevel[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    subtitle: "The basics: rules, scoring, court, and ready positions.",
    order: 0,
    lockedByDefault: false,
    modules: [
      {
        id: "gs-rules-overview",
        type: "reading",
        title: "Basic Rules Overview",
        summary: "Scoring, serve rules, faults, and rally flow.",
        estMinutes: 6,
        readingUrl: "/docs/getting-started/rules"
      },
      {
        id: "gs-court-layout",
        type: "reading",
        title: "Court Layout & Kitchen",
        summary: "Lines, non-volley zone, and positioning essentials.",
        estMinutes: 5,
        readingUrl: "/docs/getting-started/court"
      },
      {
        id: "gs-scoring-demo",
        type: "video",
        title: "How Scoring Works (Demo)",
        summary: "A quick walk-through of side outs and calling the score.",
        estMinutes: 7,
        videoUrl: "https://your.cdn/video/scoring-demo.mp4"
      },
      {
        id: "gs-ready-stance",
        type: "drill",
        title: "Ready Position & Grip",
        summary: "Neutral grip, paddle up, balanced stance; 3×20s holds.",
        estMinutes: 8,
        drillSpec: {
          sets: 3,
          reps: 1,
          equipment: ["paddle", "ball"],
          successCriteria: "Hold position without dropping paddle height"
        }
      }
    ]
  },
  {
    id: "2_5",
    title: "Level 2.5 — Foundation Builder",
    subtitle: "Build consistent fundamentals you'll use every rally.",
    order: 1,
    lockedByDefault: false,
    modules: [
      {
        id: "25-basic-serve-technique",
        type: "video",
        title: "Basic Serve Technique",
        summary: "Underhand motion, contact point, and follow-through.",
        estMinutes: 10,
        videoUrl: "https://your.cdn/video/basic-serve.mp4"
      },
      {
        id: "25-forehand-groundstroke",
        type: "drill",
        title: "Forehand Groundstroke",
        summary: "Consistent contact and depth control — 3×12 reps.",
        estMinutes: 12,
        drillSpec: {
          sets: 3,
          reps: 12,
          successCriteria: "10+ solid contacts per set"
        }
      },
      {
        id: "25-kitchen-positioning",
        type: "reading",
        title: "Kitchen Line Positioning",
        summary: "Where to stand and why it wins points.",
        estMinutes: 6,
        readingUrl: "/docs/positioning/kitchen"
      },
      {
        id: "25-basic-dink-shot",
        type: "drill",
        title: "Basic Dink Shot",
        summary: "Soft control over the net — 3×15 reps.",
        estMinutes: 12,
        drillSpec: {
          sets: 3, 
          reps: 15, 
          successCriteria: "12+ controlled dinks per set"
        }
      }
    ]
  },
  {
    id: "3_0",
    title: "Level 3.0 — Skill Developer",
    subtitle: "Add returns, drops, volleys, and court movement.",
    order: 2,
    lockedByDefault: true,
    modules: [
      { 
        id: "30-return-serve", 
        type: "drill", 
        title: "Return of Serve Strategy", 
        summary: "Deep & middle returns.", 
        estMinutes: 12 
      },
      { 
        id: "30-third-shot-drop", 
        type: "video", 
        title: "Third Shot Drop", 
        summary: "Most important shot in pickleball.", 
        estMinutes: 10, 
        videoUrl: "https://your.cdn/video/third-shot-drop.mp4" 
      },
      { 
        id: "30-backhand-dev", 
        type: "drill", 
        title: "Backhand Development", 
        summary: "Consistency on backhand side.", 
        estMinutes: 12 
      },
      { 
        id: "30-court-movement", 
        type: "drill", 
        title: "Court Movement Patterns", 
        summary: "Efficient footwork patterns.", 
        estMinutes: 12 
      },
      { 
        id: "30-volley-fundamentals", 
        type: "video", 
        title: "Volley Fundamentals", 
        summary: "Contact in front, soft hands.", 
        estMinutes: 8, 
        videoUrl: "https://your.cdn/video/volleys.mp4" 
      }
    ]
  },
  {
    id: "3_5",
    title: "Level 3.5 — Game Tactician",
    subtitle: "Add lobs, overheads, stacking, and advanced dinking.",
    order: 3,
    lockedByDefault: true,
    modules: [
      { 
        id: "35-advanced-dinking", 
        type: "drill", 
        title: "Advanced Dinking Strategy", 
        summary: "Patience and placement.", 
        estMinutes: 12 
      },
      { 
        id: "35-lob-overhead", 
        type: "video", 
        title: "Lob & Overhead", 
        summary: "Defensive lobs & putaways.", 
        estMinutes: 9, 
        videoUrl: "https://your.cdn/video/lob-overhead.mp4" 
      },
      { 
        id: "35-stacking", 
        type: "reading", 
        title: "Stacking Strategy", 
        summary: "When to stack and why.", 
        estMinutes: 7, 
        readingUrl: "/docs/strategy/stacking" 
      },
      { 
        id: "35-transition-zone", 
        type: "drill", 
        title: "Transition Zone Footwork", 
        summary: "Move forward safely.", 
        estMinutes: 12 
      }
    ]
  }
];

export const defaultProgress: UserProgress = {
  currentLevelId: "getting-started",
  completedModuleIds: [],
  weeklyMinutesGoal: 120
};

export function flattenModules() {
  return levels.flatMap(l => l.modules.map(m => ({...m, levelId: l.id, levelOrder: l.order})));
}
