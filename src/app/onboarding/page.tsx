// app/onboarding/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar, { OnboardingStep } from '@/components/layouts/Sidebar';
import PersonalInformationForm from '@/components/onboarding/PersonalInformationForm';
import EducationForm from '@/components/onboarding/EducationForm';
import WorkExperienceForm from '@/components/onboarding/WorkExperienceForm';
import ComplianceForm from '@/components/onboarding/ComplianceForm';
import JobRolesForm from '@/components/onboarding/JobRolesForm';
import ResumeUploadForm from '@/components/onboarding/ResumeUploadForm';

// Define the data structure for all form components
interface OnboardingData {
  personal: {
    fullName: string;
    companyName: string;
    businessEmail: string;
    phoneNumber: string;
    address: string;
  };
  education: {
    educationLevel: string;
    preferredDegrees: string;
  };
  workExperience: {
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
  };
  compliance: {
    visaStatus: string;
    clearanceRequired: string;
    preferredStartDate: string;
    salaryRange: string;
    disability: string;
    race: string;
  };
  jobRoles: {
    jobRoles: string;
    skills: string;
    experienceRange: string;
  };
  resume: File | null;
}

// Order of steps in the onboarding process
const STEPS_ORDER: OnboardingStep[] = [
  'personal',
  'education',
  'work-experience',
  'job-roles',
  'compliance',
  'resume'
];

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the current step from the URL or default to 'personal'
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(
    (searchParams?.get('step') as OnboardingStep) || 'personal'
  );
  
  // Initialize form data
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personal: {
      fullName: '',
      companyName: '',
      businessEmail: '',
      phoneNumber: '',
      address: ''
    },
    education: {
      educationLevel: '',
      preferredDegrees: ''
    },
    workExperience: {
      jobTitle: '',
      company: '',
      duration: '',
      description: ''
    },
    compliance: {
      visaStatus: '',
      clearanceRequired: '',
      preferredStartDate: '',
      salaryRange: '',
      disability: '',
      race: ''
    },
    jobRoles: {
      jobRoles: '',
      skills: '',
      experienceRange: ''
    },
    resume: null
  });
  
  // Track completed steps
  const [completedSteps, setCompletedSteps] = useState<Set<OnboardingStep>>(new Set());
  
  // Update URL when step changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('step', currentStep);
    window.history.pushState({}, '', url.toString());
  }, [currentStep]);
  
  // Update when URL param changes
  useEffect(() => {
    const step = searchParams?.get('step') as OnboardingStep;
    if (step && STEPS_ORDER.includes(step)) {
      setCurrentStep(step);
    }
  }, [searchParams]);
  
  // Handle step navigation
  const goToStep = (step: OnboardingStep) => {
    // Check if step is accessible (i.e., previous steps are completed or it's the current step)
    const currentStepIndex = STEPS_ORDER.indexOf(currentStep);
    const targetStepIndex = STEPS_ORDER.indexOf(step);
    
    if (targetStepIndex <= currentStepIndex || completedSteps.has(step)) {
      setCurrentStep(step);
    }
  };
  
  // Go to next step
  const goToNextStep = () => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    if (currentIndex < STEPS_ORDER.length - 1) {
      setCurrentStep(STEPS_ORDER[currentIndex + 1]);
    } else {
      // All steps completed, navigate to dashboard or completion page
      router.push('/dashboard');
    }
  };
  
  // Handle form submissions
  const handlePersonalSubmit = (data: any) => {
    setOnboardingData(prev => ({ ...prev, personal: data }));
    setCompletedSteps(prev => new Set(prev).add('personal'));
    goToNextStep();
  };
  
  const handleEducationSubmit = (data: any) => {
    setOnboardingData(prev => ({ ...prev, education: data }));
    setCompletedSteps(prev => new Set(prev).add('education'));
    goToNextStep();
  };
  
  const handleWorkExperienceSubmit = (data: any) => {
    setOnboardingData(prev => ({ ...prev, workExperience: data }));
    setCompletedSteps(prev => new Set(prev).add('work-experience'));
    goToNextStep();
  };
  
  const handleJobRolesSubmit = (data: any) => {
    setOnboardingData(prev => ({ ...prev, jobRoles: data }));
    setCompletedSteps(prev => new Set(prev).add('job-roles'));
    goToNextStep();
  };
  
  const handleComplianceSubmit = (data: any) => {
    setOnboardingData(prev => ({ ...prev, compliance: data }));
    setCompletedSteps(prev => new Set(prev).add('compliance'));
    goToNextStep();
  };
  
  const handleResumeSubmit = (file: File) => {
    setOnboardingData(prev => ({ ...prev, resume: file }));
    setCompletedSteps(prev => new Set(prev).add('resume'));
    
    // Call API to submit all collected data
    submitAllData();
    
    // Navigate to dashboard or completion page
    router.push('/dashboard');
  };
  
  // Submit all collected data to the backend
  const submitAllData = async () => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all form data
      formData.append('personalInfo', JSON.stringify(onboardingData.personal));
      formData.append('educationInfo', JSON.stringify(onboardingData.education));
      formData.append('workExperience', JSON.stringify(onboardingData.workExperience));
      formData.append('compliance', JSON.stringify(onboardingData.compliance));
      formData.append('jobRoles', JSON.stringify(onboardingData.jobRoles));
      
      // Add resume file if exists
      if (onboardingData.resume) {
        formData.append('resume', onboardingData.resume);
      }
      
      // Send data to backend
      // In a real application, you would send this to your Go backend
      console.log('Submitting all onboarding data:', formData);
      
      // Example API call to your Go backend:
      // const response = await fetch('/api/onboarding/submit', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit onboarding data');
      // }
      
      // Show success message
      alert('Onboarding completed successfully!');
      
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      alert('There was an error submitting your information. Please try again.');
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInformationForm
            initialData={onboardingData.personal}
            onSubmit={handlePersonalSubmit}
          />
        );
      case 'education':
        return (
          <EducationForm
            initialData={onboardingData.education}
            onSubmit={handleEducationSubmit}
          />
        );
      case 'work-experience':
        return (
          <WorkExperienceForm
            initialData={onboardingData.workExperience}
            onSubmit={handleWorkExperienceSubmit}
          />
        );
      case 'job-roles':
        return (
          <JobRolesForm
            initialData={onboardingData.jobRoles}
            onSubmit={handleJobRolesSubmit}
          />
        );
      case 'compliance':
        return (
          <ComplianceForm
            initialData={onboardingData.compliance}
            onSubmit={handleComplianceSubmit}
          />
        );
      case 'resume':
        return (
          <ResumeUploadForm
            onSubmit={handleResumeSubmit}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0F0C1D] flex">
      {/* Sidebar component */}
      <Sidebar 
        currentStep={currentStep} 
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />
      
      {/* Main content area */}
      <main className="flex-1 ml-16 md:ml-80 p-4 sm:p-6 md:p-10 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}