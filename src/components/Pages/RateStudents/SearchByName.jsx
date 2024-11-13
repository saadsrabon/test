import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';


const SearchByName = () => {
    return (
        <div className="flex items-center gap-6">
        <div className="border pl-8 pr-2 py-2 max-w-[400px] rounded-full flex justify-between items-center">
          <div className="space-y-1">
            <h6 className="font-semibold text-sm">Search</h6>
            <Input
              className="border-none h-[6px] px-0 rounded-none focus:outline-none focus:border-none focus:ring-0"
              placeholder="Search Students by name"
            />
          </div>
          <Button className="h-full p-2 rounded-full">
            <IoIosSearch className="text-[26px] text-white" />
          </Button>
        </div>
      </div>
    );
};

export default SearchByName;