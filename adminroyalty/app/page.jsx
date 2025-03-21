'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/calculate');
  }, [router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to calculator...</p>
    </div>
  );
} 