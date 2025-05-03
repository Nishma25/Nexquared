// components/layout/Sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Menu, X, ChevronRight, Check } from 'lucide-react';

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
}

// Define the Sidebar component props
interface SidebarProps {
  currentStep?: OnboardingStep;
  completedSteps?: Set<OnboardingStep>;
  onStepClick?: (step: OnboardingStep) => void;
}

export default function Sidebar({ 
  currentStep,
  completedSteps = new Set(), 
  onStepClick 
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [activeStep, setActiveStep] = useState<OnboardingStep>(
    currentStep || (searchParams?.get('step') as OnboardingStep) || 'personal'
  );
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Update active step when currentStep prop changes
  useEffect(() => {
    if (currentStep) {
      setActiveStep(currentStep);
    }
  }, [currentStep]);
  
  // Determine active step based on URL if currentStep is not provided
  useEffect(() => {
    if (currentStep) return;
    
    const step = searchParams?.get('step') as OnboardingStep;
    if (step) {
      setActiveStep(step);
    } else if (pathname === '/onboarding') {
      setActiveStep('personal');
    }
  }, [pathname, searchParams, currentStep]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, searchParams]);

  // Define the navigation items for the onboarding process
  const navItems: NavItem[] = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'education', label: 'Education' },
    { id: 'work-experience', label: 'Work Experience' },
    { id: 'job-roles', label: 'Job Roles & Skills' },
    { id: 'compliance', label: 'Compliance & Preferences' },
    { id: 'resume', label: 'Upload Resume' }
  ];

  // Helper function to determine if a step is completed
  const isStepCompleted = (step: OnboardingStep): boolean => {
    return completedSteps.has(step);
  };

  // Helper function to determine if a step is active
  const isStepActive = (step: OnboardingStep): boolean => {
    return step === activeStep;
  };

  // Helper function to determine if a step is accessible
  const isStepAccessible = (step: OnboardingStep): boolean => {
    const stepIndex = navItems.findIndex(item => item.id === step);
    const currentIndex = navItems.findIndex(item => item.id === activeStep);
    
    // A step is accessible if it's the current step, a completed step, or comes before the current step
    return stepIndex <= currentIndex || isStepCompleted(step);
  };

  // Handle step click
  const handleStepClick = (step: OnboardingStep) => {
    if (isStepAccessible(step)) {
      if (onStepClick) {
        onStepClick(step);
      } else {
        // Navigate to the step if no click handler is provided
        router.push(`/onboarding?step=${step}`);
      }
    }
  };

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button - always visible on mobile */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-[#0f0c1b] text-white focus:outline-none focus:ring-2 focus:ring-white"
          aria-expanded={isMobileOpen}
          aria-controls="sidebar-menu"
          aria-label="Toggle sidebar menu"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        id="sidebar-menu"
        className={`
          ${isExpanded ? 'w-80' : 'w-16'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          fixed left-0 top-0 h-full z-30
          bg-[#0f0c1b] border-r border-gray-800
          transition-all duration-300 ease-in-out
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo and toggle button */}
          <div className={`flex items-center justify-between p-4 ${isExpanded ? 'px-6' : 'px-3'}`}>
            {isExpanded && (
              <Link href="/" className="block ml-8 md:ml-0">
                <h1 className="text-2xl font-bold text-white">NEXQUARED</h1>
              </Link>
            )}
            
            {/* Toggle button - hidden on mobile */}
            <button
              onClick={toggleSidebar}
              className="hidden md:flex p-1.5 rounded-md bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <ChevronRight 
                className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                aria-hidden="true" 
              />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className={`flex-grow overflow-y-auto py-6 ${isExpanded ? 'px-6' : 'px-2'}`}>
            <div className="space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleStepClick(item.id)}
                  className={`
                    w-full flex items-center py-2 transition-colors
                    ${isStepActive(item.id)
                      ? 'text-indigo-400 font-medium'
                      : isStepCompleted(item.id)
                        ? 'text-green-400 hover:text-green-300'
                        : isStepAccessible(item.id)
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 pointer-events-none'
                    }
                  `}
                  disabled={!isStepAccessible(item.id)}
                  aria-current={isStepActive(item.id) ? 'step' : undefined}
                >
                  {!isExpanded ? (
                    <div className="w-full flex justify-center">
                      {isStepCompleted(item.id) ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <span className={`${isStepActive(item.id) ? 'text-indigo-400' : 'text-current'}`}>•</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center w-full">
                      <div className="mr-3">
                        {isStepCompleted(item.id) ? (
                          <div className="bg-green-500 bg-opacity-20 p-1 rounded-full">
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </div>
                        ) : null}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </nav>
          
          {/* Progress indicator */}
          {/* {isExpanded && (
            <div className="p-6 border-t border-gray-800">
              <div className="mb-2 flex justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span>{`${Array.from(completedSteps).length} of ${navItems.length}`}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${(Array.from(completedSteps).length / navItems.length) * 100}%` }}
                />
              </div>
            </div>
          )} */}
        </div>
      </aside>
    </>
  );
}