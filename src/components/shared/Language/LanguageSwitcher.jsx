'use client';
import { useEffect, useState } from 'react';

const LanguageSwitcher = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); // State to track errors

  // Function to initialize Google Translate
  const loadGoogleTranslate = () => {
    try {
      if (
        window.google &&
        window.google.translate &&
        typeof window.google.translate.TranslateElement === 'function'
      ) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'es' }, // Set default language to Spanish
          'google_translate_element'
        );
      } else {
        throw new Error("Google Translate API is not available");
      }
    } catch (error) {
      console.error("Error loading Google Translate:", error);
      setHasError(true); // Set error state if initialization fails
    }
  };

  // Function that Google Translate API uses to initialize the translation widget
  const googleTranslateElementInit = () => {
    loadGoogleTranslate();
  };

  useEffect(() => {
    if (!isScriptLoaded) {
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      // Error handling for script loading
      script.onload = () => {
        window.googleTranslateElementInit = googleTranslateElementInit; // Ensure init function is available globally
        googleTranslateElementInit(); // Call the initialization function
      };
      script.onerror = () => {
        console.error("Failed to load Google Translate script");
        setHasError(true); // Set error state if script fails to load
      };

      document.body.appendChild(script);
      setIsScriptLoaded(true); // Mark the script as loaded
    }
  }, [isScriptLoaded]);

  return (
    <div id="custom_translate_element" className="relative">
        <div id="google_translate_element"></div>
    </div>
  );
};

export default LanguageSwitcher;
