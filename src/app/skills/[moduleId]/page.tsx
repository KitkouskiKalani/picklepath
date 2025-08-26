'use client';

import { levels } from "@/data/coaching";
import { 
  getProgress, 
  saveProgress, 
  isModuleCompleted, 
  findModuleById, 
  getNextModuleId, 
  unlockNextLevelIfNeeded,
  getLevelById,
  debugProgress
} from "@/lib/progress";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ModuleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;
  
  const [progress, setProgress] = useState(getProgress());
  const [mounted, setMounted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    console.log(`📖 Module Detail: Loading module ${moduleId}`);
    debugProgress();
  }, [moduleId]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-navy-base">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded-lg w-32"></div>
            <div className="h-12 bg-slate-200 rounded-lg"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-24"></div>
            <div className="h-64 bg-slate-200 rounded-lg"></div>
            <div className="h-12 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const moduleData = findModuleById(moduleId);
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-navy-base">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink-heading mb-4">Module Not Found</h1>
            <p className="text-ink-muted mb-6">
              The module &quot;{moduleId}&quot; doesn&apos;t exist in our coaching system.
            </p>
            <div className="space-y-3">
              <Button onClick={() => router.push('/skills')}>
                Back to Skills
              </Button>
              <div className="text-sm text-ink-muted">
                <p>Debug info: Check console for details</p>
                <button 
                  onClick={debugProgress}
                  className="text-brand-teal hover:underline mt-1"
                >
                  Debug Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const level = getLevelById(progress.currentLevelId);
  const isCompleted = isModuleCompleted(moduleId);
  const nextModuleId = getNextModuleId(moduleId);

  const handleMarkComplete = async () => {
    if (isCompleted) {
      console.log(`✅ Module ${moduleId} is already completed`);
      return;
    }
    
    setIsCompleting(true);
    setError(null);
    
    try {
      console.log(`🎯 Marking module ${moduleId} as complete...`);
      
      // Add to completed modules
      const newCompletedIds = [...progress.completedModuleIds, moduleId];
      const newProgress = {
        ...progress,
        completedModuleIds: newCompletedIds
      };
      
      // Save progress
      saveProgress(newProgress);
      setProgress(newProgress);
      
      // Check if we need to unlock next level
      unlockNextLevelIfNeeded(moduleId);
      
      // Show success message
      setSuccessMessage(`Module "${moduleData.title}" marked complete!`);
      console.log(`🎉 Module ${moduleId} completed successfully`);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      // Navigate to next module or back to skills after a short delay
      setTimeout(() => {
        if (nextModuleId) {
          console.log(`➡️ Navigating to next module: ${nextModuleId}`);
          router.push(`/skills/${nextModuleId}`);
        } else {
          console.log(`🏠 No next module, returning to skills index`);
          router.push('/skills');
        }
      }, 1500);
      
    } catch (error) {
      console.error('❌ Failed to mark module complete:', error);
      setError('Failed to mark module complete. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleNextModule = () => {
    if (nextModuleId) {
      console.log(`➡️ Manually navigating to next module: ${nextModuleId}`);
      router.push(`/skills/${nextModuleId}`);
    } else {
      console.log(`🏠 No next module available, returning to skills index`);
      router.push('/skills');
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'drill':
        return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'reading':
        return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-white/10 text-ink-muted border-white/20';
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

  return (
    <div className="min-h-screen bg-navy-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/skills')}
            className="inline-flex items-center gap-2 text-ink-muted hover:text-ink-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Skills
          </button>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-300 text-sm">{successMessage}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-400 hover:text-red-300 text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getTypeBadgeColor(moduleData.type)}`}>
              {getTypeDisplayName(moduleData.type)}
            </div>
            <div className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-ink-body">
              {moduleData.estMinutes} min
            </div>
            {isCompleted && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-lg text-sm text-brand-gold">
                ✓ Completed
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-ink-heading mb-3">
            {moduleData.title}
          </h1>
          
          {level && (
            <p className="text-ink-muted">
              Level: <span className="text-ink-body font-medium">{level.title}</span>
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="mb-8">
          <p className="text-lg text-ink-body leading-relaxed">
            {moduleData.summary}
          </p>
        </div>

        {/* Content */}
        <div className="mb-8">
          {moduleData.type === 'video' && moduleData.videoUrl && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink-heading">Video Lesson</h3>
              <video 
                src={moduleData.videoUrl} 
                controls 
                className="w-full rounded-xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              />
            </div>
          )}

          {moduleData.type === 'reading' && moduleData.readingUrl && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink-heading">Reading Material</h3>
              <a 
                href={moduleData.readingUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brand-teal hover:bg-brand-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
              >
                Read Article
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

          {moduleData.type === 'drill' && moduleData.drillSpec && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink-heading">Drill Instructions</h3>
              <div className="bg-navy-s2 rounded-xl border border-white/10 p-6 space-y-4">
                {moduleData.drillSpec.sets && (
                  <div className="flex items-center gap-3">
                    <span className="text-ink-muted">Sets:</span>
                    <span className="text-ink-body font-medium">{moduleData.drillSpec.sets}</span>
                  </div>
                )}
                {moduleData.drillSpec.reps && (
                  <div className="flex items-center gap-3">
                    <span className="text-ink-muted">Reps:</span>
                    <span className="text-ink-body font-medium">{moduleData.drillSpec.reps}</span>
                  </div>
                )}
                {moduleData.drillSpec.equipment && moduleData.drillSpec.equipment.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-ink-muted">Equipment:</span>
                    <div className="flex gap-2">
                      {moduleData.drillSpec.equipment.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-ink-body">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {moduleData.drillSpec.successCriteria && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-ink-muted">Success Criteria:</span>
                    <p className="text-ink-body mt-1">{moduleData.drillSpec.successCriteria}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted || isCompleting}
            size="lg"
            className="bg-brand-teal hover:bg-brand-teal-hover text-white focus-visible:ring-2 focus-visible:ring-brand-teal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompleting ? 'Marking...' : isCompleted ? 'Completed ✓' : 'Mark Complete'}
          </Button>
          
          <Button
            onClick={handleNextModule}
            disabled={!nextModuleId || !isCompleted}
            variant="outline"
            size="lg"
            className="border-white/20 text-ink-body hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-brand-teal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {nextModuleId ? 'Next Module' : 'Back to Skills'}
          </Button>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="text-xs text-ink-muted space-y-1">
            <p>Module ID: {moduleId}</p>
            <p>Type: {moduleData.type}</p>
            <p>Completed: {isCompleted ? 'Yes' : 'No'}</p>
            <p>Next Module: {nextModuleId || 'None'}</p>
            <button 
              onClick={debugProgress}
              className="text-brand-teal hover:underline"
            >
              Debug Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
