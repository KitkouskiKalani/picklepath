'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase';

export function NavBar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-green-600">
              PicklePath
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/sessions" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Sessions
            </Link>
            <Link href="/tracks" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Tracks
            </Link>
            <Link href="/skills" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Skills
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Courses
            </Link>
            <Link href={`/share/${user.uid}`} className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Share
            </Link>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

