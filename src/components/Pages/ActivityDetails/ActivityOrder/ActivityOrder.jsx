'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getAccessToken, getLocalData } from '@/lib/auth/token';
import { getCountryFromCoords } from '@/lib/GetDistance';
import { useBookActivityMutation } from '@/store/activity/activity';
import {
  useMakePaymentMutation,
  useMakePaymentStripeMutation,
} from '@/store/transaction/transaction';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGift } from 'react-icons/fa6';
import ActivityCopun from './ActivityCopun';
import ActivityDates from './ActivityDates';
import ActivityDetails from './ActivityDetails';
import ActivityInput from './ActivityInput';
import ActivityPayment from './ActivityPayment';
import GuestCategory from './GuestCategory';
import stripe from '/src/assets/payment/stripe.png';

const ActivityOrder = ({ data, disabled = false }) => {
  // const [process, setProcess] = useState('reserve');
  const [location, setLocation] = useState('');
  const token = getAccessToken();
  console.log('access', token);
  const stripePromise = loadStripe(
    'pk_test_51LHswIIH6MxdVQFcCo6bDvfwV7i2rzgIXaXzi6LjOLtFIrQMovmmTTAOsHziNIikIQAz8IP69AsbtD8C1lHMdYdt00vj7YJBXC'
  );

  const [isGift, setIsGift] = useState(false);
  const [bookActivity] = useBookActivityMutation();
  const [makePaymentStripe] = useMakePaymentStripeMutation();
  const [makePayment] = useMakePaymentMutation();
  const { toast } = useToast();
  const [peopleData, setPeopleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [process, setProcess] = useState(1);
  const [price, setPrice] = useState(0);
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponId, setCouponId] = useState('');
  const [allDates, setAllDates] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);

  const navigate = useRouter();
  const AddNewPeople = (payload) => {
    const data = { ...payload };
    setPeopleData([...peopleData, data]);
  };
  useEffect(() => {
    const totalPrice = peopleData.reduce((total, item) => total + item.paid, 0);
    setPrice(totalPrice);
  }, [peopleData]);
  console.log(peopleData);

  useEffect(() => {
    if (data?.futureDates) {
      setSelectedDate(data?.futureDates[0]?.date);
    }
  }, [data?.futureDates]);
  useEffect(() => {
    const getCountry = async () => {
      const data = getLocalData('location');
      console.log(data);
      if (!data) {
        return;
      }
      const CountryName = await getCountryFromCoords(data?.lat, data?.lng);
      setLocation(CountryName);
    };
    getCountry();
  }, []);

  const RemovePeople = (type) => {
    // Iterate through the array backwards to find the last person of the specified type
    for (let i = peopleData.length - 1; i >= 0; i--) {
      if (peopleData[i].type === type) {
        // Remove the person at index i
        const updatedPeopleData = [...peopleData];
        updatedPeopleData.splice(i, 1);

        // Update the state with the new array
        setPeopleData(updatedPeopleData);
        break; // Exit the loop after removing the last match
      }
    }
  };
  // Function to update email
  const Email = (id, value) => {
    const newData = [...peopleData].map((item) => {
      if (item.id == id) {
        return { ...item, userEmail: value }; // Update the email while preserving other properties
      }
      return item; // Return the original item if ID does not match
    });
    setPeopleData([...newData]); // Update the state with the new data array
  };

  // Function to update phone number
  const PhoneNumber = (id, value) => {
    const newData = [...peopleData].map((item) => {
      if (item.id == id) {
        return { ...item, phone: value }; // Update the phone number while preserving other properties
      }
      return item; // Return the original item if ID does not match
    });
    setPeopleData([...newData]); // Update the state with the new data array
  };
  const Name = (id, value) => {
    const newData = [...peopleData].map((item) => {
      if (item.id == id) {
        return { ...item, name: value }; // Update the phone number while preserving other properties
      }
      return item; // Return the original item if ID does not match
    });
    setPeopleData([...newData]); // Update the state with the new data array
  };

  const CompleteBookingwithBold = async () => {
    if (!token) {
      return toast({
        variant: 'destructive',
        title: 'Please Log in first',
      });
    }

    try {
      // making the payment link
      const { data: res, error } = await makePayment({
        amount: 1200,
      });
      if (!res?.data?.payload) {
        toast({
          title: 'Something went wrong',
          status: 'error',
        });
        return;
      }

      const User = Cookies.get('name');
      if (!User) {
        toast({
          title: 'Please login in the website',
          status: 'error',
        });
        return;
      }
      const UserData = JSON.parse(User);
      const newData = [...peopleData].map(({ id, ...people }) => {
        const dataObj = {
          ...people,
          gift: isGift,
          date: selectedDate,
          time: data?.futureDates[0]?.time,
          reservedBy: UserData._id,
          paymentLink: res?.data?.payload?.payment_link,
          paymentStatus: 'pending',
        };

        // Add coupon field only if couponId is available
        if (couponId) {
          dataObj.coupon = couponId;
        }

        return dataObj;
      });

      const payload = { body: { attendees: [...newData] }, id: data?._id };

      console.log(newData);
      const { data: bookingDone } = await bookActivity(payload);
      if (bookingDone) {
        toast({
          title: 'Booking Successfull',
        });
      }
      window.location.href = res?.data?.payload?.url;
      console.log(bookingDone);
    } catch (err) {
      toast({
        title: 'Booking Failed',
        status: 'error',
      });
    }

    // MakePaymentIntregrate();
  };

  const MakePaymentUsingStripe = async () => {
    if (!token) {
      return toast({
        variant: 'destructive',
        title: 'Please Log in first',
        Direction: 'top',
      });
    }
    try {
      if (!stripePromise) {
        return;
      }
      const { data: res, error } = await makePaymentStripe({
        amount: Number(price),
      });
      Cookies.set('clientSecret', res.data.client_secret);

      if (res.data.client_secret) {
        const User = Cookies.get('name');
        if (!User) {
          toast({
            title: 'Please login in the website',
          });
          return;
        }
        const UserData = JSON.parse(User);
        const newData = [...peopleData].map(({ id, ...people }) => {
          const dataObj = {
            ...people,
            gift: isGift,
            date: selectedDate,
            time: data?.futureDates[0]?.time,
            reservedBy: UserData._id,
            paymentLink: res.data.client_secret,
            paymentStatus: 'pending',
          };

          // Add coupon field only if couponId is available
          if (couponId) {
            dataObj.coupon = couponId;
          }

          return dataObj;
        });

        const payload = { body: { attendees: [...newData] }, id: data?._id };
        console.log(newData);
        const { data: bookingDone } = await bookActivity(payload);
        if (bookingDone) {
          console.log('bookingDone', bookingDone);
          toast({
            title: 'Booking Successfull',
          });

          window.location.href = `https://elplanes.com/checkout-stripe`;
        }
      }
    } catch (err) {
      console.log(err);
      console.log('data', bookingDone);
      toast({
        title: err.message,
        status: 'error',
      });
    }
    localStorage.setItem('amount', price);
  };

  const NextProcess = () => {
    const dates = [...data.futureDates];
    setAllDates([...dates]);
    setProcess(2);
  };
  return (
    <div
      id="reserve"
      className="xsm:w-[360px] w-full bg-white border-gray-200 border rounded-lg p-5 mb-4"
    >
      <ActivityDetails
        guestnum={peopleData.length}
        ActivityOrderData={data}
        date={selectedDate}
      />
      {/* choosing activity type and the data */}
      <div className={`${process == 1 ? '' : 'hidden'}`}>
        {/* Guest differnt category like adults,children, teenager */}
        <div className="flex flex-col gap-5 mt-5">
          <h3 className="text-lg">Add attendee</h3>
          {data?.pricesPlan?.map((item, idx) => (
            <GuestCategory
              key={idx}
              data={data}
              item={item}
              // UpdatePrice={UpdatePrice}
              addPeople={AddNewPeople}
              allGuestData={[...peopleData]}
              removePeople={RemovePeople}
            />
          ))}
        </div>
        {/* Guest name input field for gift */}
        <div className={`flex flex-col gap-4 pt-6 `}>
          {peopleData?.map((person, index) => (
            <ActivityInput
              key={index}
              status={isGift}
              data={person}
              PhoneNumber={PhoneNumber}
              Email={Email}
              Name={Name}
            />
          ))}
        </div>
      </div>

      {/* Choosing the date  */}

      <div
        className={`${process == 2 ? '' : 'hidden'} mt-5 flex flex-col gap-5`}
      >
        <h3 className="text-lg">Choosing the date</h3>
        <div className="flex flex-wrap gap-3">
          {allDates?.map((dateData, idx) => (
            <ActivityDates
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              data={dateData}
              key={idx}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center mt-3">
        <button
          onClick={() => {
            setIsGift(!isGift);
          }}
          className={`h-6 w-6 flex items-center justify-center rounded-full border-2 
          ${isGift ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
        >
          {isGift && <FaGift className="text-white" />}
        </button>
        <label className="ml-2 font-medium text-gray-900">Send as a gift</label>
      </div>

      {/* Payment option */}
      {process == 3 && (
        <div className="flex flex-col items-center gap-5 my-6">
          {location == 'Colombia' ? (
            <div
              onClick={CompleteBookingwithBold}
              className="flex justify-center w-full p-3 border cursor-pointer rounded-xl "
            >
              <svg
                width="79"
                height="28"
                className="max-w-[70px] mx-auto"
                viewBox="0 0 79 28"
                fill="none"
                class="icon-gradient"
              >
                <path
                  d="M23.764 18.993h19.502c-.469 5.045-4.662 9.006-9.752 9.006-5.09 0-9.282-3.96-9.75-9.006zM9.85 8.154v19.8c4.967-.476 8.87-4.734 8.87-9.9S14.816 8.63 9.85 8.155zm23.665-.044c-5.089 0-9.282 3.962-9.751 9.007h19.502c-.469-5.045-4.662-9.008-9.752-9.008h.001zM0 15.335V28h7.944V0H0v15.336zM70.804 0v28h7.944V0h-7.944zM60.085 18.055c0 .628.06 1.242.171 1.839.797 4.305 4.336 7.642 8.7 8.06v-19.8c-4.968.476-8.87 4.734-8.87 9.9zm-12.802 9.944h7.944V0h-7.944v28z"
                  fill="url(#bold-icon-new_inline_svg__paint0_linear_5405_108701)"
                ></path>
                <defs>
                  <linearGradient
                    id="bold-icon-new_inline_svg__paint0_linear_5405_108701"
                    x1="78.748"
                    y1="14"
                    x2="0"
                    y2="14"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.2" stop-color="#EE424E"></stop>
                    <stop offset="0.8" stop-color="#121E6C"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : (
            <div
              onClick={MakePaymentUsingStripe}
              className="w-full p-3 border cursor-pointer rounded-xl"
            >
              <Image
                width={200}
                height={80}
                className="  object-contain max-w-[70px] mx-auto"
                src={stripe}
                alt="stripe"
              />
            </div>
          )}
        </div>
      )}

      {/* getting the booking data */}
      {process == 1 && (
        <Button
          disabled={disabled}
          onClick={NextProcess}
          className={`bg-primary my-5 text-white hover:bg-primary/90 w-full`}
        >
          Next
        </Button>
      )}
      {/* getting the future dates */}
      {process == 2 && (
        <Button
          disabled={disabled}
          onClick={() => {
            setProcess(3);
          }}
          className={`bg-primary my-5 text-white hover:bg-primary/90 w-full`}
        >
          Next
        </Button>
      )}
      {/* getting the option for payment */}
      {/* {process == 3 && (
        <Button
          onClick={CompleteBooking}
          className={`bg-primary my-5 text-white hover:bg-primary/90 w-full`}
        >
          Complete
        </Button>
      )} */}

      {/* Coupon Code */}
      <div className="my-2">
        <ActivityCopun
          setCouponId={setCouponId}
          data={data}
          setCouponAmount={setCouponAmount}
        />
      </div>
      <div className="">
        <p className="text-center text-gray-500">You won’t be charged yet</p>
        <ActivityPayment price={price} coupon={couponAmount} />
      </div>
    </div>
  );
};

export default ActivityOrder;
