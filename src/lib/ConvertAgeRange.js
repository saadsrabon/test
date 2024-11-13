import moment from 'moment';

export function convertAgeRange(ageRange = '12-14') {
  // Split the input string into two numbers
  const [start, end] = ageRange.split('-').map(Number);

  // Return the formatted string
  return `${start} years old to ${end} years old`;
}

export function ConvertDatesInFromate(futureDates) {
  let data = '';
  for (let i = 0; i < futureDates?.length; i++) {
    const element = moment(futureDates[i].date).format('MMM Do');
    data += `${element} ,`;
  }
  return data.slice(0,data?.length -2 )
}
