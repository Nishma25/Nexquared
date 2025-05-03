// components/WorkExperienceForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export interface WorkExperienceData {
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
}

interface WorkExperienceFormProps {
  initialData?: WorkExperienceData;
  onSubmit: (data: WorkExperienceData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const WorkExperienceForm = ({
  initialData = { jobTitle: '', company: '', duration: '', description: '' },
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Work Experience',
  showTitle = true
}: WorkExperienceFormProps) => {
  const [formData, setFormData] = useState<WorkExperienceData>(initialData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          <label htmlFor="jobTitle" className="block text-white text-base sm:text-lg mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-white text-base sm:text-lg mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-white text-base sm:text-lg mb-2">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="e.g. Jan 2022 - Present"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-white text-base sm:text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="Describe your responsibilities and achievements"
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

export default WorkExperienceForm;