"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full" style={{ backgroundColor: 'var(--pogtime-dark)' }}>
      <div className="mx-auto px-7 py-4">
        <div className="flex items-center justify-between h-12">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-normal" style={{ 
              color: '#F1F1F3', 
              fontFamily: 'Projekt Blackbird, sans-serif',
              letterSpacing: '2.88px'
            }}>
              POGTIME
            </Link>
          </div>
          
          {/* Right - Navigation items */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/signup" 
              className="text-base font-normal px-2 py-1"
              style={{ 
                color: '#F1F1F3', 
                fontFamily: 'Projekt Blackbird, sans-serif' 
              }}
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="text-base font-normal px-2 py-1"
              style={{ 
                color: '#F1F1F3', 
                fontFamily: 'Projekt Blackbird, sans-serif' 
              }}
            >
              Log In
            </Link>
            {/* Hamburger Menu */}
            <button className="p-2 rounded-md" style={{ color: '#F1F1F3' }}>
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="12" x2="42" y2="12"></line>
                <line x1="6" y1="24" x2="42" y2="24"></line>
                <line x1="6" y1="36" x2="42" y2="36"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Bottom border line */}
      <div className="mx-7 h-0.5" style={{ backgroundColor: '#393D3D' }}></div>
    </nav>
  );
}