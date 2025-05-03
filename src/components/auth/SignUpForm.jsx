// components/auth/SignUpForm.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '../common/Input';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';
import SocialLogin from './SocialLogin';

export default function SignUpForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ 
        form: 'Signup failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl lg:text-4xl font-bold mb-4">Create an account</h1>
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
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
          <Input
            id="firstName"
            name="firstName"
            type="text"
            label="First name"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <Input
            id="lastName"
            name="lastName"
            type="text"
            label="Last name"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </div>

        <div className="mb-6">
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <div className="mb-6">
          <Checkbox
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            error={errors.agreedToTerms}
            label={
              <>
                I agree to the{' '}
                <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Terms & Conditions
                </Link>
              </>
            }
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          loadingText="Signing up..."
          fullWidth
        >
          Sign up
        </Button>

        <SocialLogin />
      </form>
    </div>
  );
}

// components/auth/SocialLogin.jsx
export default function SocialLogin() {
  return (
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
  );
}