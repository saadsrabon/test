"use client";
import React from 'react';
import moment from 'moment';
const ActivityRow = ({ row }) => {
  const { createdAt, type, user, amount, hostShare, status } = row;
  return (
    <tr className=" bg-white border border-t-none font-medium text-sm">
      <td className="py-2 pl-3">{moment(createdAt).format('L')}</td>
      <td className="py-2 pl-3 ">{user.first_name} {user.last_name}</td>
      <td className="py-2 pl-3">{type}</td>
      <td
        className={`py-2 pl-3  font-semibold ${type == 'withdrawal' ? 'text-red-500' : 'text-green-500'}`}
      >
        {type == 'withdrawal' ? '-' : '+'}${amount}
      </td>
      <td
        className={`py-2 pl-3  font-semibold `}
      >${hostShare ? hostShare : "None"}
      </td>
      <td className={`py-2 px-3 text-[#fff]${status == 'approved' ? 'bg-green-500' : status === "pending" ? 'bg-yellow-500' : 'bg-red-500 '}`}>{status}</td>
     
    </tr>
  );
};

export default ActivityRow;
