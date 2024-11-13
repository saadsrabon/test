export function formatDates(dateRange, time, types) {
    // Check if dateRange or time is empty or invalid
    if (!dateRange || !time) {
        return { error: 'Invalid input: date range and time are required.' };
    }

    // Split the input date range
    const [startDateStr, endDateStr] = dateRange.split(' - ');

    // Parse the start and end dates
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Validate if the dates are valid
    if (isNaN(startDate) || isNaN(endDate)) {
        return { error: 'Invalid date range: please provide a valid start and end date.' };
    }

    // Prepare the futureDates array
    const futureDates = [];

    // Loop through the dates from start to end
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        // Format the date to ISO string and push to futureDates
        futureDates.push({
            date: date.toISOString(),
            time: time,
            types: types
        });
    }

    // Return the formatted result
    return {
        firstDate: startDate.toISOString(), // Keep the first date
        futureDates: futureDates
    };
}
