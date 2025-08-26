'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/hooks/useAuth';
import { upsertCourseProgress } from '@/lib/firestore';
import { NavBar } from '@/components/NavBar';
import { toast } from 'sonner';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const courses: Course[] = [
  {
    id: 'beginner-foundations',
    title: 'Beginner Foundations',
    description: 'Master the basics: grip, stance, and fundamental strokes',
    category: 'Foundations',
    difficulty: 'Beginner'
  },
  {
    id: 'consistency-basics',
    title: 'Consistency Basics',
    description: 'Build reliable shots and improve accuracy',
    category: 'Consistency',
    difficulty: 'Beginner'
  },
  {
    id: 'spin-fundamentals',
    title: 'Spin Fundamentals',
    description: 'Learn to add spin to your shots for better control',
    category: 'Spin',
    difficulty: 'Intermediate'
  },
  {
    id: 'power-development',
    title: 'Power Development',
    description: 'Increase shot power while maintaining control',
    category: 'Power',
    difficulty: 'Intermediate'
  },
  {
    id: 'advanced-strategy',
    title: 'Advanced Strategy',
    description: 'Game planning and tactical decision making',
    category: 'Strategy',
    difficulty: 'Advanced'
  },
  {
    id: 'footwork-mastery',
    title: 'Footwork Mastery',
    description: 'Improve movement and positioning on the court',
    category: 'Footwork',
    difficulty: 'Intermediate'
  }
];

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800'
};

export default function CoursesPage() {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load course progress from user document
    if (user) {
      // This would typically come from the user document
      // For now, we'll start with empty progress
      setCourseProgress({});
    }
  }, [user]);

  const handleCourseToggle = async (courseId: string, completed: boolean) => {
    if (!user) return;

    setLoading(prev => ({ ...prev, [courseId]: true }));
    
    try {
      await upsertCourseProgress(user.uid, courseId, completed);
      setCourseProgress(prev => ({ ...prev, [courseId]: completed }));
      
      if (completed) {
        toast.success('Course marked as completed! 🎉');
      } else {
        toast.info('Course marked as incomplete');
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
      toast.error('Failed to update progress. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const getCategoryCourses = (category: string) => {
    return courses.filter(course => course.category === category);
  };

  const getProgressPercentage = () => {
    if (courses.length === 0) return 0;
    const completed = Object.values(courseProgress).filter(Boolean).length;
    return Math.round((completed / courses.length) * 100);
  };

  const categories = ['Foundations', 'Consistency', 'Spin', 'Power', 'Strategy', 'Footwork'];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pickleball Courses</h1>
          <p className="text-gray-600 mt-2">
            Structured learning paths to improve your game
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-700">
                {getProgressPercentage()}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Object.values(courseProgress).filter(Boolean).length} of {courses.length} courses completed
            </p>
          </CardContent>
        </Card>

        {/* Course Categories */}
        <div className="space-y-8">
          {categories.map(category => {
            const categoryCourses = getCategoryCourses(category);
            if (categoryCourses.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCourses.map(course => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <Badge className={difficultyColors[course.difficulty]}>
                            {course.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">
                          {course.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={course.id}
                              checked={courseProgress[course.id] || false}
                              onChange={(e) => handleCourseToggle(course.id, e.target.checked)}
                              disabled={loading[course.id]}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                            />
                            <label htmlFor={course.id} className="text-sm font-medium text-gray-700">
                              {courseProgress[course.id] ? 'Completed' : 'Mark Complete'}
                            </label>
                          </div>
                          
                          {loading[course.id] && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>💡 Learning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium mb-2">🎯 Focus on One Area</p>
                <p>Complete courses in order and practice each skill before moving to the next.</p>
              </div>
              <div>
                <p className="font-medium mb-2">🏓 Practice Regularly</p>
                <p>Consistent practice is key to mastering new skills and techniques.</p>
              </div>
              <div>
                <p className="font-medium mb-2">📝 Track Your Progress</p>
                <p>Log your practice sessions to see how your skills improve over time.</p>
              </div>
              <div>
                <p className="font-medium mb-2">🤝 Play with Others</p>
                <p>Apply what you learn in real games to reinforce your understanding.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}














