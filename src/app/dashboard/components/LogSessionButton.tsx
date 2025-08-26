'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function LogSessionButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/log')}
      size="lg"
      className="bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-brand-teal/25 focus:ring-2 focus:ring-brand-teal/60 focus:ring-offset-2"
    >
      📝 Log Session
    </Button>
  );
}



