import React from 'react';
import { cn } from '../../../lib/utils';
const DatePicker = ({register,name, placeholder= 'Write here', label ='nothing',className}) => {
    return (
      <div>
        <div className="border border-slate-300  rounded-xl px-3 py-2 w-full flex flex-col gap-1 relative">
          <label className="text-[13px]" htmlFor={label}>
            {label}
          </label>
          <input
          type='date'
            className={cn(
              'custom-input text-slate-400 w-full focus:outline-none font-medium placeholder:font-light ',
              className
            )}
            placeholder={placeholder}
            {...register(`${name}`, {
              required: `${name} is required!`,
            })}
          />
        </div>
      </div>
    );
};

export default DatePicker;