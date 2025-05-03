// components/EducationForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface EducationFormData {
  educationLevel: string;
  preferredDegrees: string;
}

interface EducationFormProps {
  initialData?: EducationFormData;
  onSubmit: (data: EducationFormData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const EducationForm = ({
  initialData = { educationLevel: '', preferredDegrees: '' },
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Education',
  showTitle = true
}: EducationFormProps) => {
  const [formData, setFormData] = useState<EducationFormData>(initialData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {showTitle && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-10">
          {title}
        </h1>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="educationLevel" className="block text-white text-base sm:text-lg mb-2">
            Minimum education level
          </label>
          <div className="relative">
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
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
          <label htmlFor="preferredDegrees" className="block text-white text-base sm:text-lg mb-2">
            Preferred degrees or fields (optional)
          </label>
          <input
            type="text"
            id="preferredDegrees"
            name="preferredDegrees"
            placeholder="e.g. Computer Science"
            value={formData.preferredDegrees}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;