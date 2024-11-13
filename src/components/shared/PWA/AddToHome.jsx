'use client';
import { useEffect, useState } from 'react';

export default function AddToHomeScreen() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Debug log
        console.log('AddToHomeScreen component mounted');

        // Check if it's iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);
        console.log('Is iOS device:', isIOSDevice);

        // Check if PWA is already installed
        const isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches;
        console.log('Is PWA already installed:', isPWAInstalled);

        const handler = (e) => {
            console.log('beforeinstallprompt fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check service worker status
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(registration => {
                console.log('Service Worker status:', registration ? 'registered' : 'not registered');
            });
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        console.log('Install button clicked');
        if (!deferredPrompt) {
            console.log('No deferred prompt available');
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('Installation outcome:', outcome);
            
            if (outcome === 'accepted') {
                console.log('App installed');
                setIsInstallable(false);
            }
            setDeferredPrompt(null);
        } catch (error) {
            console.error('Installation error:', error);
        }
    };

    if (!isInstallable && !isIOS) {
        console.log('Component hidden: not installable and not iOS');
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isIOS ? (
                <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg">
                    Install this app: tap <span className="font-bold">Share</span> then 
                    <span className="font-bold"> Add to Home Screen</span>
                </div>
            ) : (
                <button 
                    onClick={handleInstallClick}
                    className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90"
                >
                    Install App
                </button>
            )}
        </div>
    );
}