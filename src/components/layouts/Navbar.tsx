// src/components/layouts/Navbar.tsx
import Link from 'next/link';
import Logo from '../ui/Logo';

const Navbar = () => {
  return (
    <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Logo className="text-3xl" />
      <div className="flex space-x-8">
        <Link href="auth/clients" className="hover:text-purple-300 transition-colors">
          For Clients
        </Link>
        <Link href="/employees" className="hover:text-purple-300 transition-colors">
          For Employees
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;