"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white landing-page overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Floating Elements - Constrained to prevent overflow */}
        <div className="absolute top-20 left-4 lg:left-10 w-4 h-4 bg-[#00BFA6] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-4 lg:right-20 w-6 h-6 bg-[#FF5A5F] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-40 left-4 lg:left-20 w-3 h-3 bg-white rounded-full animate-pulse opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#00BFA6]/20 border border-[#00BFA6]/30 text-[#00BFA6] text-sm font-semibold mb-8 animate-float">
              🏓 #1 Pickleball Training Platform
            </div>
            <h1 className="hero-title font-black tracking-tight mb-8 leading-tight">
              MASTER PICKLEBALL
              <span className="block text-[#00BFA6] mt-2">LIKE A PRO</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your game with proven training methods, personalized skill tracking, and guaranteed improvement. Join thousands of players who&apos;ve leveled up their pickleball skills.
            </p>
          </div>
          
          {/* Guarantee Icons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-10 h-10 bg-[#00BFA6] rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-white text-xl font-bold">🗺️</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">Structured Coaching System</span>
                <span className="text-sm text-gray-300">Step-by-step path from beginner to 4.0 — every skill in the right order.</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-10 h-10 bg-[#FF5A5F] rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-white text-xl font-bold">📚</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">One Resource, All You Need</span>
                <span className="text-sm text-gray-300">No more piecing together random YouTube videos — we&apos;ve built your complete training plan.</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="space-y-6 flex flex-col items-center">
            <Link href="/signup" className="w-full max-w-sm sm:max-w-none">
              <Button className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white text-lg sm:text-xl lg:text-2xl px-6 sm:px-12 lg:px-16 py-6 sm:py-8 rounded-2xl font-black transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#00BFA6]/25 hover:shadow-[#00BFA6]/40">
                START TRAINING NOW
              </Button>
            </Link>
            <p className="text-gray-400 text-lg font-medium text-center">Join 15,000+ players already improving</p>
          </div>
        </div>
      </section>

      {/* PicklePath Journey Map */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              YOUR JOURNEY TO
              <span className="block text-[#00BFA6]">4.0</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Follow the proven PicklePath system from your first day on court to advanced competitive play.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              One plan. One path. Every skill you need — in the right order, at the right time.
            </p>
          </div>
          
          {/* Journey Steps with Connecting Lines */}
          <div className="relative">
            {/* Desktop Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#00BFA6] to-[#00BFA6] transform -translate-y-1/2 z-0"></div>
            <div className="hidden md:block absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-[#00BFA6] transform -translate-x-1/2 -translate-y-1/2 rounded-full z-10"></div>
            

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="text-center group relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00BFA6] to-[#00BFA6]/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-[#00BFA6]/20">
                  <span className="text-4xl">🎯</span>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-[#00BFA6] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">STEP 1</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Structured Video Lessons</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Learn skills in the correct order with easy-to-follow videos from experienced coaches. No more hunting through random clips — we guide you every step.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center group relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#FF5A5F] to-[#FF5A5F]/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-[#FF5A5F]/20">
                  <span className="text-4xl">🏓</span>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-[#FF5A5F] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">STEP 2</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Targeted Practice Plans</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Lock in new skills with drills designed for your level. Each week&apos;s plan builds on the last for consistent improvement.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center group relative">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-slate-600/20">
                  <span className="text-4xl">🏆</span>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-slate-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">STEP 3</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Match Play Challenges</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Apply your training in real games. Track your progress and watch your rating climb toward 4.0.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PicklePath System Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Elements - Constrained to prevent overflow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-20 right-4 lg:right-10 w-32 h-32 bg-[#00BFA6]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-4 lg:left-10 w-40 h-40 bg-[#FF5A5F]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              OUR PROVEN PATH TO
              <span className="block text-[#00BFA6] mt-2">PICKLEBALL SUCCESS</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
              We&apos;ve built PicklePath to remove the guesswork from your training. Follow our step-by-step system and you&apos;ll see measurable improvement — from your first week on court to your next tournament.
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-3xl lg:text-4xl font-black mb-12 text-[#00BFA6]">The PicklePath System:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-[#00BFA6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-2xl font-black mb-4">Track Your Game</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                AI-powered skill analytics show exactly where you stand.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-[#FF5A5F] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-2xl font-black mb-4">Train with Purpose</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                Drills and strategy tailored to your strengths & weaknesses.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="text-2xl font-black mb-4">Test & Triumph</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                Apply your new skills in challenges and real matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
              EARLY ACCESS
              <span className="block text-[#00BFA6]">FEEDBACK</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reactions from players testing the PicklePath system before launch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 relative card-hover">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-[#00BFA6] rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-xl font-bold">&quot;</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 mt-4 font-medium">
                &quot;The structure makes it so easy to follow — I don&apos;t have to guess what to work on next.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#00BFA6]/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">BT</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Beta Tester</div>
                  <div className="text-gray-500 font-medium">Recreational Player</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 relative card-hover">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-xl font-bold">&quot;</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 mt-4 font-medium">
                &quot;The drills are exactly what I needed to improve my consistency. Every week I feel progress.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF5A5F] to-[#FF5A5F]/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">EA</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Early Access Member</div>
                  <div className="text-gray-500 font-medium">3.0 Player</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 relative card-hover">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-xl font-bold">&quot;</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 mt-4 font-medium">
                &quot;I&apos;ve stopped wasting time searching for videos — everything I need is right here.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">FM</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Founding Member</div>
                  <div className="text-gray-500 font-medium">Community Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Elements - Constrained to prevent overflow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-40 left-4 lg:left-20 w-24 h-24 bg-[#00BFA6]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-4 lg:right-20 w-32 h-32 bg-[#FF5A5F]/10 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              JOIN OUR FOUNDING
              <span className="block text-[#00BFA6] mt-2">PLAYER GROUP</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed mb-12">
              Be one of the first to experience PicklePath and help shape the future of pickleball training. Get early access to our complete coaching system and exclusive community events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#00BFA6]/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">📈</span>
              </div>
              <h3 className="text-2xl font-black mb-4">Skill Tracking</h3>
              <p className="text-lg text-gray-400 font-medium">Monitor your progress with detailed analytics and insights.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#FF5A5F]/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-2xl font-black mb-4">Personalized Training</h3>
              <p className="text-lg text-gray-400 font-medium">Custom lessons based on your skill level and goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            READY TO TRANSFORM
            <span className="block text-[#00BFA6]">YOUR GAME?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of players who are already improving their pickleball skills with PicklePath
          </p>
          <div className="space-y-6 flex flex-col items-center">
            <Link href="/signup" className="w-full max-w-sm sm:max-w-none">
              <Button className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white text-lg sm:text-xl lg:text-2xl px-6 sm:px-12 lg:px-16 py-6 sm:py-8 rounded-2xl font-black transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#00BFA6]/25 hover:shadow-[#00BFA6]/40">
                START YOUR JOURNEY NOW
              </Button>
            </Link>
            <p className="text-gray-500 font-medium text-center">30-day money-back guarantee • No risk</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-black text-[#00BFA6] mb-6">PicklePath</div>
              <p className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed">
                The ultimate platform for pickleball skill development. Transform your game with proven training methods and guaranteed results.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-[#00BFA6]/20 rounded-xl flex items-center justify-center hover:bg-[#00BFA6]/30 transition-colors cursor-pointer">
                  <span className="text-[#00BFA6] text-xl">📧</span>
                </div>
                <div className="w-12 h-12 bg-[#00BFA6]/20 rounded-xl flex items-center justify-center hover:bg-[#00BFA6]/30 transition-colors cursor-pointer">
                  <span className="text-[#00BFA6] text-xl">📱</span>
                </div>
                <div className="w-12 h-12 bg-[#00BFA6] text-xl rounded-xl flex items-center justify-center hover:bg-[#00BFA6]/30 transition-colors cursor-pointer">
                  <span className="text-[#00BFA6] text-xl">📺</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Training</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/tracks" className="hover:text-[#00BFA6] transition-colors font-medium">Training Tracks</Link></li>
                <li><Link href="/lessons" className="hover:text-[#00BFA6] transition-colors font-medium">Lessons</Link></li>
                <li><Link href="/drills" className="hover:text-[#00BFA6] transition-colors font-medium">Drills</Link></li>
                <li><Link href="/strategy" className="hover:text-[#00BFA6] transition-colors font-medium">Strategy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-[#00BFA6] transition-colors font-medium">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-[#00BFA6] transition-colors font-medium">Contact Us</Link></li>
                <li><Link href="/guarantee" className="hover:text-[#00BFA6] transition-colors font-medium">Our Guarantee</Link></li>
                <li><Link href="/faq" className="hover:text-[#00BFA6] transition-colors font-medium">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base font-medium">
              © 2024 PicklePath. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-[#00BFA6] text-base font-medium transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#00BFA6] text-base font-medium transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
