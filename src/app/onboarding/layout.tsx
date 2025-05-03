// app/onboarding/layout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface OnboardingLayoutProps {
  children: ReactNode;
}

type OnboardingStep = 
  | 'personal' 
  | 'education' 
  | 'work-experience' 
  | 'compliance' 
  | 'job-roles' 
  | 'resume';

interface NavItem {
  id: OnboardingStep;
  label: string;
  path: string;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState<OnboardingStep>('personal');
  
  // Navigation items
  const navItems: NavItem[] = [
    { id: 'personal', label: 'Personal Information', path: '/onboarding/personal' },
    { id: 'education', label: 'Education', path: '/onboarding/education' },
    { id: 'work-experience', label: 'Work Experience', path: '/onboarding/work-experience' },
    { id: 'compliance', label: 'Compliance & Preferences', path: '/onboarding/compliance' },
    { id: 'job-roles', label: 'Job Roles, Skills & Experience', path: '/onboarding/job-roles' },
    { id: 'resume', label: 'Upload Resume', path: '/onboarding/resume' }
  ];
  
  // Determine active step based on pathname
  useEffect(() => {
    if (pathname?.includes('/personal')) setActiveStep('personal');
    else if (pathname?.includes('/education')) setActiveStep('education');
    else if (pathname?.includes('/work-experience')) setActiveStep('work-experience');
    else if (pathname?.includes('/compliance')) setActiveStep('compliance');
    else if (pathname?.includes('/job-roles')) setActiveStep('job-roles');
    else if (pathname?.includes('/resume')) setActiveStep('resume');
  }, [pathname]);

  // Helper function to determine if a step is completed
  const isStepCompleted = (step: OnboardingStep): boolean => {
    const stepIndex = navItems.findIndex(item => item.id === step);
    const currentIndex = navItems.findIndex(item => item.id === activeStep);
    return stepIndex < currentIndex;
  };

  // Helper function to determine if a step is active
  const isStepActive = (step: OnboardingStep): boolean => {
    return step === activeStep;
  };

  // Helper function to determine if a step is accessible
  const isStepAccessible = (step: OnboardingStep): boolean => {
    const stepIndex = navItems.findIndex(item => item.id === step);
    const currentIndex = navItems.findIndex(item => item.id === activeStep);
    return stepIndex <= currentIndex;
  };

  return (
    <div className="flex min-h-screen bg-[#0f0c1b]">
      {/* Sidebar */}
      <aside className="w-80 min-h-screen bg-[#0f0c1b] border-r border-gray-800 p-6">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold text-white lowercase">nexquared</h1>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-5">
          {navItems.map((item, index) => (
            <Link
              key={item.id}
              href={isStepAccessible(item.id) ? item.path : '#'}
              className={`block py-2 transition-colors ${
                isStepActive(item.id)
                  ? 'text-white font-medium'
                  : isStepCompleted(item.id)
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 pointer-events-none'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}