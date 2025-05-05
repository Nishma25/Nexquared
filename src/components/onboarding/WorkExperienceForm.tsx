'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentlyWorking: boolean;
  description: string;
}

export interface WorkExperienceFormData {
  workExperienceList: WorkExperience[];
}

interface WorkExperienceFormProps {
  initialData?: WorkExperienceFormData;
  onSubmit: (data: WorkExperienceFormData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate years from current year down to 50 years ago
const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

const WorkExperienceForm = ({
  initialData = { workExperienceList: [] },
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Work Experience',
  showTitle = true
}: WorkExperienceFormProps) => {
  // Function to generate unique IDs
  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Initialize with at least one empty work experience entry if none provided
  const [formData, setFormData] = useState<WorkExperienceFormData>(() => {
    // Check if workExperienceList exists and has entries
    if (!initialData.workExperienceList || initialData.workExperienceList.length === 0) {
      return {
        workExperienceList: [{
          id: generateId(),
          jobTitle: '',
          company: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          currentlyWorking: false,
          description: ''
        }]
      };
    }
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    formData.workExperienceList && formData.workExperienceList.length === 1 ? formData.workExperienceList[0].id : null
  );

  const handleExperienceChange = (id: string, field: keyof WorkExperience, value: any) => {
    setFormData(prev => ({
      ...prev,
      workExperienceList: prev.workExperienceList.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
    
    // Clear error for this field when user types
    if (errors[id]?.[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        if (newErrors[id]) {
          delete newErrors[id][field];
          // Remove the ID entry if no more errors
          if (Object.keys(newErrors[id]).length === 0) {
            delete newErrors[id];
          }
        }
        return newErrors;
      });
    }
  };

  const handleCurrentlyWorkingChange = (id: string, checked: boolean) => {
    // Update the currentlyWorking field
    handleExperienceChange(id, 'currentlyWorking', checked);
    
    // If checked, clear end date fields
    if (checked) {
      handleExperienceChange(id, 'endMonth', '');
      handleExperienceChange(id, 'endYear', '');
    }
  };

  const addExperience = () => {
    const newId = generateId();
    setFormData(prev => ({
      ...prev,
      workExperienceList: [
        ...prev.workExperienceList,
        {
          id: newId,
          jobTitle: '',
          company: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          currentlyWorking: false,
          description: ''
        }
      ]
    }));
    setExpandedExperience(newId);
  };

  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workExperienceList: prev.workExperienceList.filter(exp => exp.id !== id)
    }));
    
    // Clear errors for this experience entry
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[id];
      return newErrors;
    });
    
