import { useMyAttendeesQuery } from '@/store/activity/activity';
import BookingRow from './BookingRow';

const BookingBody = ({ id }) => {
  console.log(id);
  // const {} =
  const { data } = useMyAttendeesQuery(id);
  console.log('data', data);
  return (
    <tbody>
      {data?.data?.map((trow, idx) => (
        <BookingRow key={idx} row={trow} />
      ))}
    </tbody>
  );
};

export default BookingBody;
