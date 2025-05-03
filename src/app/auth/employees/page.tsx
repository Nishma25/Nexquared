// app/auth/employees/page.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  agreedToTerms?: string;
  form?: string;
}

export default function EmployeeSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This is where you would integrate with your Go backend in the future
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard or another page
      router.push('/dashboard/employee');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ 
        form: 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 bg-indigo-900 flex flex-col relative overflow-hidden">
        <div className="px-8 pt-6 pb-8 flex items-center justify-between">
          <Link href="/" aria-label="AMU Home">
            <div className="text-white text-2xl font-bold tracking-wider">AMU</div>
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
            Empowering Talent.
          </h2>
          <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-8">
            Connecting Opportunities.
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
          <div className="w-full h-full bg-gradient-to-b from-indigo-800 to-indigo-900"></div>
          
          {/* Uncomment when you have the image */}
          {/* <Image
            src="/images/purple-mountains.jpg" 
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority
            aria-hidden="true"
          /> */}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl lg:text-4xl font-bold mb-4">Create an account</h1>
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Log in
              </Link>
            </p>
          </div>

          {errors.form && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-20 border border-red-500 text-red-500 rounded-md text-sm">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-500 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  required
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-500 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  required
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-500 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-500 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
                required
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreedToTerms"
                    name="agreedToTerms"
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 bg-gray-900 border-gray-700 rounded focus:ring-indigo-500 focus:ring-offset-gray-900"
                    aria-invalid={errors.agreedToTerms ? 'true' : 'false'}
                    aria-describedby={errors.agreedToTerms ? 'terms-error' : undefined}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreedToTerms" className="text-gray-400">
                    I agree to the{' '}
                    <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      Terms & Conditions
                    </Link>
                  </label>
                  {errors.agreedToTerms && (
                    <p id="terms-error" className="mt-1 text-sm text-red-500">
                      {errors.agreedToTerms}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 flex justify-center"
              aria-live="polite"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up...
                </>
              ) : 'Sign up'}
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">Or sign up with</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors"
                  aria-label="Sign up with Google"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z" fill="#4285F4"/>
                    <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50693 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
                    <path d="M5.50253 14.3003C5.00431 12.8099 5.00431 11.1961 5.50253 9.70575V6.61481H1.51674C-0.185266 10.0056 -0.185266 14.0004 1.51674 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
                    <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50239 9.70575C6.45492 6.86616 9.10934 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors"
                  aria-label="Sign up with Apple"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5639 12.4882C17.5493 10.1602 19.0723 8.97461 19.1514 8.92383C18.0977 7.33594 16.458 7.05469 15.8682 7.0332C14.4844 6.8877 13.1426 7.86523 12.4385 7.86523C11.7344 7.86523 10.627 7.03906 9.41748 7.06836C7.89258 7.09961 6.46875 7.97656 5.69531 9.37402C4.11328 12.1895 5.33154 16.3242 6.85645 18.6152C7.62695 19.7422 8.44531 20.9902 9.54102 20.9453C10.6221 20.9 10.9834 20.2549 12.2695 20.2549C13.5557 20.2549 13.8848 20.9453 15.0146 20.9238C16.1729 20.9082 16.876 19.8086 17.627 18.6797C18.4863 17.3789 18.8252 16.1152 18.8398 16.0527C18.8105 16.0449 17.5781 15.5605 17.5639 12.4882Z" fill="white"/>
                    <path d="M15.0879 5.50195C15.7041 4.69922 16.1143 3.58984 15.9932 2.5C15.0439 2.54297 13.8379 3.16211 13.1953 3.96484C12.6309 4.6709 12.1484 5.80664 12.2852 6.87305C13.3369 6.9502 14.4717 6.3047 15.0879 5.50195Z" fill="white"/>
                  </svg>
                  Apple
                </button>
              </div>
            </div>
          </form>
          </div>
      </div>
    </div>
  );
}