'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/outline';

export interface ComplianceFormData {
  visaStatus: string;
  clearanceRequired: string;
  preferredStartDate: string;
  salaryRange: string;
  disability: string;
  race: string;
  veteranStatus: string;
  gender: string;
  jobTypes: string[];
}

interface ComplianceFormProps {
  initialData?: Partial<ComplianceFormData>;
  onSubmit: (data: ComplianceFormData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const JOB_TYPE_OPTIONS = [
  { id: 'full-time', label: 'Full Time' },
  { id: 'part-time', label: 'Part Time' },
  { id: 'remote', label: 'Remote' },
  { id: 'onsite', label: 'Onsite' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'contract', label: 'Contract' },
  { id: 'w2', label: 'W2' },
  { id: 'internship', label: 'Internship' },
  { id: 'temporary', label: 'Temporary' }
];

const ComplianceForm = ({
  initialData = {},
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Compliance & Preferences',
  showTitle = true
}: ComplianceFormProps) => {
  const defaultFormData: ComplianceFormData = {
    visaStatus: '',
    clearanceRequired: '',
    preferredStartDate: '',
    salaryRange: '',
    disability: '',
    race: '',
    veteranStatus: '',
    gender: '',
    jobTypes: []
  };

  const [formData, setFormData] = useState<ComplianceFormData>({
    ...defaultFormData,
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleJobTypeChange = (jobTypeId: string) => {
    setFormData(prev => {
      // If already selected, remove it
      if (prev.jobTypes.includes(jobTypeId)) {
        return {
          ...prev,
          jobTypes: prev.jobTypes.filter(id => id !== jobTypeId)
        };
      }
      
      // Add the job type
      return {
        ...prev,
        jobTypes: [...prev.jobTypes, jobTypeId]
      };
    });
    
    // Clear error for job types
    if (errors.jobTypes) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.jobTypes;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Add validation rules as needed
    if (!formData.visaStatus) newErrors.visaStatus = 'Visa status is required';
    if (!formData.clearanceRequired) newErrors.clearanceRequired = 'Clearance information is required';
    if (!formData.preferredStartDate) newErrors.preferredStartDate = 'Preferred start date is required';
    if (!formData.salaryRange) newErrors.salaryRange = 'Salary range is required';
    if (formData.jobTypes.length === 0) newErrors.jobTypes = 'Please select at least one job type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Format date for input display
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 ${className}`}>
      {showTitle && (
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
          {title}
        </h1>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5" aria-label="Compliance information form">
        {/* Job Types Selection */}
        <div className="form-group bg-[#181528] p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl text-white font-semibold mb-4">Job Types</h2>
          
          <div className="mb-2">
            <label className="block text-white text-base mb-3">
              Select job types you're interested in <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {JOB_TYPE_OPTIONS.map((jobType) => (
                <div key={jobType.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`job-type-${jobType.id}`}
                    checked={formData.jobTypes.includes(jobType.id)}
                    onChange={() => handleJobTypeChange(jobType.id)}
                    className="h-5 w-5 rounded bg-[#13111f] border-gray-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label 
                    htmlFor={`job-type-${jobType.id}`}
                    className="ml-2 block text-white text-sm"
                  >
                    {jobType.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.jobTypes && (
              <p className="text-red-500 text-sm mt-1">{errors.jobTypes}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Visa Status */}
          <div className="form-group">
            <label htmlFor="visaStatus" className="block text-white text-base font-medium mb-2">
              Visa Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="visaStatus"
                name="visaStatus"
                value={formData.visaStatus}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-required="true"
              >
                <option value="">Select status</option>
                <option value="citizen">US Citizen</option>
                <option value="green-card">Green Card</option>
                <option value="h1b">H1-B Visa</option>
                <option value="h1b">F1 Visa</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
            {errors.visaStatus && (
              <p className="text-red-500 text-sm mt-1">{errors.visaStatus}</p>
            )}
          </div>

          {/* Clearance Required */}
          <div className="form-group">
            <label htmlFor="clearanceRequired" className="block text-white text-base font-medium mb-2">
              Clearance Required <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="clearanceRequired"
                name="clearanceRequired"
                value={formData.clearanceRequired}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-required="true"
              >
                <option value="">Select clearance</option>
                <option value="none">None</option>
                <option value="public-trust">Public Trust</option>
                <option value="secret">Secret</option>
                <option value="top-secret">Top Secret</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
            {errors.clearanceRequired && (
              <p className="text-red-500 text-sm mt-1">{errors.clearanceRequired}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Veteran Status */}
          <div className="form-group">
            <label htmlFor="veteranStatus" className="block text-white text-base font-medium mb-2">
              Veteran Status
            </label>
            <div className="relative">
              <select
                id="veteranStatus"
                name="veteranStatus"
                value={formData.veteranStatus}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="not-veteran">Not a Veteran</option>
                <option value="veteran">Veteran</option>
                <option value="disabled-veteran">Disabled Veteran</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender" className="block text-white text-base font-medium mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferred Start Date */}
        <div className="form-group">
          <label htmlFor="preferredStartDate" className="block text-white text-base font-medium mb-2">
            Preferred Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              id="preferredStartDate"
              name="preferredStartDate"
              value={formatDateForInput(formData.preferredStartDate)}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              aria-required="true"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          {errors.preferredStartDate && (
            <p className="text-red-500 text-sm mt-1">{errors.preferredStartDate}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Salary Range */}
          <div className="form-group">
            <label htmlFor="salaryRange" className="block text-white text-base font-medium mb-2">
              Salary Range <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="salaryRange"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-required="true"
              >
                <option value="">Select range</option>
                <option value="50-75k">$50k - $75k</option>
                <option value="75-100k">$75k - $100k</option>
                <option value="100-150k">$100k - $150k</option>
                <option value="150k+">$150k+</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
            {errors.salaryRange && (
              <p className="text-red-500 text-sm mt-1">{errors.salaryRange}</p>
            )}
          </div>

          {/* Disability */}
          <div className="form-group">
            <label htmlFor="disability" className="block text-white text-base font-medium mb-2">
              Disability
            </label>
            <div className="relative">
              <select
                id="disability"
                name="disability"
                value={formData.disability}
                onChange={handleChange}
                className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Race */}
        <div className="form-group">
          <label htmlFor="race" className="block text-white text-base font-medium mb-2">
            Race
          </label>
          <div className="relative">
            <select
              id="race"
              name="race"
              value={formData.race}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#181528] border border-gray-700 rounded-lg text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#181528] shadow-lg"
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplianceForm;