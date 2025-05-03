// app/onboarding/resume/page.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentIcon } from '@heroicons/react/24/outline';

export default function UploadResumePage() {
  const router = useRouter();
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
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError('Please upload a PDF or Word document.');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError('File size should be less than 5MB.');
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
    
    console.log('Resume uploaded:', file.name);
    
    // In a real application, you would upload the file to your server here
    // For now, simulate a successful upload
    alert('Resume uploaded successfully! Your profile is complete.');
    
    // Redirect to dashboard or completion page
    router.push('/dashboard');
  };

  // Open file selector when the upload area is clicked
  const openFileSelector = () => {
    document.getElementById('resume-file')?.click();
  };

  return (

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">Upload Resume</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="resume-file" className="block text-white text-lg mb-2">
              Select file
            </label>
            
            {/* Hidden file input */}
            <input
              type="file"
              id="resume-file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {/* Drag and drop area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragActive ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-700 hover:border-gray-500'
              } ${fileError ? 'border-red-500' : ''}`}
              onClick={openFileSelector}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex flex-col items-center justify-center text-white">
                  <DocumentIcon className="h-12 w-12 text-indigo-400 mb-3" />
                  <p className="text-lg font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="mt-4 text-indigo-400 hover:text-indigo-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <DocumentIcon className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-lg">Drag and drop your resume here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                  <p className="text-sm text-gray-400 mt-3">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              )}
            </div>
            
            {fileError && (
              <p className="mt-2 text-red-500 text-sm">{fileError}</p>
            )}
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
              disabled={!file}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
  );
}