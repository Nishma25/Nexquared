'use client';
// app/auth/clients/page.tsx
import Link from 'next/link';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
  form?: string;
}

export default function ClientSignup() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  // Validation state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // UI state
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      if (name === 'termsAgreement') {
        setTermsAgreed(checked);
        
        // Clear terms error if checked
        if (checked && errors.terms) {
          setErrors({
            ...errors,
            terms: '',
          });
        }
      }
      return;
    }
    
    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    let isValid = true;
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    // Terms validation
    if (!termsAgreed) {
      newErrors.terms = 'You must agree to the terms';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - would connect to your Go backend
      console.log('Form submitted:', formData);
      
      // Redirect to success page or dashboard
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        ...errors,
        form: 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle social sign up
  const handleSocialSignup = (provider: 'google' | 'apple') => {
    // For demo purposes
    alert(`Signing up with ${provider}`);
    // In real implementation, would redirect to OAuth flow
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex overflow-hidden rounded-xl shadow-2xl">
        {/* Left Panel with Image and Tagline */}
        <div className="w-full md:w-1/2 bg-[#3c2f6a] relative hidden md:block">
          {/* Logo */}
          <div className="absolute top-6 left-6 z-10">
            <Link href="/" className="text-white text-3xl font-bold" aria-label="Nexquared home page">
              NEXQUARED
            </Link>
          </div>
          
          {/* Back Button */}
          <div className="absolute top-6 right-6 z-10">
            <Link 
              href="/" 
              className="inline-block bg-[#2a2040]/70 hover:bg-[#2a2040] text-white py-2 px-4 rounded-md transition-colors"
              aria-label="Return to website"
            >
              Back to website
            </Link>
          </div>
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              {/* In a real implementation, you would use Next.js Image component here */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#3c2f6a]/30 to-[#3c2f6a]/90"></div>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="absolute bottom-20 left-0 right-0 p-8 z-10 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Empowering Talent.
              <br />
              Connecting Opportunities.
            </h2>
            
            {/* Page indicator dots */}
            <div className="flex space-x-2 mt-10" aria-hidden="true">
              <div className="w-8 h-1 bg-gray-500 rounded-full"></div>
              <div className="w-8 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Right Panel with Form */}
        <div className="w-full md:w-1/2 bg-[#1a1624] p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Create an account
          </h1>
          
          <p className="text-gray-300 mb-8">
            Already have an account? <Link href="/auth/login" className="text-[#6858c8] hover:text-[#7a6bd3] underline">Log in</Link>
          </p>
          
          {/* Form error message */}
          {errors.form && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200">
              {errors.form}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  className={`w-full p-3 rounded-md bg-[#2a2040] border ${errors.firstName ? 'border-red-500' : 'border-[#3c3256]'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6858c8]`}
                  required
                  aria-required="true"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  className={`w-full p-3 rounded-md bg-[#2a2040] border ${errors.lastName ? 'border-red-500' : 'border-[#3c3256]'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6858c8]`}
                  required
                  aria-required="true"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="Email"
                className={`w-full p-3 rounded-md bg-[#2a2040] border ${errors.email ? 'border-red-500' : 'border-[#3c3256]'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6858c8]`}
                required
                aria-required="true"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full p-3 rounded-md bg-[#2a2040] border ${errors.password ? 'border-red-500' : 'border-[#3c3256]'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6858c8]`}
                  required
                  minLength={8}
                  aria-required="true"
                  aria-describedby="passwordHint"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <p id="passwordHint" className={`text-xs ${errors.password ? 'text-red-400' : 'text-gray-400'} mt-1`}>
                {errors.password || 'Must be at least 8 characters'}
              </p>
            </div>
            
            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="termsAgreement"
                name="termsAgreement"
                className={`mt-1 h-4 w-4 rounded bg-[#2a2040] border ${errors.terms ? 'border-red-500' : 'border-[#3c3256]'} text-[#6858c8] focus:ring-[#6858c8] focus:ring-offset-[#1a1624]`}
                required
                aria-required="true"
                checked={termsAgreed}
                onChange={handleChange}
              />
              <div>
                <label htmlFor="termsAgreement" className={`${errors.terms ? 'text-red-400' : 'text-gray-300'} text-sm`}>
                  I agree to the <Link href="/terms" className="text-[#6858c8] hover:text-[#7a6bd3] underline">Terms & Conditions</Link>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-400">{errors.terms}</p>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${loading ? 'bg-[#5747b7] cursor-not-allowed' : 'bg-[#6858c8] hover:bg-[#5747b7]'} text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6858c8] mt-6 relative`}
              aria-label="Sign up for a client account"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="opacity-0">Sign up</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </>
              ) : 'Sign up'}
            </button>
            
            {/* Alternative Sign Up Options */}
            <div className="mt-6 text-center">
              <p className="text-center text-gray-400 text-sm mb-4">Or sign up with</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center bg-[#2a2040] hover:bg-[#3c3256] text-white py-2 px-4 rounded-md border border-[#3c3256] transition-colors"
                  aria-label="Sign up with Google"
                  onClick={() => handleSocialSignup('google')}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                
                <button
                  type="button"
                  className="flex items-center justify-center bg-[#2a2040] hover:bg-[#3c3256] text-white py-2 px-4 rounded-md border border-[#3c3256] transition-colors"
                  aria-label="Sign up with Apple"
                  onClick={() => handleSocialSignup('apple')}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.913 1.183-4.962 3.014-2.105 3.667-.948 9.069 1.519 12.05 1 1.423 2.183 3.027 3.739 2.973 1.496-.053 2.063-.963 3.882-.963 1.815 0 2.326.963 3.914.93 1.627-.026 2.654-1.471 3.645-2.9 1.153-1.675 1.627-3.293 1.66-3.381-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.592-4.572-1.444-2.08-3.659-2.31-4.44-2.357-2-.156-3.659 1.09-4.369 1.09z"/>
                    <path d="M14.128 3.807c.822-1.052 1.356-2.45 1.22-3.807-1.185.052-2.6.78-3.439 1.79-.753.858-1.41 2.234-1.234 3.572 1.331.104 2.695-.65 3.453-1.555z"/>
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