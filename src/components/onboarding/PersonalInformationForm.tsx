'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export interface PersonalInformationData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  roles: string[];
  skills: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

interface PersonalInformationFormProps {
  initialData?: Partial<PersonalInformationData>;
  onSubmit: (data: PersonalInformationData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia"
];

const ROLE_OPTIONS = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full-Stack Developer",
  "DevOps Engineer", "Data Scientist", "UX/UI Designer", "Product Manager", "Project Manager",
  "QA Engineer", "Technical Writer", "Database Administrator", "Security Engineer",
  "Machine Learning Engineer", "Mobile Developer", "Game Developer", "Cloud Engineer"
];

const PersonalInformationForm = ({
  initialData = {},
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Personal Information',
  showTitle = true
}: PersonalInformationFormProps) => {
  const defaultData: PersonalInformationData = {
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    country: 'US',
    roles: [],
    skills: '',
    websiteUrl: '',
    linkedinUrl: '',
    githubUrl: ''
  };

  const [formData, setFormData] = useState<PersonalInformationData>({...defaultData, ...initialData});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleRoleChange = (role: string) => {
    setFormData(prev => {
      // If already selected, remove it
      if (prev.roles.includes(role)) {
        return {
          ...prev,
          roles: prev.roles.filter(r => r !== role)
        };
      }
      
      // If 3 roles are already selected, don't add more
      if (prev.roles.length >= 3) {
        return prev;
      }
      
      // Add the role
      return {
        ...prev,
        roles: [...prev.roles, role]
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (formData.roles.length === 0) newErrors.roles = 'Please select at least one role';
    if (!formData.skills.trim()) newErrors.skills = 'Please enter at least one skill';
    
    // URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    
    if (formData.websiteUrl && !urlPattern.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }
    
    if (formData.linkedinUrl && !formData.linkedinUrl.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    
    if (formData.githubUrl && !formData.githubUrl.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 ${className}`}>
      {showTitle && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-10">
          {title}
        </h1>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-[#181528] p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl text-white font-semibold mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-white text-base mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-required="true"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-white text-base mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-required="true"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Location Section */}
        <div className="bg-[#181528] p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl text-white font-semibold mb-4">Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-white text-base mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-required="true"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-white text-base mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                aria-required="true"
              >
                <option value="" disabled>Select a state</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="country" className="block text-white text-base mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              disabled
              className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-gray-400 focus:outline-none cursor-not-allowed"
            />
            <p className="text-gray-400 text-xs mt-1">Default: United States</p>
          </div>
        </div>
        
        {/* Roles Section */}
        <div className="bg-[#181528] p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl text-white font-semibold mb-4">
            Select Roles <span className="text-red-500">*</span>
            <span className="text-sm font-normal text-gray-400 ml-2">(Max 3)</span>
          </h2>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.roles.map(role => (
                <div 
                  key={role} 
                  className="bg-indigo-700 text-white px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {role}
                  <button 
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className="ml-2 text-white hover:text-red-300"
                    aria-label={`Remove ${role}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <select
              id="roleSelector"
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleRoleChange(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={formData.roles.length >= 3}
              aria-required="true"
            >
              <option value="" disabled>Select a role ({3 - formData.roles.length} remaining)</option>
              {ROLE_OPTIONS.filter(role => !formData.roles.includes(role)).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">{errors.roles}</p>
            )}
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="bg-[#181528] p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl text-white font-semibold mb-4">
            Skills <span className="text-red-500">*</span>
          </h2>
          
          <div>
            <label htmlFor="skills" className="block text-white text-base mb-2">
              Enter your skills (comma separated)
            </label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. JavaScript, React, Node.js, UI/UX, Project Management"
              aria-required="true"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div>
        </div>
        
        {/* Social Links Section */}
        <div className="bg-[#181528] p-5 rounded-lg border border-gray-700">
          <h2 className="text-xl text-white font-semibold mb-4">Social Links</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="websiteUrl" className="block text-white text-base mb-2">
                Your Website URL <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://yourwebsite.com"
              />
              {errors.websiteUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="linkedinUrl" className="block text-white text-base mb-2">
                LinkedIn URL <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://linkedin.com/in/username"
              />
              {errors.linkedinUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="githubUrl" className="block text-white text-base mb-2">
                GitHub URL <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full p-3 bg-[#13111f] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://github.com/username"
              />
              {errors.githubUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.githubUrl}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#13111f]"
            aria-label="Submit form"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;