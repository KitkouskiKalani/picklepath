'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { EnhancedInput } from '@/components/ui/EnhancedInput';
import AuthLayout from '@/components/AuthLayout';
import { auth } from '@/lib/firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      let message = 'We couldn\'t sign you in. Check your email and password.';
      
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again in a few minutes.';
      }
      
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Google login error:', error);
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const hasAppleAuth = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;

  return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Sign in to continue your coaching journey."
      micro="Access your personalized training plan and track your progress to 4.0"
    >
      <form onSubmit={handleEmailLogin} className="space-y-6">
        <EnhancedInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          autoComplete="email"
          error={errors.email}
          isInvalid={!!errors.email}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className={`flex h-11 w-full rounded-lg border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFA6]/60 focus-visible:border-[#00BFA6] disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.password ? 'border-red-500 focus-visible:ring-red-500/60 focus-visible:border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[#00BFA6] hover:text-[#00BFA6]/80 font-medium">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:brightness-110 active:translate-y-[1px] shadow-lg shadow-[#00BFA6]/25"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-[#00BFA6] hover:text-[#00BFA6]/80 font-bold">
            Sign up
          </Link>
        </p>
      </div>

      {/* Reassurance Block */}
      <div className="mt-8 p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200/60 shadow-lg">
        <h4 className="text-lg font-bold text-slate-900 mb-6 text-center">Your Training Dashboard</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-[#00BFA6] rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">🎯</span>
            </div>
            <div>
              <span className="text-slate-900 font-semibold text-sm">Personalized Drills</span>
              <p className="text-slate-600 text-xs mt-1">Access your weekly training plans</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-10 h-10 bg-[#FF5A5F] rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">📊</span>
            </div>
            <div>
              <span className="text-slate-900 font-semibold text-sm">Progress Tracking</span>
              <p className="text-slate-600 text-xs mt-1">Monitor streaks and rating progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Sign-in */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:border-[#00BFA6] text-gray-700 hover:text-[#00BFA6] font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 bg-white hover:bg-[#00BFA6]/5"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {hasAppleAuth && (
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-gray-300 hover:border-[#00BFA6] text-gray-700 hover:text-[#00BFA6] font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 bg-white hover:bg-[#00BFA6]/5"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </Button>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
