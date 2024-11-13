import { cn } from '@/lib/utils';
import React from 'react';

const TableRow = ({ children, className }) => {
  return (
    <tr
      className={cn(
        ` bg-white border border-t-none font-medium text-sm`,
        className
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
