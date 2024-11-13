import { cn } from '@/lib/utils';
import Link from 'next/link';

const EditInput = ({
  register,
  name,
  placeholder = 'Write here',
  label,
  className,
  labelClassName,
  editClassName,
  readOnly,
  disabled = false,
  type,
  ...rest }) => {
  return (
    <div className="flex items-center justify-around">
      <div className="flex flex-col w-full gap-1 py-5 border-b border-gray-300">
        <label
          className={cn('text-base text-start font-semibold', labelClassName)}
          htmlFor={label}
        >
          {label}
        </label>
        <input
          className={cn(
            'w-full focus:outline-none text-start text-sm font-medium placeholder:font-light ',
            className
          )}
          {...rest}
          id={label}
          readOnly={readOnly}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          {...register(`${name}`, {
            required: `${name} is required!`,
          })}
        />
      </div>
      {/* edit button */}
      {/* <div>
        <Link href="/edit-profile/name-change"
          className={cn('text-primary text-sm font-semibold', editClassName)}
        >
          Edit
        </Link>
      </div> */}
    </div>
  );
};

export default EditInput;
