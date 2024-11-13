export function getGoogleMapUrl(areaName) {
    const baseUrl = "https://www.google.com/maps?q=";
    const query = encodeURIComponent(areaName);

    console.log(`${baseUrl}${query}&output=embed`);

    return `${baseUrl}${query}&output=embed&z=16`;
}