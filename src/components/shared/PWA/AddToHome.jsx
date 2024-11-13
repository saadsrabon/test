import { useEffect, useState } from 'react';

export default function AddToHomeScreen() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if it's iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        const handler = (e) => {
            console.log('beforeinstallprompt fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);
        
        // Check if app is already installed
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        const handleChange = (e) => {
            console.log('standalone mode change:', e.matches);
            if (e.matches) {
                setIsInstallable(false);
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        // Check initial value
        if (mediaQuery.matches) {
            setIsInstallable(false);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

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

    if (!isInstallable && !isIOS) return null;

    return (
        <div className="fixed bottom-4 right-4">
            {isIOS ? (
                <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg">
                    Install this app: tap <span className="font-bold">Share</span> then 
                    <span className="font-bold"> Add to Home Screen</span>
                </div>
            ) : (
                <button 
                    onClick={handleInstallClick}
                    className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg"
                >
                    Install App
                </button>
            )}
        </div>
    );
}