    // If the removed experience was expanded, collapse it
    if (expandedExperience === id) {
      setExpandedExperience(null);
    }
  };

  const toggleExperience = (id: string) => {
    setExpandedExperience(prev => prev === id ? null : id);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;
    
    formData.workExperienceList.forEach(exp => {
      const experienceErrors: Record<string, string> = {};
      
      // Required fields validation
      if (!exp.jobTitle.trim()) experienceErrors.jobTitle = 'Job title is required';
      if (!exp.company.trim()) experienceErrors.company = 'Company name is required';
      if (!exp.startMonth) experienceErrors.startMonth = 'Start month is required';
      if (!exp.startYear) experienceErrors.startYear = 'Start year is required';
      if (!exp.currentlyWorking) {
        if (!exp.endMonth) experienceErrors.endMonth = 'End month is required';
        if (!exp.endYear) experienceErrors.endYear = 'End year is required';
      }
      if (!exp.description.trim()) experienceErrors.description = 'Description is required';
      
      // Date validation
      if (exp.startYear && exp.endYear && !exp.currentlyWorking) {
        const startDate = new Date(`${exp.startMonth} 1, ${exp.startYear}`);
        const endDate = new Date(`${exp.endMonth} 1, ${exp.endYear}`);
        
        if (endDate < startDate) {
          experienceErrors.endYear = 'End date cannot be earlier than start date';
        }
      }
      
      if (Object.keys(experienceErrors).length > 0) {
        newErrors[exp.id] = experienceErrors;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Expand the first experience entry with errors
      const firstErrorId = Object.keys(errors)[0];
      if (firstErrorId) {
        setExpandedExperience(firstErrorId);
      }
    }
  };

  // Function to format duration string
  const formatDuration = (experience: WorkExperience): string => {
    const start = experience.startMonth && experience.startYear 
      ? `${experience.startMonth.substring(0, 3)} ${experience.startYear}`
      : '';
    
    const end = experience.currentlyWorking 
      ? 'Present'
      : (experience.endMonth && experience.endYear 
          ? `${experience.endMonth.substring(0, 3)} ${experience.endYear}`
          : '');
    
    if (start && end) {
      return `${start} - ${end}`;
    }
    return 'Duration not specified';
  };

  // Check if a work experience entry is complete (all required fields filled)
  const isExperienceComplete = (exp: WorkExperience): boolean => {
    const endDateComplete = exp.currentlyWorking || (!!exp.endMonth && !!exp.endYear);
    
    return (
      !!exp.jobTitle.trim() &&
      !!exp.company.trim() &&
      !!exp.startMonth &&
      !!exp.startYear &&
      endDateComplete &&
      !!exp.description.trim()
    );
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 ${className}`}>
      {showTitle && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-10">
          {title}
        </h1>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Work Experience List */}
        <div className="space-y-4">
          {formData.workExperienceList.map((experience) => {
            const isComplete = isExperienceComplete(experience);
            const isExpanded = expandedExperience === experience.id;
            
            return (
              <div 
                key={experience.id} 
                className="bg-[#181528] rounded-lg border border-gray-700 overflow-hidden"
              >
                {/* Work Experience Card Header */}
                <div 
                  className={`flex items-center justify-between p-4 cursor-pointer ${isComplete ? 'bg-[#1a192d]' : 'bg-[#181528]'}`}
                  onClick={() => toggleExperience(experience.id)}
                >
                  {isComplete ? (
                    <div className="text-white">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
                        <h3 className="font-medium">{experience.jobTitle} at {experience.company}</h3>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        {formatDuration(experience)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-white">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                        <h3 className="font-medium">
                          {experience.jobTitle || experience.company 
                            ? `${experience.jobTitle || 'Role'} at ${experience.company || 'Company'}`
                            : 'New Work Experience Entry'}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Incomplete - Click to edit</div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white transition-colors p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExperience(experience.id);
                      }}
                      aria-label={isExpanded ? 'Collapse work experience entry' : 'Expand work experience entry'}
                    >
                      <span className="text-xl">{isExpanded ? '−' : '+'}</span>
                    </button>
                    
                    {formData.workExperienceList.length > 1 && (
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeExperience(experience.id);
                        }}
                        aria-label="Remove work experience entry"
                      >
                        <span className="text-xl">×</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Work Experience Form Fields (expanded) */}
                {isExpanded && (
                  <div className="p-4 border-t border-gray-700">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`jobTitle-${experience.id}`} className="block text-white text-base mb-2">
                            Job Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id={`jobTitle-${experience.id}`}
                            value={experience.jobTitle}
                            onChange={(e) => handleExperienceChange(experience.id, 'jobTitle', e.target.value)}
                            className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Software Engineer"
                            aria-required="true"
                          />
                          {errors[experience.id]?.jobTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors[experience.id].jobTitle}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor={`company-${experience.id}`} className="block text-white text-base mb-2">
                            Company <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id={`company-${experience.id}`}
                            value={experience.company}
                            onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                            className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Google"
                            aria-required="true"
                          />
                          {errors[experience.id]?.company && (
                            <p className="text-red-500 text-sm mt-1">{errors[experience.id].company}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-white font-medium mb-2">Duration <span className="text-red-500">*</span></h3>
                        
                        {/* Start Date */}
                        <div className="mb-3">
                          <p className="text-white text-sm mb-2">Start Date</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor={`startMonth-${experience.id}`} className="sr-only">Start Month</label>
                              <select
                                id={`startMonth-${experience.id}`}
                                value={experience.startMonth}
                                onChange={(e) => handleExperienceChange(experience.id, 'startMonth', e.target.value)}
                                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                aria-required="true"
                              >
                                <option value="" disabled>Month</option>
                                {MONTHS.map((month) => (
                                  <option key={`start-${month}`} value={month}>{month}</option>
                                ))}
                              </select>
                              {errors[experience.id]?.startMonth && (
                                <p className="text-red-500 text-sm mt-1">{errors[experience.id].startMonth}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor={`startYear-${experience.id}`} className="sr-only">Start Year</label>
                              <select
                                id={`startYear-${experience.id}`}
                                value={experience.startYear}
                                onChange={(e) => handleExperienceChange(experience.id, 'startYear', e.target.value)}
                                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                aria-required="true"
                              >
                                <option value="" disabled>Year</option>
                                {YEARS.map((year) => (
                                  <option key={`start-${year}`} value={year}>{year}</option>
                                ))}
                              </select>
                              {errors[experience.id]?.startYear && (
                                <p className="text-red-500 text-sm mt-1">{errors[experience.id].startYear}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Currently Working Checkbox */}
                        <div className="mb-3">
                          <label className="inline-flex items-center text-white">
                            <input
                              type="checkbox"
                              checked={experience.currentlyWorking}
                              onChange={(e) => handleCurrentlyWorkingChange(experience.id, e.target.checked)}
                              className="rounded bg-[#13111f] border-gray-700 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                            />
                            <span className="ml-2">I currently work here</span>
                          </label>
                        </div>
                        
                        {/* End Date (hidden if currently working) */}
                        {!experience.currentlyWorking && (
                          <div>
                            <p className="text-white text-sm mb-2">End Date</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor={`endMonth-${experience.id}`} className="sr-only">End Month</label>
                                <select
                                  id={`endMonth-${experience.id}`}
                                  value={experience.endMonth}
                                  onChange={(e) => handleExperienceChange(experience.id, 'endMonth', e.target.value)}
                                  className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                  aria-required={!experience.currentlyWorking}
                                >
                                  <option value="" disabled>Month</option>
                                  {MONTHS.map((month) => (
                                    <option key={`end-${month}`} value={month}>{month}</option>
                                  ))}
                                </select>
                                {errors[experience.id]?.endMonth && (
                                  <p className="text-red-500 text-sm mt-1">{errors[experience.id].endMonth}</p>
                                )}
                              </div>
                              
                              <div>
                                <label htmlFor={`endYear-${experience.id}`} className="sr-only">End Year</label>
                                <select
                                  id={`endYear-${experience.id}`}
                                  value={experience.endYear}
                                  onChange={(e) => handleExperienceChange(experience.id, 'endYear', e.target.value)}
                                  className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                                  aria-required={!experience.currentlyWorking}
                                >
                                  <option value="" disabled>Year</option>
                                  {YEARS.map((year) => (
                                    <option key={`end-${year}`} value={year}>{year}</option>
                                  ))}
                                </select>
                                {errors[experience.id]?.endYear && (
                                  <p className="text-red-500 text-sm mt-1">{errors[experience.id].endYear}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor={`description-${experience.id}`} className="block text-white text-base mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id={`description-${experience.id}`}
                          value={experience.description}
                          onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                          rows={4}
                          className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe your responsibilities and achievements"
                          aria-required="true"
                        />
                        {errors[experience.id]?.description && (
                          <p className="text-red-500 text-sm mt-1">{errors[experience.id].description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Add Work Experience Button */}
        <div>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus:underline"
            aria-label="Add another work experience entry"
          >
            <span className="mr-2 text-xl">+</span>
            Add Role
          </button>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#13111f]"
            aria-label="Submit work experience information"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;