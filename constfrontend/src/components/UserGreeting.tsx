"use client";

import { useState, useEffect } from 'react';

interface UserGreetingProps {
  userName?: string; // Optional as it will come from auth system later
}

export default function UserGreeting({ userName }: UserGreetingProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="mb-8">
      <div className="text-3xl font-bold text-gray-100 mb-2">
        {getGreeting()}{userName ? `, ${userName}` : ''}
      </div>
      <div className="text-lg text-gray-400">
        {formatDate()} | {formatTime()}
      </div>
    </div>
  );
} 