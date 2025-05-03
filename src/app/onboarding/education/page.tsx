// app/onboarding/education/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function EducationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    educationLevel: '',
    preferredDegrees: ''
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
    console.log('Education information submitted:', formData);
    // Navigate to next step
    router.push('/onboarding/work-experience');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-10">Education</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="educationLevel" className="block text-white text-lg mb-2">
            Minimum education level
          </label>
          <div className="relative">
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              required
            >
              <option value="">Select level</option>
              <option value="high-school">High School</option>
              <option value="associates">Associate's Degree</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="doctorate">Doctorate</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="preferredDegrees" className="block text-white text-lg mb-2">
            Preferred degrees or fields (optional)
          </label>
          <input
            type="text"
            id="preferredDegrees"
            name="preferredDegrees"
            placeholder="e.g. Computer Science"
            value={formData.preferredDegrees}
            onChange={handleChange}
            className="w-full p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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