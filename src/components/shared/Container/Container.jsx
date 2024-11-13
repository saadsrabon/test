import { cn } from '@/lib/utils';

const Container = ({ children, className }) => {
  return (
    <div
      className={cn('max-w-[1400px] mx-auto w-full lg:md:px-6 px-2', className)}
    >
      {children}
    </div>
  );
};

export default Container;
