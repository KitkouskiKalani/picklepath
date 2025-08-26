import { NextResponse } from 'next/server';

export async function GET() {
  // For now, return a simple placeholder
  // In production, you might want to generate dynamic OG images
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#10B981"/>
      <rect x="50" y="50" width="1100" height="530" rx="20" fill="white"/>
      <text x="600" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#1F2937">🏓 PicklePath</text>
      <text x="600" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" fill="#6B7280">Track Your Pickleball Journey</text>
      <text x="600" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#9CA3AF">Build streaks • Log sessions • Improve your game</text>
      <circle cx="300" cy="450" r="60" fill="#10B981"/>
      <circle cx="600" cy="450" r="60" fill="#3B82F6"/>
      <circle cx="900" cy="450" r="60" fill="#8B5CF6"/>
      <text x="300" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="white">🔥</text>
      <text x="600" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="white">📊</text>
      <text x="900" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="white">🎯</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}














