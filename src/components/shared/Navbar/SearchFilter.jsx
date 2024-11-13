import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';

const SearchFilter = ({ children }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="border pl-5 pr-2 py-2 min-w-[490px] rounded-[500px] flex justify-between items-center">
        <div className="space-y-1">
          {/* <h6 className="text-sm font-semibold">Search</h6> */}
          <Input
            className=" border-none h-[5px] px-0 rounded-none focus:outline-none focus:border-none focus:ring-0 "
            placeholder="Search activities with name"
          />
        </div>
        <Button className="h-full p-2 rounded-full">
          <IoIosSearch className="text-[18px] text-white" />
        </Button>
      </div>
      {children}
      {/* <FilterModal /> */}
    </div>
  );
};

export default SearchFilter;
