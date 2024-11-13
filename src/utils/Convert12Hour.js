export function convertTo12Hour(time24) {
  // Split the time into hours and minutes
  const [hours, minutes] = time24?.split(':')?.map(Number);

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour time to 12-hour time
  const hours12 = hours % 12 || 12; // If hour is 0 or 12, display it as 12

  // Return formatted time in 12-hour format with AM/PM
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}
