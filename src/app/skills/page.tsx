'use client';

import { levels } from "@/data/coaching";
import { 
  getProgress, 
  isModuleCompleted, 
  percentCompleteForLevel, 
  isLevelLocked,
  isLevelComplete
} from "@/lib/progress";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(getProgress());
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [mobileLevelDropdown, setMobileLevelDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Refresh progress when component mounts or when returning from module detail
  useEffect(() => {
    const handleFocus = () => {
      const freshProgress = getProgress();
      setProgress(freshProgress);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-navy-base">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-slate-200 rounded-2xl"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleModuleClick = (moduleId: string, levelId: string) => {
    try {
      if (isLevelLocked(levelId)) {
        return;
      }
      router.push(`/skills/${moduleId}`);
    } catch (error) {
      console.error("❌ Error navigating to module:", error);
      setError("Failed to navigate to module. Please try again.");
    }
  };

  const handleLevelClick = (levelId: string) => {
    if (isLevelLocked(levelId)) return;
    
    // Find first uncompleted module in this level
    const level = levels.find(l => l.id === levelId);
    if (!level) return;
    
    const firstUncompleted = level.modules.find(m => !isModuleCompleted(m.id));
    if (firstUncompleted) {
      router.push(`/skills/${firstUncompleted.id}`);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <div className="w-2 h-full bg-blue-400 rounded-l-sm" />
        );
      case 'drill':
        return (
          <div className="w-2 h-full bg-green-400 rounded-l-sm" />
        );
      case 'reading':
        return (
          <div className="w-2 h-full bg-purple-400 rounded-l-sm" />
        );
      default:
        return (
          <div className="w-2 h-full bg-white/40 rounded-l-sm" />
        );
    }
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'video': return 'Video';
      case 'drill': return 'Drill';
      case 'reading': return 'Reading';
      default: return type;
    }
  };

  const handleRefreshProgress = () => {
    const freshProgress = getProgress();
    setProgress(freshProgress);
    setError(null);
  };

  const sortedLevels = levels.sort((a, b) => a.order - b.order);
  const currentLevelIndex = sortedLevels.findIndex(l => l.id === progress.currentLevelId);
  
  // Calculate overall mastery percentage
  const totalModules = levels.reduce((sum, l) => sum + l.modules.length, 0);
  const completedModules = progress.completedModuleIds.length;
  const overallMastery = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-navy-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-ink-heading mb-4"
          >
            Skill Development Tree
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-ink-muted max-w-2xl mx-auto"
          >
            Progress through structured levels to reach 4.0 mastery.
          </motion.p>
        </div>

        {/* Overall Mastery Progress Ring */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-ink-heading">{overallMastery}%</div>
                <div className="text-sm text-ink-muted">Mastery</div>
              </div>
            </div>
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-32 h-32 -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke={overallMastery === 100 ? "#F59E0B" : "#00BFA6"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(overallMastery / 100) * 352} 352`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-400 hover:text-red-300 text-xs underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* Progress Summary */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg"
        >
          <div className="text-center">
            <p className="text-ink-muted text-sm mb-2">Overall Progress</p>
            <p className="text-ink-heading font-semibold">
              Level: {progress.currentLevelId} • 
              Completed: {progress.completedModuleIds.length} / {totalModules} modules
            </p>
          </div>
        </motion.div>

        {/* Mobile Level Dropdown */}
        <div className="lg:hidden mb-6">
          <select
            value={mobileLevelDropdown || progress.currentLevelId}
            onChange={(e) => setMobileLevelDropdown(e.target.value)}
            className="w-full p-3 bg-navy-s2 border border-white/20 rounded-lg text-ink-heading"
          >
            {sortedLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.title}
              </option>
            ))}
          </select>
        </div>

        {/* Levels with Timeline */}
        <div className="relative">
          {/* Central Timeline Line - Desktop Only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2" />
          
          <div className="space-y-8">
            {sortedLevels.map((level, index) => {
              const isLocked = isLevelLocked(level.id);
              const percentComplete = percentCompleteForLevel(level, progress.completedModuleIds);
              const completedCount = level.modules.filter(m => 
                progress.completedModuleIds.includes(m.id)
              ).length;
              const isComplete = isLevelComplete(level, progress.completedModuleIds);
              const isCurrentLevel = level.id === progress.currentLevelId;
              const isVisible = mobileLevelDropdown ? level.id === mobileLevelDropdown : true;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-2xl border transition-all duration-300 ${
                    isCurrentLevel 
                      ? 'border-brand-teal/40 bg-navy-s1 shadow-lg shadow-brand-teal/10' 
                      : isComplete
                      ? 'border-brand-gold/30 bg-navy-s1'
                      : 'border-white/10 bg-navy-s1'
                  } p-5 md:p-6 shadow-lg space-y-5 ${
                    isLocked ? 'opacity-50' : ''
                  }`}
                >
                  {/* Timeline Node - Desktop Only */}
                  <div className="hidden lg:block absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="cursor-pointer"
                      onClick={() => handleLevelClick(level.id)}
                      onMouseEnter={() => setHoveredLevel(level.id)}
                      onMouseLeave={() => setHoveredLevel(null)}
                    >
                      {/* Progress Ring around node */}
                      <div className="relative">
                        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            fill="none"
                            stroke={percentComplete === 100 ? "#F59E0B" : "#00BFA6"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${(percentComplete / 100) * 88} 88`}
                            className="transition-all duration-500 ease-out"
                          />
                        </svg>
                        {/* Center node */}
                        <div className={`absolute inset-0 flex items-center justify-center w-8 h-8`}>
                          <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            isComplete
                              ? 'bg-brand-gold border-brand-gold shadow-lg shadow-brand-gold/30'
                              : isCurrentLevel
                              ? 'bg-brand-teal border-brand-teal shadow-lg shadow-brand-teal/30'
                              : isLocked
                              ? 'bg-white/20 border-white/30'
                              : 'bg-white/40 border-white/60'
                          }`} />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Preview - Desktop Only */}
                  <AnimatePresence>
                    {hoveredLevel === level.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="hidden lg:block absolute left-1/2 top-16 transform -translate-x-1/2 z-20 w-64 bg-navy-s2 border border-white/20 rounded-lg p-4 shadow-xl"
                      >
                        <div className="text-center mb-3">
                          <h4 className="font-semibold text-ink-heading text-sm">{level.title}</h4>
                          <p className="text-xs text-ink-muted">{level.modules.length} modules</p>
                        </div>
                        <div className="space-y-2">
                          {level.modules.slice(0, 3).map((module) => (
                            <div key={module.id} className="flex items-center gap-2 text-xs">
                              {getTypeIcon(module.type)}
                              <span className="text-ink-body flex-1">{module.title}</span>
                              <span className="text-ink-muted">{module.estMinutes}m</span>
                            </div>
                          ))}
                          {level.modules.length > 3 && (
                            <div className="text-center text-xs text-ink-muted">
                              +{level.modules.length - 3} more
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Level Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-ink-heading">
                          {level.title}
                        </h2>
                        
                        {/* Status Badges */}
                        {isComplete && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                            className="inline-flex items-center gap-1.5 px-2 py-1 bg-brand-gold/20 border border-brand-gold/30 rounded-full text-xs text-brand-gold font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            Completed
                          </motion.div>
                        )}
                        
                        {isCurrentLevel && !isComplete && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className="inline-flex items-center gap-1.5 px-2 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-xs text-brand-teal font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                            Current
                          </motion.div>
                        )}
                        
                        {isLocked && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-ink-muted">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Locked
                          </div>
                        )}
                      </div>
                      <p className="text-ink-body mb-3">{level.subtitle}</p>
                      <div className="text-sm text-ink-muted">
                        {level.modules.length} modules • {percentComplete}% complete
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentComplete}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        percentComplete === 100 
                          ? 'bg-brand-gold shadow-lg shadow-brand-gold/20' 
                          : 'bg-brand-teal'
                      }`}
                    />
                  </div>

                  {/* Helper text for Getting Started */}
                  {level.id === 'getting-started' && percentComplete === 0 && (
                    <div className="text-center py-2">
                      <p className="text-sm text-ink-muted">Start here</p>
                    </div>
                  )}

                  {/* Suggested Next Step */}
                  {isCurrentLevel && !isComplete && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="bg-brand-teal/10 border border-brand-teal/20 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-brand-teal">💡</span>
                        <span className="text-sm text-brand-teal font-medium">Suggested Next Step:</span>
                      </div>
                      <p className="text-sm text-ink-body mt-1">
                        {level.modules.find(m => !isModuleCompleted(m.id))?.title || 'Complete remaining modules'}
                      </p>
                    </motion.div>
                  )}

                  {/* Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {level.modules.map((module, moduleIndex) => {
                      const isCompleted = isModuleCompleted(module.id);
                      
                      return (
                        <motion.div
                          key={module.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + moduleIndex * 0.1 }}
                          onClick={() => handleModuleClick(module.id, level.id)}
                          className={`rounded-xl border transition-all duration-200 cursor-pointer ${
                            isComplete
                              ? 'border-brand-gold/20 bg-navy-s2/50'
                              : isCurrentLevel
                              ? 'border-white/10 bg-navy-s2 hover:border-white/20 hover:bg-navy-s1'
                              : 'border-white/10 bg-navy-s2'
                          } p-4 ${
                            isLocked ? 'pointer-events-none' : 'hover:border-white/20 hover:bg-navy-s1'
                          } ${isCompleted ? 'opacity-60' : ''}`}
                        >
                          {/* Module Header with Colored Sidebar */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              {getTypeIcon(module.type)}
                              <div className="text-xs text-ink-muted font-medium">
                                {getTypeDisplayName(module.type)}
                              </div>
                            </div>
                            {isCompleted && (
                              <motion.div 
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 500 }}
                                className="w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center shadow-lg shadow-brand-gold/20"
                              >
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </motion.div>
                            )}
                          </div>

                          {/* Module Content */}
                          <h3 className="font-semibold text-ink-heading mb-2 text-sm leading-tight">
                            {module.title}
                          </h3>
                          <p className="text-ink-muted text-xs mb-3 leading-relaxed">
                            {module.summary}
                          </p>

                          {/* Time Estimate */}
                          <div className="inline-flex items-center px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-ink-body">
                            {module.estMinutes} min
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
