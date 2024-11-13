import { cn } from '../../../lib/utils';

const TextInput = ({
  readOnly = false,
  ref,
  type = 'text',
  register,
  name,
  placeholder = 'Write here',
  label,
  className,
  required = true,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full gap-1 px-3 py-2 border border-slate-300 rounded-xl">
      <label className="text-[13px]" htmlFor={label}>
        {label}
      </label>
      <input
        {...props}
        id={label}
        readOnly={readOnly}
        ref={ref}
        type={type}
        className={cn(
          'w-full focus:outline-none font-medium placeholder:font-light ',
          className
        )}
        placeholder={placeholder}
        {...register(`${name}`, {
          required: required,
        })}
      />
    </div>
  );
};

export default TextInput;
