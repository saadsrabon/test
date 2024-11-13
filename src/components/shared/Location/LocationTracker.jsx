'use client';
import { setLocalData } from '@/lib/auth/token';
import { useEffect, useState } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState('');
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude, error: null });
          setLocalData('location', { lat: latitude, lng: longitude });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser.',
      });
    }
  }, []);
  return <div></div>;
};

export default LocationTracker;
