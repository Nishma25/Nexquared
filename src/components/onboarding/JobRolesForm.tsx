// components/JobRolesForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface JobRolesFormData {
  jobRoles: string;
  skills: string;
  experienceRange: string;
}

interface JobRolesFormProps {
  initialData?: JobRolesFormData;
  onSubmit: (data: JobRolesFormData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const experienceRanges = [
  'Entry Level (0-2 years)',
  'Mid Level (3-5 years)',
  'Senior Level (6-9 years)',
  'Executive Level (10+ years)'
];

const JobRolesForm = ({
  initialData = { jobRoles: '', skills: '', experienceRange: '' },
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Job Roles, Skills & Experience Range',
  showTitle = true
}: JobRolesFormProps) => {
  const [formData, setFormData] = useState<JobRolesFormData>(initialData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
          <label htmlFor="jobRoles" className="block text-white text-base sm:text-lg mb-2">
            Job Roles
          </label>
          <input
            type="text"
            id="jobRoles"
            name="jobRoles"
            value={formData.jobRoles}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="e.g. Software Engineer, Product Manager"
          />
        </div>
        
        <div>
          <label htmlFor="skills" className="block text-white text-base sm:text-lg mb-2">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            rows={3}
            placeholder="e.g. JavaScript, React, Node.js, Project Management"
          />
        </div>
        
        <div>
          <label htmlFor="experienceRange" className="block text-white text-base sm:text-lg mb-2">
            Experience Range
          </label>
          <div className="relative">
            <select
              id="experienceRange"
              name="experienceRange"
              value={formData.experienceRange}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              required
            >
              <option value="">Select experience range</option>
              {experienceRanges.map((range, index) => (
                <option key={index} value={range}>{range}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
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

export default JobRolesForm;