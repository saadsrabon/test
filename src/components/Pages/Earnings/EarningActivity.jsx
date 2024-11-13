"use client";
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import ActivityTable from './ActivityTable';
const EarningActivity = () => {
  const [type, setType] = useState('add');

    return (
        <div className='mt-10'>
            {/* Select input field */}
            <Select className="text-[13px] focus:outline-none p-2">
            <SelectTrigger className="w-[140px] text-sm">
              <SelectValue placeholder="Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup onChange={setType}>
                <SelectItem value="add">Addition</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>


          {/* activity table */}
        <ActivityTable type={type} />
        </div>
    );
};

export default EarningActivity;