import { cn } from '@/lib/utils';
import React from 'react';

const TableData = ({children,className}) => {
    return (
        <td className={cn(`py-4 pl-6 `,className)}>{children}</td>
    );
};

export default TableData;