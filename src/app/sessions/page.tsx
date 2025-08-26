'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NewSessionDrawer } from './components/NewSessionDrawer';
import { useSessions } from '@/lib/hooks/useSessions';
import { useAuth } from '@/lib/hooks/useAuth';
import { NavBar } from '@/components/NavBar';

export default function SessionsPage() {
  const { user } = useAuth();
  const { sessions, loading } = useSessions();
  const [showNewSession, setShowNewSession] = useState(false);

  const focusColors = {
    drills: 'bg-blue-100 text-blue-800',
    matches: 'bg-green-100 text-green-800',
    serves: 'bg-purple-100 text-purple-800',
    dinks: 'bg-yellow-100 text-yellow-800',
    footwork: 'bg-red-100 text-red-800',
    strategy: 'bg-indigo-100 text-indigo-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
            <p className="text-gray-600 mt-2">
              Track your pickleball practice and progress
            </p>
          </div>
          <Button 
            onClick={() => setShowNewSession(true)}
            size="lg"
          >
            🏓 Log New Session
          </Button>
        </div>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No sessions yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start tracking your pickleball journey by logging your first session
              </p>
              <Button 
                onClick={() => setShowNewSession(true)}
                size="lg"
              >
                Log Your First Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge 
                          className={focusColors[session.focus]}
                        >
                          {session.focus.charAt(0).toUpperCase() + session.focus.slice(1)}
                        </Badge>
                        <span className="text-2xl font-bold text-green-600">
                          {session.minutes}m
                        </span>
                        <span className="text-gray-500">
                          {session.date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {session.issues.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Issues to work on:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.issues.map((issue, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {issue}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {session.wentWell.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">What went well:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.wentWell.map((item, i) => (
                              <Badge key={i} variant="default" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {session.notes.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Notes:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {session.notes.join('\n')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <NewSessionDrawer
        isOpen={showNewSession}
        onClose={() => setShowNewSession(false)}
        onSessionAdded={() => {
          // The useSessions hook will automatically update
        }}
      />
    </div>
  );
}














