'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export interface Education {
  id: string;
  university: string;
  graduationMonth: string;
  graduationYear: string;
  degree: string;
  major: string;
  cgpa: string;
}

export interface EducationFormData {
  educationList: Education[];
}

interface EducationFormProps {
  initialData?: EducationFormData;
  onSubmit: (data: EducationFormData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const DEGREE_OPTIONS = [
  "Associate's Degree",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Bachelor of Engineering (BE)",
  "Bachelor of Technology (BTech)",
  "Bachelor of Business Administration (BBA)",
  "Master of Arts (MA)",
  "Master of Science (MS)",
  "Master of Business Administration (MBA)",
  "Master of Engineering (ME)",
  "Master of Technology (MTech)",
  "Doctor of Philosophy (PhD)",
  "Doctor of Medicine (MD)",
  "Juris Doctor (JD)",
  "Other"
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate years from current year down to 50 years ago
const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

const EducationForm = ({
  initialData = { educationList: [] },
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Education',
  showTitle = true
}: EducationFormProps) => {
  // Initialize with at least one empty education entry if none provided
  const [formData, setFormData] = useState<EducationFormData>(() => {
    // Check if educationList exists and has entries
    if (!initialData.educationList || initialData.educationList.length === 0) {
      return {
        educationList: [{
          id: generateId(),
          university: '',
          graduationMonth: '',
          graduationYear: '',
          degree: '',
          major: '',
          cgpa: ''
        }]
      };
    }
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [expandedEducation, setExpandedEducation] = useState<string | null>(
    formData.educationList && formData.educationList.length === 1 ? formData.educationList[0].id : null
  );

  // Generate a unique ID for new education entries
  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      educationList: prev.educationList.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
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

  const addEducation = () => {
    const newId = generateId();
    setFormData(prev => ({
      ...prev,
      educationList: [
        ...prev.educationList,
        {
          id: newId,
          university: '',
          graduationMonth: '',
          graduationYear: '',
          degree: '',
          major: '',
          cgpa: ''
        }
      ]
    }));
    setExpandedEducation(newId);
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      educationList: prev.educationList.filter(edu => edu.id !== id)
    }));
    
    // Clear errors for this education entry
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[id];
      return newErrors;
    });
    
    // If the removed education was expanded, collapse it
    if (expandedEducation === id) {
      setExpandedEducation(null);
    }
  };

