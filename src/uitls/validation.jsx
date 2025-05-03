// utils/validation.js
/**
 * Email validation function
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Password validation - checks if password meets minimum requirements
   * @param {string} password - Password to validate
   * @returns {Object} - Object containing validation result and error message
   */
  export const validatePassword = (password) => {
    const minLength = 8;
    
    if (!password) {
      return {
        isValid: false,
        error: 'Password is required'
      };
    }
    
    if (password.length < minLength) {
      return {
        isValid: false,
        error: `Password must be at least ${minLength} characters`
      };
    }
    
    // Add more complex validations as needed
    // const hasUppercase = /[A-Z]/.test(password);
    // const hasLowercase = /[a-z]/.test(password);
    // const hasNumbers = /\d/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: true,
      error: ''
    };
  };
  
  /**
   * Form validation - validates the entire signup form
   * @param {Object} formData - Form data object
   * @returns {Object} - Object containing errors for each field (if any)
   */
  export const validateSignupForm = (formData) => {
    const errors = {};
    
    // First name validation
    if (!formData.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    
    // Last name validation
    if (!formData.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    const passwordCheck = validatePassword(formData.password);
    if (!passwordCheck.isValid) {
      errors.password = passwordCheck.error;
    }
    
    // Terms agreement validation
    if (!formData.agreedToTerms) {
      errors.agreedToTerms = 'You must agree to the Terms & Conditions';
    }
    
    return errors;
  };
  
  // lib/auth.js
  /**
   * Simulated signup function (replace with actual API call to your Go backend)
   * @param {Object} userData - User data for signup
   * @returns {Promise} - Promise that resolves to the response from the server
   */
  export const signUp = async (userData) => {
    try {
      // In a real application, you would call your Go backend here
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };
  
  /**
   * Social login function (Google)
   * @returns {Promise} - Promise that resolves when the social login flow completes
   */
  export const loginWithGoogle = async () => {
    try {
      // Implement Google OAuth flow
      // This would typically involve redirecting to a Google auth URL
      // or using a library like next-auth
      console.log('Google login initiated');
      
      // Simulating a response for now
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };
  
  /**
   * Social login function (Apple)
   * @returns {Promise} - Promise that resolves when the social login flow completes
   */
  export const loginWithApple = async () => {
    try {
      // Implement Apple Sign In flow
      console.log('Apple login initiated');
      
      // Simulating a response for now
      return { success: true };
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    }
  };