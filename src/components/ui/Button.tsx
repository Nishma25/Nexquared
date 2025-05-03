// src/components/ui/Button.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-md transition-colors';
  
  const variantStyles = {
    primary: 'bg-[#5747b7] hover:bg-[#6858c8] text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    outline: 'border border-[#5747b7] text-white hover:bg-[#5747b7]/10',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-4 text-xl',
  };
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

export default Button;