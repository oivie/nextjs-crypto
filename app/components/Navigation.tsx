'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname(); // Get the current route path
  const [isSticky, setIsSticky] = useState(false);

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
      {/* White Background underneath the navbar */}
      <div className="absolute bottom-0 w-full h-4 bg-white z-0" />

      {/* Navigation Bar */}
      <nav className={`relative z-10 p-4 shadow-lg bg-[rgb(242,238,245)]`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold text-black mb-4 md:mb-0">Crypto Board</div>

          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Link href="/" className={linkClasses('/')}>
                Dashboard
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
              <Link href="/alerts" className={linkClasses('/alerts')}>
                Alerts
              </Link>
            </li>
            <li>
              <Link href="/gainers-losers" className={linkClasses('/gainers-losers')}>
                Top Gainers & Losers
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
