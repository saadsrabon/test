"use client";
import React, { useState, useEffect } from 'react';
import ActivityRow from './ActivityRow';
import axios from 'axios';
import Cookies from 'js-cookie';

const ActivityTable = ({ type }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const cookieValue = Cookies.get('name');
  let data;
  if (data) {
    data = cookieValue && JSON.parse(cookieValue);
  }

  const paginationLimit = 10; // Number of transactions per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction/user/${data._id}`, {
          headers: {
            authorization: data.accessToken,
          },
        });

        if (res.status === 200) {
          setTransactions(res.data);
          setTotalPages(Math.ceil(res.data.filter((transaction) => transaction.type === type).length / paginationLimit));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [type]);

  // Filter transactions based on the type and current page
  const filterTransactions = () => {
    const filteredTransactions = transactions.filter((transaction) => transaction.type === type);
    const startIndex = (currentPage - 1) * paginationLimit;
    return filteredTransactions.slice(startIndex, startIndex + paginationLimit); // Paginate the transactions
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <div className="min-w-max sm:min-w-max ">
        {/* Currency Table */}
        <table className="w-full">
          <thead className="bg-gray-100 border-2 border-gray-200">
            <tr className="text-start">
              <th className="py-3 text-start pl-3 md:text-base sm:text-sm text-[12px]">Date</th>
              <th className="py-3 text-start pl-6 md:text-base sm:text-sm text-[12px]">From</th>
              <th className="py-3 text-start pl-6 md:text-base sm:text-sm text-[12px]">Total Amount</th>
              <th className="py-3 text-start pl-6 md:text-base sm:text-sm text-[12px]">Host Share</th>
              <th className="py-3 text-start pl-6 pr-3 md:text-base sm:text-sm text-[12px]">Type</th>
              <th className="py-3 text-start pl-6 pr-3 md:text-base sm:text-sm text-[12px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions().map((trow, idx) => (
              <ActivityRow key={idx} row={trow} />
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
