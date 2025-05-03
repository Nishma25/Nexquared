// components/common/Button.jsx
'use client';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = "font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200";
  
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-900 hover:bg-opacity-10",
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`;

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </div>
      ) : children}
    </button>
  );
}

// components/common/Input.jsx
'use client';

export default function Input({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-500 border ${
          error ? 'border-red-500' : 'border-gray-700'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// components/common/Checkbox.jsx
'use client';

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  error,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-indigo-600 bg-gray-900 border-gray-700 rounded focus:ring-indigo-500 focus:ring-offset-gray-900"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="text-gray-400">
          {label}
          {required && !label?.props && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}