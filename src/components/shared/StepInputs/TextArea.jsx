import { cn } from '../../../lib/utils';

const TextArea = ({
  register,
  name,
  placeholder = 'Write here',
  label,
  className,
  required = true,
  ...rest
}) => {
  return (
    <div className="flex flex-col w-full gap-1 px-3 py-2 border border-slate-300 rounded-xl">
      <label className="text-[13px]" htmlFor={label}>
        {label}
      </label>
      <textarea
        className={cn(
          'w-full focus:outline-none font-medium placeholder:font-light',
          className
        )}
        placeholder={placeholder}
        {...register(`${name}`, {
          required: required,
        })}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
