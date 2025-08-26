import { levels, defaultProgress } from "@/data/coaching";
import { UserProgress, CoachingLevel, CoachingModule } from "@/types/coaching";

const STORAGE_KEY = "pp_progress";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log("📊 Progress: No stored progress found, using defaults");
      return defaultProgress;
    }
    
    const parsed = JSON.parse(stored);
    // Validate the structure matches UserProgress
    if (parsed && typeof parsed === "object" && 
        "currentLevelId" in parsed && 
        "completedModuleIds" in parsed && 
        "weeklyMinutesGoal" in parsed) {
      
      // Validate that currentLevelId exists in our levels
      const levelExists = levels.some(l => l.id === parsed.currentLevelId);
      if (!levelExists) {
        console.warn("⚠️ Progress: Invalid currentLevelId found, resetting to default");
        return defaultProgress;
      }
      
      console.log("📊 Progress: Loaded progress for level:", parsed.currentLevelId);
      return parsed as UserProgress;
    } else {
      console.warn("⚠️ Progress: Invalid progress structure, using defaults");
    }
  } catch (error) {
    console.error("❌ Progress: Failed to parse stored progress:", error);
  }
  
  return defaultProgress;
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  
  try {
    // Validate progress before saving
    const levelExists = levels.some(l => l.id === progress.currentLevelId);
    if (!levelExists) {
      console.error("❌ Progress: Cannot save invalid level ID:", progress.currentLevelId);
      return;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    console.log("💾 Progress: Saved progress for level:", progress.currentLevelId);
    console.log("📈 Progress: Completed modules:", progress.completedModuleIds.length);
  } catch (error) {
    console.error("❌ Progress: Failed to save progress:", error);
  }
}

export function isModuleCompleted(moduleId: string): boolean {
  const progress = getProgress();
  const isCompleted = progress.completedModuleIds.includes(moduleId);
  console.log(`🔍 Module ${moduleId} completion status:`, isCompleted);
  return isCompleted;
}

export function percentCompleteForLevel(level: CoachingLevel, completedIds: string[]): number {
  if (level.modules.length === 0) return 0;
  
  const completedCount = level.modules.filter(module => 
    completedIds.includes(module.id)
  ).length;
  
  const percentage = Math.round((completedCount / level.modules.length) * 100);
  console.log(`📊 Level ${level.id}: ${completedCount}/${level.modules.length} modules complete (${percentage}%)`);
  
  return percentage;
}

export function findModuleById(moduleId: string): CoachingModule | null {
  for (const level of levels) {
    const moduleData = level.modules.find(m => m.id === moduleId);
    if (moduleData) {
      console.log(`🔍 Found module ${moduleId} in level ${level.id}`);
      return moduleData;
    }
  }
  console.warn(`⚠️ Module not found: ${moduleId}`);
  return null;
}

export function getNextModuleId(currentModuleId: string): string | null {
  const progress = getProgress();
  const allModules = levels.flatMap(l => l.modules);
  const currentIndex = allModules.findIndex(m => m.id === currentModuleId);
  
  if (currentIndex === -1) {
    console.warn(`⚠️ Module ${currentModuleId} not found in module list`);
    return null;
  }
  
  if (currentIndex === allModules.length - 1) {
    console.log("🎯 Last module reached, no next module available");
    return null;
  }
  
  // Find the next uncompleted module
  for (let i = currentIndex + 1; i < allModules.length; i++) {
    if (!isModuleCompleted(allModules[i].id)) {
      console.log(`➡️ Next module: ${allModules[i].id} (${allModules[i].title})`);
      return allModules[i].id;
    }
  }
  
  console.log("✅ All remaining modules are completed");
  return null;
}

export function unlockNextLevelIfNeeded(completedModuleId: string): void {
  const progress = getProgress();
  const currentLevel = levels.find(l => l.id === progress.currentLevelId);
  
  if (!currentLevel) {
    console.warn("⚠️ Cannot unlock next level: current level not found");
    return;
  }
  
  console.log(`🔓 Checking if level ${currentLevel.id} is complete...`);
  
  // Check if all modules in current level are completed
  const allCompleted = currentLevel.modules.every(module => 
    progress.completedModuleIds.includes(module.id)
  );
  
  if (allCompleted) {
    // Find next level
    const nextLevel = levels.find(l => l.order === currentLevel.order + 1);
    if (nextLevel) {
      const newProgress: UserProgress = {
        ...progress,
        currentLevelId: nextLevel.id
      };
      saveProgress(newProgress);
      console.log(`🎉 Level unlocked: ${nextLevel.id} (${nextLevel.title})`);
    } else {
      console.log("🏆 All levels completed! User has reached mastery.");
    }
  } else {
    const remainingCount = currentLevel.modules.filter(m => 
      !progress.completedModuleIds.includes(m.id)
    ).length;
    console.log(`⏳ Level ${currentLevel.id}: ${remainingCount} modules remaining`);
  }
}

export function getLevelById(levelId: string): CoachingLevel | null {
  const level = levels.find(l => l.id === levelId);
  if (!level) {
    console.warn(`⚠️ Level not found: ${levelId}`);
    return null;
  }
  return level;
}

export function isLevelLocked(levelId: string): boolean {
  const progress = getProgress();
  const level = getLevelById(levelId);
  
  if (!level) {
    console.warn(`⚠️ Cannot determine lock status for invalid level: ${levelId}`);
    return true;
  }
  
  // If level is locked by default, check if user has unlocked it
  if (level.lockedByDefault) {
    const currentLevel = getLevelById(progress.currentLevelId);
    if (!currentLevel || level.order > currentLevel.order) {
      console.log(`🔒 Level ${levelId} is locked (requires completing level ${progress.currentLevelId})`);
      return true;
    }
  }
  
  console.log(`🔓 Level ${levelId} is unlocked`);
  return false;
}

// New utility function for debugging
export function debugProgress(): void {
  const progress = getProgress();
  console.group("🔍 Progress Debug Info");
  console.log("Current Level:", progress.currentLevelId);
  console.log("Completed Modules:", progress.completedModuleIds);
  console.log("Weekly Goal:", progress.weeklyMinutesGoal);
  console.log("Total Levels:", levels.length);
  console.log("Total Modules:", levels.reduce((sum, l) => sum + l.modules.length, 0));
  console.groupEnd();
}

export function isLevelComplete(level: CoachingLevel, completedIds: string[]): boolean {
  const ids = new Set(completedIds);
  return level.modules.every(m => ids.has(m.id));
}
