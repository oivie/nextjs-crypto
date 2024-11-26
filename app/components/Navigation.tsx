'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname(); // Get the current route path
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the mobile menu

  useEffect(() => {
    const handleScroll = () => {
      // Add sticky effect after scrolling 50px
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to check if the link is active
  const linkClasses = (href: string) =>
    pathname === href
      ? 'text-black font-bold' // Bold and highlighted when active
      : 'text-black hover:text-cyan-500'; // Black text with hover effect for inactive links

  return (
    <div className={`relative ${isSticky ? 'sticky top-0 z-50 backdrop-blur-md shadow-lg' : ''}`}>
      {/* Navigation Bar */}
      <nav className={`relative z-10 p-4 shadow-lg bg-[rgb(242,238,245)]`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Crypto Board name */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo24.png" // Adjust the path to the logo file
              alt="Crypto Board Logo"
              width={24}
              height={24}
            />
            <div className="text-lg font-bold text-black">Crypto Board</div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="block md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex md:space-x-4 md:items-center md:space-y-0 space-y-4 absolute md:static top-16 left-0 w-full md:w-auto bg-[rgb(242,238,245)] md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}
          >
            <li>
              <Link href="/" className={linkClasses('/')}>
                Main
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className={linkClasses('/portfolio')}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/news" className={linkClasses('/news')}>
                News
              </Link>
            </li>
            <li>
              <Link href="/analytics" className={linkClasses('/analytics')}>
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/login" className={linkClasses('/login')}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className={linkClasses('/signup')}>
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
