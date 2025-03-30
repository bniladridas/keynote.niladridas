import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check, Ban } from 'lucide-react';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true, // Essential cookies cannot be disabled
    analytics: true,
    preferences: true,
  });

  useEffect(() => {
    // Check if user has completed the welcome form
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return; // Don't show cookie consent if welcome form isn't completed
    }

    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (!cookieChoice) {
      setIsOpen(true);
    }
  }, []);

  // Add a listener for userData changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userData' && e.newValue && !localStorage.getItem('cookieConsent')) {
        setIsOpen(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookieSettings', JSON.stringify({
      essential: true,
      analytics: true,
      preferences: true,
    }));
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookieSettings', JSON.stringify({
      essential: true,
      analytics: false,
      preferences: false,
    }));
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    setIsOpen(false);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'essential') return; // Essential cookies cannot be toggled
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-surface"
        >
          <div className="max-w-7xl mx-auto">
            {!showCustomize ? (
              // Main consent banner
              <div className="relative backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex items-start gap-4">
                  <Cookie className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">Cookie Preferences</h2>
                    <p className="text-gray-300 text-sm mb-4">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      Please select your cookie preferences.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Accept All
                      </button>
                      <button
                        onClick={handleRejectAll}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Ban className="w-4 h-4" />
                        Reject All
                      </button>
                      <button
                        onClick={() => setShowCustomize(true)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </button>
                    </div>
                  </div>
                  <a
                    href="/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 underline"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>
            ) : (
              // Customization panel
              <div className="relative backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-white mb-4">Cookie Settings</h2>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      id: 'essential',
                      title: 'Essential Cookies',
                      description: 'Required for basic site functionality. Cannot be disabled.',
                      disabled: true
                    },
                    {
                      id: 'analytics',
                      title: 'Analytics Cookies',
                      description: 'Help us understand how visitors interact with our website.'
                    },
                    {
                      id: 'preferences',
                      title: 'Preference Cookies',
                      description: 'Remember your settings and improve your experience.'
                    }
                  ].map((cookie) => (
                    <div key={cookie.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{cookie.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">{cookie.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[cookie.id as keyof CookieSettings]}
                          onChange={() => toggleSetting(cookie.id as keyof CookieSettings)}
                          disabled={cookie.disabled}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                          ${settings[cookie.id as keyof CookieSettings] ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-400'}
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                          after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
