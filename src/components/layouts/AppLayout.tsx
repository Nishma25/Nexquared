// app/onboarding/layout.tsx
'use client';

import React, { ReactNode } from 'react';
import Sidebar from '@/components/layouts/Sidebar';

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0f0c1b]">
      {/* Left Sidebar - This should be the ONLY sidebar in your app */}
      <Sidebar currentStep={getCurrentStep()} />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

// Helper function to determine the current step based on the URL path
function getCurrentStep() {
  // This function runs on client side thanks to 'use client'
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    
    if (path.includes('/personal')) return 'personal';
    if (path.includes('/education')) return 'education';
    if (path.includes('/work-experience')) return 'work-experience';
    if (path.includes('/compliance')) return 'compliance';
    if (path.includes('/job-roles')) return 'job-roles';
    if (path.includes('/resume')) return 'resume';
  }
  
  // Default to first step if path can't be determined
  return 'personal';
}