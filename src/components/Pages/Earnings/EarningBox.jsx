"use client";
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const EarningBox = () => {
  const [profile, setProfile] = useState({});
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false); // State for modal visibility
  const cookieValue = Cookies.get('name');
  let data;
  if(data){
    data = cookieValue && JSON.parse(cookieValue);
  }


  const getProfileData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${data._id}`, {
        headers: {
          authorization: data.accessToken,
        },
      });

      if (res.status === 200) {
        setProfile(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendWithdrawReq = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/transaction/withdraw/${data._id}`,
        {
          status: 'pending',
          amount: withdrawAmount,
          type: 'withdrawal',
          user: data._id,
        },
        {
          headers: {
            authorization: data.accessToken,
          },
        }
      );

      if (res.status === 200) {
        setProfile(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
    setShowWithdrawModal(false); // Close modal after successful withdrawal
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="flex md:flex-row flex-col mt-10 gap-10">
      {/* Available Funds */}
      <div className="flex flex-col gap-3 sm:w-[340px] h-[240px]">
        <h2 className="sm:text-base text-sm font-medium mb-4">Available Funds</h2>
        <div className="bg-white border-gray-300 border-[3px] flex flex-col gap-3 p-6 rounded-lg">
          <h6 className="text-[13px] font-medium">Balance available for use</h6>
          <h3 className="text-3xl font-semibold">${profile?.balance ? profile?.balance : 0.0}</h3>
          <div>
            <Button onClick={() => setShowWithdrawModal(true)}>Withdraw</Button> {/* Open modal */}
          </div>
        </div>
      </div>

      {/* Earnings */}
      <div className="flex flex-col gap-3 sm:w-[340px] h-[240px]">
        <div className="flex justify-between items-start">
          <h2 className="sm:text-base text-sm font-medium">Earnings</h2>
        </div>
        <div className="bg-white border-gray-300 flex-grow border-[3px] flex flex-col gap-3 p-6 rounded-lg">
          <h6 className="text-[13px] font-medium">Earnings to date</h6>
          <h3 className="text-3xl font-semibold">${profile?.totalEarned ? profile?.totalEarned : 0.0}</h3>
          <h5 className="text-[13px] font-medium">Your earnings since joining</h5>
        </div>
      </div>

      {/* Modal for Withdrawal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Withdraw Funds</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount to Withdraw</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Math.min(e.target.value, profile?.balance || 0))}
                max={profile?.balance || 0} // Maximum allowed is the balance
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter amount"
              />
              <small className="text-sm text-gray-600">
                Max: ${profile?.balance ? profile.balance : 0.0}
              </small>
            </div>
            <div className="flex justify-end gap-4">
              <Button onClick={() => setShowWithdrawModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
                Cancel
              </Button>
              <Button
                onClick={sendWithdrawReq}
                disabled={withdrawAmount <= 0 || withdrawAmount > profile?.balance}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningBox;
