// components/PersonalInformationForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export interface PersonalInformationData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  address: string;
}

interface PersonalInformationFormProps {
  initialData?: PersonalInformationData;
  onSubmit: (data: PersonalInformationData) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const PersonalInformationForm = ({
  initialData = { fullName: '', companyName: '', businessEmail: '', phoneNumber: '', address: '' },
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Personal Information',
  showTitle = true
}: PersonalInformationFormProps) => {
  const [formData, setFormData] = useState<PersonalInformationData>(initialData);

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
          <label htmlFor="fullName" className="block text-white text-base sm:text-lg mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="companyName" className="block text-white text-base sm:text-lg mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="businessEmail" className="block text-white text-base sm:text-lg mb-2">
            Business Email
          </label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-white text-base sm:text-lg mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-white text-base sm:text-lg mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 sm:p-3 bg-[#181528] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
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

export default PersonalInformationForm;