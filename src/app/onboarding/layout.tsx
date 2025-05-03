// app/onboarding/layout.tsx
import { ReactNode } from 'react';

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F0C1D]">
      {children}
    </div>
  );
}