import { useEffect } from 'react/cjs/react.production.min';
import '../styles/globals.css';  // Your global CSS (optional)
import AddToHomeScreen from '@/components/shared/PWA/AddToHome';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Custom JavaScript to hide the element
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                console.log('Service Worker ready:', registration.active);
            }).catch(error => {
                console.log('Service Worker Error:', error);
            });
        }
        const elements = document.querySelectorAll('*');
        elements.forEach((element) => {
            if (element.textContent.includes("দ্বারা পরিচালিত")) {
                element.style.display = 'none';
            }
        });
    }, []); // Empty dependency array ensures the script runs only once

    return (
        <div>
            <Component {...pageProps} />
            <AddToHomeScreen />
        </div>
    );
}

export default MyApp;
