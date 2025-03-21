'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/services/auth_service';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const auth = isLoggedIn();
      setIsAuthenticated(auth);
      setLoading(false);
      
      if (!auth) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't render anything, we're redirecting
  }

  return <>{children}</>;
} 