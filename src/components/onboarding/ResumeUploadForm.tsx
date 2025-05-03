// components/ResumeUploadForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';

export interface ResumeUploadFormProps {
  onSubmit: (file: File) => void;
  buttonText?: string;
  className?: string;
  title?: string;
  showTitle?: boolean;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
}

const ResumeUploadForm = ({
  onSubmit,
  buttonText = 'Continue',
  className = '',
  title = 'Upload Resume',
  showTitle = true,
  maxFileSize = 5, // Default 5MB
  allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
}: ResumeUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  // Validate file type and size
  const validateAndSetFile = (selectedFile: File) => {
    setFileError('');
    
    // Check file type
    if (!allowedFileTypes.includes(selectedFile.type)) {
      setFileError('Please upload a PDF or Word document.');
      return;
    }
    
    // Check file size
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      setFileError(`File size should be less than ${maxFileSize}MB.`);
      return;
    }
    
    setFile(selectedFile);
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setFileError('Please upload a resume file.');
      return;
    }
    
    onSubmit(file);
  };

  // Open file selector when the upload area is clicked
  const openFileSelector = () => {
    document.getElementById('resume-file')?.click();
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
          <label htmlFor="resume-file" className="block text-white text-base sm:text-lg mb-2">
            Select file
          </label>
          
          {/* Hidden file input */}
          <input
            type="file"
            id="resume-file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
            aria-describedby={fileError ? 'file-error-message' : undefined}
          />
          
          {/* Drag and drop area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
              dragActive ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-700 hover:border-gray-500'
            } ${fileError ? 'border-red-500' : ''}`}
            onClick={openFileSelector}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Drag and drop area for resume upload"
          >
            {file ? (
              <div className="flex flex-col items-center justify-center text-white">
                <DocumentIcon className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400 mb-3" aria-hidden="true" />
                <p className="text-base sm:text-lg font-medium">{file.name}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-4 text-indigo-400 hover:text-indigo-300"
                  aria-label="Remove file"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white">
                <DocumentIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3" aria-hidden="true" />
                <p className="text-base sm:text-lg">Drag and drop your resume here</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">or click to browse files</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-3">
                  Supported formats: PDF, DOC, DOCX (Max {maxFileSize}MB)
                </p>
              </div>
            )}
          </div>
          
          {fileError && (
            <p id="file-error-message" className="mt-2 text-red-500 text-sm" role="alert">{fileError}</p>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={!file}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeUploadForm;