// app/onboarding/compliance/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function CompliancePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    visaStatus: '',
    clearanceRequired: '',
    preferredStartDate: '',
    salaryRange: '',
    disability: '',
    race: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Compliance information submitted:', formData);
    // Navigate to next step
    router.push('/onboarding/job-roles');
  };

  return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">Compliance & Preferences</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="visaStatus" className="block text-white text-lg mb-2">
              Visa Status
            </label>
            <div className="relative">
              <select
                id="visaStatus"
                name="visaStatus"
                value={formData.visaStatus}
                onChange={handleChange}
                className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              >
                <option value="">Select status</option>
                <option value="citizen">US Citizen</option>
                <option value="green-card">Green Card</option>
                <option value="h1b">H1-B Visa</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="clearanceRequired" className="block text-white text-lg mb-2">
              Clearance Required
            </label>
            <div className="relative">
              <select
                id="clearanceRequired"
                name="clearanceRequired"
                value={formData.clearanceRequired}
                onChange={handleChange}
                className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              >
                <option value="">Select clearance</option>
                <option value="none">None</option>
                <option value="public-trust">Public Trust</option>
                <option value="secret">Secret</option>
                <option value="top-secret">Top Secret</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="preferredStartDate" className="block text-white text-lg mb-2">
              Preferred Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="preferredStartDate"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleChange}
                className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="salaryRange" className="block text-white text-lg mb-2">
                Salary Range
              </label>
              <div className="relative">
                <select
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                >
                  <option value="">Select range</option>
                  <option value="50-75k">$50k - $75k</option>
                  <option value="75-100k">$75k - $100k</option>
                  <option value="100-150k">$100k - $150k</option>
                  <option value="150k+">$150k+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="disability" className="block text-white text-lg mb-2">
                Disability
              </label>
              <div className="relative">
                <select
                  id="disability"
                  name="disability"
                  value={formData.disability}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                >
                  <option value="">Select option</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="race" className="block text-white text-lg mb-2">
              Race
            </label>
            <div className="relative">
              <select
                id="race"
                name="race"
                value={formData.race}
                onChange={handleChange}
                className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              >
                <option value="">Select race</option>
                <option value="white">White</option>
                <option value="black">Black or African American</option>
                <option value="asian">Asian</option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="native">American Indian or Alaska Native</option>
                <option value="pacific">Native Hawaiian or Pacific Islander</option>
                <option value="multiple">Two or More Races</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
  );
}