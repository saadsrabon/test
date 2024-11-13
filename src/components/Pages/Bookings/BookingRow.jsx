import SingleReviewModal from '@/components/shared/AllModals/SingleReviewModal';
import TableData from '@/components/shared/Table/TableData';
import TableRow from '@/components/shared/Table/TableRow';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getAccessToken, getLocalData } from '@/lib/auth/token';
import { useUpdateBookingMutation } from '@/store/services/bookingApiService';
import moment from 'moment';
import Link from 'next/link';

const BookingRow = ({ row }) => {
  const {
    studentImg,
    studentName,
    activity,
    dueOn,
    Total,
    paymentStatus,
    actionTaken,
  } = row;

  console.log('row', row);

  const [updateBooking] = useUpdateBookingMutation()

  const { toast } = useToast()

  const handleUpdateBooking = async (status) => {
    const token = getAccessToken();
    const payload = {
      id: row?._id,
      body: status,
      token: token
    }


    const { data, error } = await updateBooking(payload)
    if (error) {
      toast({
        variant: 'destructive',
        title: "An error occured",
      });
    } else {
      toast({
        // variant: 'destructive',
        title: "Accepted",
      });
    }
    console.log(data, error);

  }

  console.log('row', row?.activityId?._id);
  const profileCompleteRequired = row?.activityId?.profileCompleteRequired;

  return (
    // <tr className="text-sm font-medium bg-white border border-t-none">
    //   <td className="py-2 pl-3 "></td>
    //   <td className="py-2 pl-3 ">{activity}</td>
    //   <td className="py-2 pl-3 "></td>
    //   <td className="py-2 pl-3 "></td>
    //   <td className="py-2 pl-0 "></td>
    //   <td
    //     className={`py-2 pl-6  font-semibold `}
    //   >

    //   </td>
    // </tr>
    <TableRow>
      <TableData className="flex items-center gap-3">
        {/* <Image src={studentImg} alt="studentprofile" /> */}
        <Link href={`/profile/${row._id}`}>
          {row?.name}
        </Link>
      </TableData>
      <TableData>{row?.activityId?.title}</TableData>
      <TableData>{moment(row?.date).format('L')}</TableData>
      <TableData>${row?.paid}</TableData>
      {/* <TableData>
        <div
          className={`px-3 py-2 ${paymentStatus == 'SUCESSFUL' ? 'bg-green-600' : 'bg-red-500'}  text-white w-[110px] rounded-full text-center`}
        >
          {paymentStatus}
        </div>
      </TableData> */}
      <TableData>
        {/* {row?.status != 'pending' ? ( */}
        {profileCompleteRequired ? (
          <div className="flex justify-center gap-2">
            <div>
              <SingleReviewModal
                className="bg-foundation hover:bg-foundation/90"
                title="Rate student"
              />
            </div>
          </div>
        ) : (
            <div className="flex justify-center gap-2">
              <Button onClick={() => handleUpdateBooking('accepted')} className="bg-primary hover:bg-primary/90">Accept</Button>
              <Button onClick={() => handleUpdateBooking('rejected')} className="bg-foundation hover:bg-foundation/90">
              Reject
            </Button>
          </div>
        )}
      </TableData>
    </TableRow>
  );
};

export default BookingRow;
