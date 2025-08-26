export type ModuleType = "video" | "drill" | "reading";
export type LevelId = "getting-started" | "2_5" | "3_0" | "3_5" | "4_0";

export interface CoachingModule {
  id: string;
  type: ModuleType;
  title: string;
  summary: string;
  estMinutes: number;         // estimated time
  videoUrl?: string;          // if type === "video"
  drillSpec?: {
    reps?: number;
    sets?: number;
    equipment?: string[];
    successCriteria?: string;
  };
  readingUrl?: string;        // if type === "reading"
}

export interface CoachingLevel {
  id: LevelId;
  title: string;
  subtitle: string;
  order: number;              // for sorting
  lockedByDefault: boolean;   // everything after currentLevel is locked
  modules: CoachingModule[];
  branch?: "core" | "doubles" | "singles";  // optional branch for future use
}

export interface UserProgress {
  currentLevelId: LevelId;
  completedModuleIds: string[];
  weeklyMinutesGoal: number;
}
