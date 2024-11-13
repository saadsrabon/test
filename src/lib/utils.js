import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUniqueDates(activities) {
  const dateSet = new Set();

  activities?.forEach((activity) => {
    // activity?.attendeesList?.forEach((attendee) => {
    //   dateSet.add(new Date(attendee.date).toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
    // });
    dateSet.add(activity?.date);
  });

  return Array.from(dateSet);
}

// export function getUniqueActivities(activities) {
//   const booking = [];
//   activities?.forEach((activity) => {
//     activity?.attendeesList?.forEach((attendee) => {
//       booking.push(attendee);
//     });
//   });
// }
