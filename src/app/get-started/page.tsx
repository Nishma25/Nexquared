// src/app/get-started/page.tsx
import Navbar from '@/components/layouts/Navbar';
import Button from '@/components/ui/Button';

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-nexquared-gradient text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Get Started with Nexquared
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Choose your account type to get started with Nexquared's talent connection platform.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <Button href="/signup/client" variant="primary" size="lg">
            I'm a Client
          </Button>
          
          <Button href="/signup/employee" variant="outline" size="lg">
            I'm an Employee
          </Button>
        </div>
      </main>
    </div>
  );
}