'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname(); // Get the current route path

  // Function to check if the link is active
  const linkClasses = (href: string) =>
    pathname === href
      ? 'text-cyan-500 font-bold' // Bold and highlighted when active
      : 'text-white hover:text-cyan-500'; // White and hover effect for inactive links

  return (
    <div className="relative">
      {/* White Background underneath the navbar */}
      <div className="absolute bottom-0 w-full h-4 bg-white z-0" />

      {/* Navigation Bar */}
      <nav className="relative z-10 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-4 rounded-b-3xl shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold text-white mb-4 md:mb-0">Crypto Board</div>
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
