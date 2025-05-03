// components/layout/Sidebar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the step type for better type checking
export type OnboardingStep = 
  | 'personal' 
  | 'education' 
  | 'work-experience' 
  | 'compliance' 
  | 'job-roles' 
  | 'resume';

// Define each navigation item's structure
interface NavItem {
  id: OnboardingStep;
  label: string;
  path: string;
}

// Define the Sidebar component props
interface SidebarProps {
  currentStep?: OnboardingStep;
}

export default function Sidebar({ currentStep }: SidebarProps) {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState<OnboardingStep>('personal');
  
  // Determine active step based on pathname if currentStep is not provided
  useEffect(() => {
    if (currentStep) {
      setActiveStep(currentStep);
      return;
    }
    
    if (pathname?.includes('/personal')) setActiveStep('personal');
    else if (pathname?.includes('/education')) setActiveStep('education');
    else if (pathname?.includes('/work-experience')) setActiveStep('work-experience');
    else if (pathname?.includes('/compliance')) setActiveStep('compliance');
    else if (pathname?.includes('/job-roles')) setActiveStep('job-roles');
    else if (pathname?.includes('/resume')) setActiveStep('resume');
  }, [pathname, currentStep]);

  // Define the navigation items for the onboarding process
  const navItems: NavItem[] = [
    { id: 'personal', label: 'Personal Information', path: '/onboarding/personal' },
    { id: 'education', label: 'Education', path: '/onboarding/education' },
    { id: 'work-experience', label: 'Work Experience', path: '/onboarding/work-experience' },
    { id: 'compliance', label: 'Compliance & Preferences', path: '/onboarding/compliance' },
    { id: 'job-roles', label: 'Job Roles, Skills & Experience Range', path: '/onboarding/job-roles' },
    { id: 'resume', label: 'Upload Resume', path: '/onboarding/resume' }
  ];

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
    <aside className="w-80 min-h-screen bg-[#0f0c1b] border-r border-gray-800 p-6">
      {/* Logo */}
      <div className="mb-10">
        <Link href="/" className="block">
          <h1 className="text-2xl font-bold text-white">NEXQUARED</h1>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-5">
        {navItems.map((item) => (
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
  );
}