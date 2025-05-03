// src/app/page.tsx
import Navbar from '@/components/layouts/Navbar';
import Features from '@/components/sections/Features';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-nexquared-gradient text-white flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          Connecting Talent 
          <br />
          with Hiring Clients
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
          Streamline job matching, profile management,
          <br />
          and real-time application insights.
        </p>
        
        <Button href="/get-started" variant="primary" size="lg">
          Get Started
        </Button>
      </main>

      {/* Features Section */}
      <Features />
    </div>
  );
}