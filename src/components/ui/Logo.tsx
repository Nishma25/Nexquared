// src/components/ui/Logo.tsx
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link href="/" className={`font-bold text-white ${className}`}>
      NEXQUARED
    </Link>
  );
};

export default Logo;