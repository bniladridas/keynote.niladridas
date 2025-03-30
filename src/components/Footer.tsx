import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Copyright, Info } from 'lucide-react';
import { HiringForm } from './ui/HiringForm';
import { CreditsModal } from './ui/CreditsModal';

export function Footer() {
  const [showHiringForm, setShowHiringForm] = useState(false);

  const handleOpenCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.showModal();
  };

  return (
    <footer className="bg-[#1c2128] border-t border-[#30363d] py-6 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link 
                to="/terms" 
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <button
                onClick={() => setShowHiringForm(true)}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <Users className="w-4 h-4" />
                Join Our Team
              </button>
              <button
                onClick={handleOpenCredits}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <Info className="w-4 h-4" />
                Credits
              </button>
            </div>
          </div>
          <div className="text-center text-white/50 text-sm border-t border-[#30363d] pt-4">
            © 2025 Synthara. All rights reserved.
          </div>
        </div>
      </div>

      {/* Modals */}
      {showHiringForm && (
        <HiringForm 
          isOpen={showHiringForm} 
          onClose={() => setShowHiringForm(false)} 
        />
      )}
      <CreditsModal onClose={() => {
        const modal = document.getElementById('credits-modal');
        if (modal) modal.close();
      }} />
    </footer>
  );
}
