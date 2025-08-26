'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import AuthLayout from '@/components/AuthLayout';
import { auth } from '@/lib/firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const [skillLevel, setSkillLevel] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const skillLevels = [
    { value: 'beginner', label: 'Beginner (1.0-2.0)', description: 'New to pickleball or just learning the basics' },
    { value: 'intermediate', label: 'Intermediate (2.5-3.5)', description: 'Can play rallies and understand basic strategy' },
    { value: 'advanced', label: 'Advanced (4.0+)', description: 'Competitive player with strong technical skills' }
  ];

  const goalOptions = [
    'Improve my serve and return',
    'Master dinking and soft game',
    'Develop better court positioning',
    'Learn advanced shot selection',
    'Build consistency and reduce errors',
    'Prepare for tournament play',
    'Improve fitness and endurance',
    'Have more fun on the court'
  ];

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillLevel) {
      toast.error('Please select your skill level');
      return;
    }

    if (goals.length === 0) {
      toast.error('Please select at least one goal');
      return;
    }

    setLoading(true);
    try {
      // Here you would typically save this data to your database
      // For now, we'll just update the user's display name with their skill level
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${auth.currentUser.displayName || 'Player'} (${skillLevel})`
        });
      }

      toast.success('Welcome to PicklePath! Your personalized training plan is ready.');
      router.push('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome to PicklePath!"
      subtitle="Let&apos;s personalize your training experience"
      micro="Join our exclusive community of players committed to structured improvement"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skill Level Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">What&apos;s your current skill level?</h3>
          <div className="space-y-3">
            {skillLevels.map((level) => (
              <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="skillLevel"
                  value={level.value}
                  checked={skillLevel === level.value}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="mt-1 h-4 w-4 text-[#00BFA6] border-gray-300 focus:ring-[#00BFA6]"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{level.label}</div>
                  <div className="text-sm text-gray-500">{level.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Goals Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">What are your main goals? (Select all that apply)</h3>
          <div className="grid grid-cols-1 gap-3">
            {goalOptions.map((goal) => (
              <label key={goal} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={goals.includes(goal)}
                  onChange={() => handleGoalToggle(goal)}
                  className="mt-1 h-4 w-4 text-[#00BFA6] border-gray-300 rounded focus:ring-[#00BFA6]"
                />
                <span className="text-sm text-gray-700">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:brightness-110 active:translate-y-[1px] shadow-lg shadow-[#00BFA6]/25"
        >
          {loading ? 'Setting up your account...' : 'Start My Training Journey'}
        </Button>
      </form>

      {/* Welcome Message */}
      <div className="mt-8 p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200/60 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#00BFA6] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl">🎯</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Your Personalized Path Awaits</h4>
          <p className="text-slate-600 leading-relaxed">
            Based on your skill level and goals, we&apos;ll create a custom training plan that takes you from where you are to where you want to be. Every lesson, drill, and challenge will be tailored just for you.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
