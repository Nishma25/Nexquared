// components/layout/AuthLayout.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children, title, subtitle, logoUrl, backgroundImageUrl }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 bg-indigo-900 flex flex-col relative overflow-hidden">
        <div className="px-8 pt-6 pb-8 flex items-center justify-between">
          <Link href="/" aria-label="AMU Home">
            <div className="text-white text-2xl font-bold tracking-wider">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={80}
                  height={40}
                  className="object-contain"
                />
              ) : (
                'AMU'
              )}
            </div>
          </Link>
          <Link 
            href="/"
            className="bg-indigo-800 bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
            aria-label="Back to website"
          >
            Back to website
          </Link>
        </div>

        <div className="flex-grow flex flex-col justify-center px-8 md:px-16 pb-20 z-10">
          <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-2">
            {title || 'Empowering Talent.'}
          </h2>
          <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-8">
            {subtitle || 'Connecting Opportunities.'}
          </h2>
          
          {/* Dots/Pagination Indicator */}
          <div className="flex space-x-2 mt-8">
            <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-indigo-900 absolute z-10"></div>
          {backgroundImageUrl ? (
            <Image
              src={backgroundImageUrl}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              priority
              aria-hidden="true"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-indigo-800 to-indigo-900"></div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        {children}
      </div>
    </div>
  );
}