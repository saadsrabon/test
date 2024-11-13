import axios from 'axios';

const APIKEY = 'AIzaSyCQKlv9q0fd2KHpTAqh53zmwhDK1fW-hjM';

const getCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyCQKlv9q0fd2KHpTAqh53zmwhDK1fW-hjM`
    );

    if (!response.data.results || response.data.results.length === 0) {
      console.log('a error');
    }
    console.log(response.data.results[0]?.geometry.location);

    const { lat, lng } = response.data.results[0]?.geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

const haversineDistance = (coords1, coords2) => {
  const toRadians = (angle) => (angle * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(coords2.lat - coords1.lat);
  const dLng = toRadians(coords2.lng - coords1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coords1.lat)) *
      Math.cos(toRadians(coords2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

const CalculateDistance = async (str1, str2) => {
  try {
    const location1 = await getCoordinates(str1);
    const location2 = await getCoordinates(str2);
    const distance = haversineDistance(location1, location2);

    return distance;
  } catch (error) {
    console.error('Error calculating distance:', error.message);
    throw error;
  }
};

export const CalculateDistance2nd = async (str1, data) => {
  try {
    const location1 = await getCoordinates(str1);
    // const location2 = data;
    console.log(location1, data);
    const distance = haversineDistance(location1, { ...data });

    return distance;
  } catch (error) {
    console.error('Error calculating distance:', error.message);
    throw error;
  }
};

export default CalculateDistance;

export const getCountryFromCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`
    );

    const results = response.data.results;

    if (results.length > 0) {
      const addressComponents = results[0].address_components;

      // Find the country from the address components
      const countryComponent = addressComponents.find((component) =>
        component.types.includes('country')
      );

      return countryComponent
        ? countryComponent.long_name
        : 'Country not found';
    }

    return 'No results found';
  } catch (error) {
    console.error('Error fetching country:', error);
    return 'Error fetching country';
  }
};
