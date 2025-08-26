'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

type LogType = 'practice' | 'match' | 'notes';

interface LogEntry {
  id: string;
  type: LogType;
  createdAt: string;
  payload: any;
}

interface PracticePayload {
  dateTime: string;
  duration: number;
  focusTags: string[];
  intensity: number;
  notes: string;
}

interface MatchPayload {
  dateTime: string;
  duration: number;
  partner: string;
  opponent: string;
  score: string;
  notes: string;
}

interface NotesPayload {
  dateTime: string;
  note: string;
  focusTags: string[];
}

const FOCUS_TAGS = ['Serve', 'Return', 'Dink', 'Footwork', 'Consistency'];
const INTENSITY_LEVELS = [1, 2, 3, 4, 5];

export default function LogPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LogType>('practice');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Practice form state
  const [practiceForm, setPracticeForm] = useState<PracticePayload>({
    dateTime: new Date().toISOString().slice(0, 16),
    duration: 30,
    focusTags: [],
    intensity: 3,
    notes: ''
  });

  // Match form state
  const [matchForm, setMatchForm] = useState<MatchPayload>({
    dateTime: new Date().toISOString().slice(0, 16),
    duration: 60,
    partner: '',
    opponent: '',
    score: '',
    notes: ''
  });

  // Notes form state
  const [notesForm, setNotesForm] = useState<NotesPayload>({
    dateTime: new Date().toISOString().slice(0, 16),
    note: '',
    focusTags: []
  });

  const handleFocusTagToggle = (tag: string, formType: LogType) => {
    if (formType === 'practice') {
      setPracticeForm(prev => ({
        ...prev,
        focusTags: prev.focusTags.includes(tag)
          ? prev.focusTags.filter(t => t !== tag)
          : [...prev.focusTags, tag]
      }));
    } else if (formType === 'notes') {
      setNotesForm(prev => ({
        ...prev,
        focusTags: prev.focusTags.includes(tag)
          ? prev.focusTags.filter(t => t !== tag)
          : [...prev.focusTags, tag]
      }));
    }
  };

  const saveEntry = async (type: LogType, payload: any) => {
    setIsSubmitting(true);
    
    try {
      // Get existing entries
      const existingEntries = JSON.parse(localStorage.getItem('pp_entries') || '[]');
      
      // Create new entry
      const newEntry: LogEntry = {
        id: `${type}-${Date.now()}`,
        type,
        createdAt: new Date().toISOString(),
        payload
      };
      
      // Save to localStorage
      localStorage.setItem('pp_entries', JSON.stringify([...existingEntries, newEntry]));
      
      // Update weekly minutes for practice and match
      if (type === 'practice' || type === 'match') {
        const progress = JSON.parse(localStorage.getItem('pp_progress') || '{}');
        const currentWeeklyMinutes = progress.weeklyLoggedMinutes || 0;
        const newWeeklyMinutes = currentWeeklyMinutes + payload.duration;
        
        localStorage.setItem('pp_progress', JSON.stringify({
          ...progress,
          weeklyLoggedMinutes: newWeeklyMinutes
        }));
      }
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePracticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveEntry('practice', practiceForm);
  };

  const handleMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveEntry('match', matchForm);
  };

  const handleNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveEntry('notes', notesForm);
  };

  const resetForms = () => {
    setPracticeForm({
      dateTime: new Date().toISOString().slice(0, 16),
      duration: 30,
      focusTags: [],
      intensity: 3,
      notes: ''
    });
    
    setMatchForm({
      dateTime: new Date().toISOString().slice(0, 16),
      duration: 60,
      partner: '',
      opponent: '',
      score: '',
      notes: ''
    });
    
    setNotesForm({
      dateTime: new Date().toISOString().slice(0, 16),
      note: '',
      focusTags: []
    });
    
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-navy-base flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-6xl">✅</div>
            <h1 className="text-2xl font-semibold text-ink-heading">Saved!</h1>
            <p className="text-ink-body">Your session has been logged successfully.</p>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-brand-teal hover:bg-brand-teal/90"
              >
                🏠 Back to Dashboard
              </Button>
              <Button
                onClick={() => router.push('/skills')}
                variant="outline"
                className="w-full border-white/20 text-ink-body hover:bg-white/5"
              >
                🎯 Open Skills
              </Button>
              <Button
                onClick={resetForms}
                variant="ghost"
                className="w-full text-ink-muted hover:text-ink-body"
              >
                ➕ Log Another Session
              </Button>
            </div>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-base p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-ink-heading mb-2"
          >
            Log Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink-muted"
          >
            Track your pickleball progress
          </motion.p>
        </div>

        {/* Tabs */}
        <Card className="p-1 mb-6">
          <div className="flex">
            {(['practice', 'match', 'notes'] as LogType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all ${
                  activeTab === tab
                    ? 'bg-brand-teal text-white shadow-lg'
                    : 'text-ink-muted hover:text-ink-body hover:bg-white/5'
                }`}
              >
                {tab === 'practice' && '🏓 Practice'}
                {tab === 'match' && '🎾 Match'}
                {tab === 'notes' && '📝 Notes'}
              </button>
            ))}
          </div>
        </Card>

        {/* Forms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'practice' && (
              <Card className="p-6">
                <form onSubmit={handlePracticeSubmit} className="space-y-6">
                  <h2 className="text-xl font-semibold text-ink-heading mb-4">Practice Session</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-body mb-2">
                        Date & Time
                      </label>
                      <Input
                        type="datetime-local"
                        value={practiceForm.dateTime}
                        onChange={(e) => setPracticeForm(prev => ({ ...prev, dateTime: e.target.value }))}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ink-body mb-2">
                        Duration (minutes)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="480"
                        value={practiceForm.duration}
                        onChange={(e) => setPracticeForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Focus Areas
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {FOCUS_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleFocusTagToggle(tag, 'practice')}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            practiceForm.focusTags.includes(tag)
                              ? 'bg-brand-teal text-white'
                              : 'bg-white/10 text-ink-body hover:bg-white/20'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Perceived Intensity
                    </label>
                    <div className="flex gap-2">
                      {INTENSITY_LEVELS.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setPracticeForm(prev => ({ ...prev, intensity: level }))}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                            practiceForm.intensity === level
                              ? 'bg-brand-teal text-white'
                              : 'bg-white/10 text-ink-body hover:bg-white/20'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-ink-muted mt-1">
                      1 = Light • 5 = Maximum effort
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Notes
                    </label>
                    <textarea
                      value={practiceForm.notes}
                      onChange={(e) => setPracticeForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full bg-navy-s2 border border-white/10 rounded-lg px-3 py-2 text-ink-body placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-teal/60"
                      placeholder="What did you work on? Any breakthroughs or areas to improve?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90"
                  >
                    {isSubmitting ? 'Saving...' : '💾 Save Session'}
                  </Button>
                </form>
              </Card>
            )}

            {activeTab === 'match' && (
              <Card className="p-6">
                <form onSubmit={handleMatchSubmit} className="space-y-6">
                  <h2 className="text-xl font-semibold text-ink-heading mb-4">Match Play</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-body mb-2">
                        Date & Time
                      </label>
                      <Input
                        type="datetime-local"
                        value={matchForm.dateTime}
                        onChange={(e) => setMatchForm(prev => ({ ...prev, dateTime: e.target.value }))}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ink-body mb-2">
                        Duration (minutes)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="480"
                        value={matchForm.duration}
                        onChange={(e) => setMatchForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-body mb-2">
                        Partner
                      </label>
                      <Input
                        type="text"
                        value={matchForm.partner}
                        onChange={(e) => setMatchForm(prev => ({ ...prev, partner: e.target.value }))}
                        className="w-full"
                        placeholder="Who did you play with?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ink-body mb-2">
                        Opponents
                      </label>
                      <Input
                        type="text"
                        value={matchForm.opponent}
                        onChange={(e) => setMatchForm(prev => ({ ...prev, opponent: e.target.value }))}
                        className="w-full"
                        placeholder="Who did you play against?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Score
                    </label>
                    <Input
                      type="text"
                      value={matchForm.score}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, score: e.target.value }))}
                      className="w-full"
                      placeholder="e.g., You 11-9 Opponents"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Notes
                    </label>
                    <textarea
                      value={matchForm.notes}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full bg-navy-s2 border border-white/10 rounded-lg px-3 py-2 text-ink-body placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-teal/60"
                      placeholder="How did the match go? Key moments, strategies, lessons learned..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90"
                  >
                    {isSubmitting ? 'Saving...' : '🏆 Save Match'}
                  </Button>
                </form>
              </Card>
            )}

            {activeTab === 'notes' && (
              <Card className="p-6">
                <form onSubmit={handleNotesSubmit} className="space-y-6">
                  <h2 className="text-xl font-semibold text-ink-heading mb-4">Quick Notes</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Date & Time
                    </label>
                    <Input
                      type="datetime-local"
                      value={notesForm.dateTime}
                      onChange={(e) => setNotesForm(prev => ({ ...prev, dateTime: e.target.value }))}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Focus Areas (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {FOCUS_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleFocusTagToggle(tag, 'notes')}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            notesForm.focusTags.includes(tag)
                              ? 'bg-brand-teal text-white'
                              : 'bg-white/10 text-ink-body hover:bg-white/20'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Note
                    </label>
                    <textarea
                      value={notesForm.note}
                      onChange={(e) => setNotesForm(prev => ({ ...prev, note: e.target.value }))}
                      rows={4}
                      className="w-full bg-navy-s2 border border-white/10 rounded-lg px-3 py-2 text-ink-body placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-teal/60"
                      placeholder="Jot down insights, observations, or things to remember..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90"
                  >
                    {isSubmitting ? 'Saving...' : '📝 Save Note'}
                  </Button>
                </form>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