  const toggleEducation = (id: string) => {
    setExpandedEducation(prev => prev === id ? null : id);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;
    
    formData.educationList.forEach(edu => {
      const educationErrors: Record<string, string> = {};
      
      // Required fields validation
      if (!edu.university.trim()) educationErrors.university = 'University name is required';
      if (!edu.graduationMonth) educationErrors.graduationMonth = 'Graduation month is required';
      if (!edu.graduationYear) educationErrors.graduationYear = 'Graduation year is required';
      if (!edu.degree) educationErrors.degree = 'Degree is required';
      if (!edu.major.trim()) educationErrors.major = 'Major is required';
      
      // CGPA validation - must be a number between 0 and 4 or 0 and 10 (common scales)
      if (edu.cgpa.trim()) {
        const cgpaValue = parseFloat(edu.cgpa);
        if (isNaN(cgpaValue)) {
          educationErrors.cgpa = 'CGPA must be a number';
        } else if (cgpaValue < 0) {
          educationErrors.cgpa = 'CGPA cannot be negative';
        } else if (cgpaValue > 10) {
          educationErrors.cgpa = 'CGPA cannot be greater than 10';
        }
      } else {
        educationErrors.cgpa = 'CGPA is required';
      }
      
      if (Object.keys(educationErrors).length > 0) {
        newErrors[edu.id] = educationErrors;
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
      // Expand the first education entry with errors
      const firstErrorId = Object.keys(errors)[0];
      if (firstErrorId) {
        setExpandedEducation(firstErrorId);
      }
    }
  };

  // Check if an education entry is complete (all required fields filled)
  const isEducationComplete = (edu: Education): boolean => {
    return (
      !!edu.university.trim() &&
      !!edu.graduationMonth &&
      !!edu.graduationYear &&
      !!edu.degree &&
      !!edu.major.trim() &&
      !!edu.cgpa.trim()
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
        {/* Education List */}
        <div className="space-y-4">
          {formData.educationList.map((education) => {
            const isComplete = isEducationComplete(education);
            const isExpanded = expandedEducation === education.id;
            
            return (
              <div 
                key={education.id} 
                className="bg-[#181528] rounded-lg border border-gray-700 overflow-hidden"
              >
                {/* Education Card Header */}
                <div 
                  className={`flex items-center justify-between p-4 cursor-pointer ${isComplete ? 'bg-[#1a192d]' : 'bg-[#181528]'}`}
                  onClick={() => toggleEducation(education.id)}
                >
                  {isComplete ? (
                    <div className="text-white">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
                        <h3 className="font-medium">{education.university}</h3>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        {education.degree} in {education.major} • Graduated {education.graduationMonth} {education.graduationYear}
                      </div>
                    </div>
                  ) : (
                    <div className="text-white">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                        <h3 className="font-medium">
                          {education.university ? education.university : 'New Education Entry'}
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
                        toggleEducation(education.id);
                      }}
                      aria-label={isExpanded ? 'Collapse education entry' : 'Expand education entry'}
                    >
                      <span className="text-xl">{isExpanded ? '−' : '+'}</span>
                    </button>
                    
                    {formData.educationList.length > 1 && (
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEducation(education.id);
                        }}
                        aria-label="Remove education entry"
                      >
                        <span className="text-xl">×</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Education Form Fields (expanded) */}
                {isExpanded && (
                  <div className="p-4 border-t border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor={`university-${education.id}`} className="block text-white text-base mb-2">
                          University <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`university-${education.id}`}
                          value={education.university}
                          onChange={(e) => handleEducationChange(education.id, 'university', e.target.value)}
                          className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Harvard University"
                          aria-required="true"
                        />
                        {errors[education.id]?.university && (
                          <p className="text-red-500 text-sm mt-1">{errors[education.id].university}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={`graduationMonth-${education.id}`} className="block text-white text-base mb-2">
                            Graduation Month <span className="text-red-500">*</span>
                          </label>
                          <select
                            id={`graduationMonth-${education.id}`}
                            value={education.graduationMonth}
                            onChange={(e) => handleEducationChange(education.id, 'graduationMonth', e.target.value)}
                            className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                            aria-required="true"
                          >
                            <option value="" disabled>Select month</option>
                            {MONTHS.map((month) => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                          {errors[education.id]?.graduationMonth && (
                            <p className="text-red-500 text-sm mt-1">{errors[education.id].graduationMonth}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor={`graduationYear-${education.id}`} className="block text-white text-base mb-2">
                            Graduation Year <span className="text-red-500">*</span>
                          </label>
                          <select
                            id={`graduationYear-${education.id}`}
                            value={education.graduationYear}
                            onChange={(e) => handleEducationChange(education.id, 'graduationYear', e.target.value)}
                            className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                            aria-required="true"
                          >
                            <option value="" disabled>Select year</option>
                            {YEARS.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                          {errors[education.id]?.graduationYear && (
                            <p className="text-red-500 text-sm mt-1">{errors[education.id].graduationYear}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor={`degree-${education.id}`} className="block text-white text-base mb-2">
                          Degree <span className="text-red-500">*</span>
                        </label>
                        <select
                          id={`degree-${education.id}`}
                          value={education.degree}
                          onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                          className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                          aria-required="true"
                        >
                          <option value="" disabled>Select degree</option>
                          {DEGREE_OPTIONS.map((degree) => (
                            <option key={degree} value={degree}>{degree}</option>
                          ))}
                        </select>
                        {errors[education.id]?.degree && (
                          <p className="text-red-500 text-sm mt-1">{errors[education.id].degree}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor={`major-${education.id}`} className="block text-white text-base mb-2">
                          Major <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`major-${education.id}`}
                          value={education.major}
                          onChange={(e) => handleEducationChange(education.id, 'major', e.target.value)}
                          className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Computer Science"
                          aria-required="true"
                        />
                        {errors[education.id]?.major && (
                          <p className="text-red-500 text-sm mt-1">{errors[education.id].major}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor={`cgpa-${education.id}`} className="block text-white text-base mb-2">
                          CGPA <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`cgpa-${education.id}`}
                          value={education.cgpa}
                          onChange={(e) => handleEducationChange(education.id, 'cgpa', e.target.value)}
                          className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="3.8"
                          aria-required="true"
                        />
                        {errors[education.id]?.cgpa && (
                          <p className="text-red-500 text-sm mt-1">{errors[education.id].cgpa}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Add Education Button */}
        <div>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus:underline"
            aria-label="Add another education entry"
          >
            <span className="mr-2 text-xl">+</span>
            Add Education
          </button>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#13111f]"
            aria-label="Submit education information"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;