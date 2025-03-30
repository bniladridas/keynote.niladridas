import { useState, useEffect } from 'react';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export const useCookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    essential: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    const settings = localStorage.getItem('cookieSettings');
    
    setCookieConsent(consent);
    if (settings) {
      setCookieSettings(JSON.parse(settings));
    }
  }, []);

  const isAllowed = (cookieType: keyof CookieSettings): boolean => {
    if (!cookieConsent) return false;
    if (cookieType === 'essential') return true;
    
    const settings = localStorage.getItem('cookieSettings');
    if (!settings) return false;
    
    return JSON.parse(settings)[cookieType] || false;
  };

  return {
    cookieConsent,
    cookieSettings,
    isAllowed,
  };
};