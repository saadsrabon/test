import { cn } from '../../../lib/utils';

const TimeInput = ({
  register,
  name,
  placeholder,
  label,
  id,
  className,
  ...props
}) => {
  return (
    <label className="relative flex flex-col w-full gap-1 px-3 py-2 border border-slate-300 rounded-xl">
      <span className="text-[13px]">
        {label}
      </span>
      <input
        type="time"
        className={cn(
          'w-full focus:outline-none font-medium placeholder:font-light time-input',
          className
        )}
        placeholder={placeholder}
        name="SelectTime"
        {...register(`${name}`, {
          required: `${name} is required!`,
        })}
        {...props}
      />
    </label>
  );
};

export default TimeInput;

