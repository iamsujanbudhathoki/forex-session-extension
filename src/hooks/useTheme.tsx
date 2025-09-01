import { useEffect, useState } from 'react';

// Declare chrome for TypeScript
declare const chrome: any;

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Load theme from Chrome storage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get(['darkMode'], (result: { darkMode?: boolean }) => {
        if (typeof result.darkMode === 'boolean') {
          setIsDarkMode(result.darkMode);
        }
      });
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({ darkMode: newMode });
    }
  };

  return { isDarkMode, toggleTheme };
};
