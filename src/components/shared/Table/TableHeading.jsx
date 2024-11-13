import { cn } from '@/lib/utils';
import React from 'react';

const TableHeading = ({text,className}) => {
    return (
        <th className={cn(`py-3 text-start pl-6 md:text-base sm:text-sm text-[12px]`,className)}>
        {text}
       </th>
    );
};

export default TableHeading;