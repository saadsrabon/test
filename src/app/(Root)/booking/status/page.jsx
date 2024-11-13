import BookingStatus from '@/components/Pages/BookingStatus/BookingStatus';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';

const page = () => {
  return <ProtectedPage role={['host', 'admin', 'user']}>
    <BookingStatus />
  </ProtectedPage>;
};

export default page;
