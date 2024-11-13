import BookingTable from '@/components/Pages/Bookings/BookingTable';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';

// sdgdfg
const page = () => {
  return (
    <ProtectedPage role={['host']}>
    <div className="p-6 sm:p-10">
      <BookingTable />
      </div>
    </ProtectedPage>
  );
};

export default page;
