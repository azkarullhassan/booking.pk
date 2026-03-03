'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Hotel } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, mode: 'login' | 'signup'}>({
    isOpen: false,
    mode: 'login'
  });

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center text-2xl font-bold text-green-600">
            <Hotel className="h-8 w-8 mr-2" />
            <span>Hotels.pak</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/hotels" className="text-gray-700 hover:text-green-600 transition-colors">
              Hotels
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Home
              </Link>
              <Link href="/hotels" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Hotels
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 py-2 transition-colors">
                Contact
              </Link>
              <button
                onClick={() => setAuthModal({isOpen: true, mode: 'login'})}
                className="text-gray-700 hover:text-green-600 py-2 transition-colors text-left"
              >
                Login
              </button>
              <button
                onClick={() => setAuthModal({isOpen: true, mode: 'signup'})}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={() => setAuthModal({isOpen: true, mode: 'login'})}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setAuthModal({isOpen: true, mode: 'signup'})}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
      </nav>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({...authModal, isOpen: false})}
        mode={authModal.mode}
        onSwitchMode={(mode) => setAuthModal({isOpen: true, mode})}
      />
    </>
  );
}