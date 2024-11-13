import { CiLock } from 'react-icons/ci';

const Information = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 space-y-3 my-10">
     <div className='border border-primary p-3 rounded-full max-w-[48px]'>
     <CiLock className='text-primary text-xl '/>
     </div>
      <h1 className="text-lg font-semibold max-w-[200px]">Why this information is needed?</h1>
      <p className='text-xs  max-w-[280px]'>
        Details Sparktivity uses to verify your identity cant be changed.
        Contact info and some personal details can be edited, but we may ask you
        to verify your identity the next time you book or create a listing.
      </p>
    </div>
  );
};

export default Information;
