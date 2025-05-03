// app/layout.js
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nexquared - Talent Connection Platform',
  description: 'Connect talent with hiring clients efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`} >{children}</body>
    </html>
  );
}
