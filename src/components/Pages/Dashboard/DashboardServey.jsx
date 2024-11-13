
import ServeyBox from './ServeyBox';
import { IoStar } from "react-icons/io5";
const DashboardServey = () => {
    const DashboardData = {
        totalBookings:112,
         todayBookings:20,
         totalEarnings:1002.56,
         rating:4.8
    }
    return (
        <div className=' grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full justify-between'>
            <ServeyBox title={'Total Bookings'} servey={DashboardData.totalBookings}/> 
            <ServeyBox title={'Today Bookings'} servey={DashboardData.todayBookings}/> 
            <ServeyBox title={'Total Earnings'} servey={DashboardData.totalEarnings}/> 
            <ServeyBox title={'Your Overall Rating'} servey={<div className='flex gap-2'><IoStar /> <span>{DashboardData.rating}/5</span> </div>}/> 
        </div>
    );
};

export default DashboardServey;