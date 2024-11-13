export function handleFormData(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
            // Check for empty string, null, undefined, or an empty array
            return value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0);
        })
    );
}