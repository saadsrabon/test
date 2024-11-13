'use client';
import { useEffect, useState } from 'react';

const LocationModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position);
          console.log({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // setShowModal(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  //   const handleAllow = () => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //       console.log({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //       setShowModal(false);
  //     });
  //   };

  //   const handleDeny = () => {
  //     setShowModal(false);
  //     setError('Location access denied by the user.');
  //   };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {showModal && (
        <div className="mx-auto flex w-72 items-center justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-indigo-600 px-4 py-[6px] text-white"
          >
            Attention!
          </button>
          <div
            onClick={() => setShowModal(false)}
            className={`fixed z-[100] flex items-center justify-center ${showModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}
          >
            <div
              onClick={(e_) => e_.stopPropagation()}
              className={`absolute w-80 rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${showModal ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <h2 className="text-xl font-bold mb-4">Location Access</h2>
                <p className="mb-4">
                  This site would like to access your location to provide better
                  services. Do you allow it?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleDeny}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                  >
                    Deny
                  </button>
                  <button
                    onClick={handleAllow}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Allow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showModal && location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {!showModal && error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default LocationModal;
