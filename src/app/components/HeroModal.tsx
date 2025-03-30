'use client';

import { useEffect, useRef } from 'react';
import { Hero } from '../lib/types';

interface HeroModalProps {
  hero: Hero;
  onClose: () => void;
}

export default function HeroModal({ hero, onClose }: HeroModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5">
            <img 
              src={hero.image} 
              alt={hero.name} 
              className="w-full h-80 md:h-full object-cover object-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>
          
          <div className="w-full md:w-3/5 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{hero.name}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">Real Name: {hero.realName}</p>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Biography</h3>
              <p className="text-gray-700">{hero.bio}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Powers</h3>
              <ul className="list-disc list-inside text-gray-700">
                {hero.powers.map((power, index) => (
                  <li key={index}>{power}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">First Appearance</h3>
              <p className="text-gray-700">{hero.firstAppearance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}