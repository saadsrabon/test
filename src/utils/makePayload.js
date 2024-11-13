export const makePayload = (payload) => {
    function convertValues(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                // Recur for nested objects
                convertValues(obj[key]);
            } else if (Array.isArray(obj[key])) {
                // Handle arrays (can contain nested objects or primitive types)
                obj[key] = obj[key].map(item => {
                    if (typeof item === 'object') {
                        convertValues(item);  // Recur if the item is an object
                    }
                    return item;
                });
            } else if (typeof obj[key] === 'string' && !isNaN(obj[key]) && obj[key].trim() !== '') {
                // If it's a string that can be converted to a number, convert it
                obj[key] = Number(obj[key]);
            }
        }
    }

    // Create a copy of the original payload to avoid mutating the original object
    const updatedPayload = JSON.parse(JSON.stringify(payload));
    convertValues(updatedPayload);

    return updatedPayload;
};