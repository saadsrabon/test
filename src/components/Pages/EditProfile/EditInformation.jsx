import { CiLock } from 'react-icons/ci';
import { GoEye } from 'react-icons/go';

const EditInformation = () => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 py-8 space-y-3 my-20 md:max-h-[480px]">
      {/* edit info */}
      <div className="border border-primary p-3 rounded-full max-w-[48px]">
        <CiLock className="text-primary text-xl " />
      </div>
      <h1 className="text-lg font-semibold max-w-[200px]">
        Why this information is needed?
      </h1>
      <p className="text-xs  max-w-[280px]">
        Details Sparktivity uses to verify your identity cant be changed.
        Contact info and some personal details can be edited, but we may ask you
        to verify your identity the next time you book or create a listing.
      </p>
      <div className="my-5">
        <hr />
      </div>
      {/* shared info */}
      <div className="border border-primary text-center p-2 max-w-[42px]">
        <GoEye className="text-primary text-2xl " />
      </div>
      <h1 className="text-lg font-semibold max-w-[200px]">
        Which info is shared with others?
      </h1>
      <p className="text-xs  max-w-[280px]">
        Sparktivity only releases contact information for Hosts and guests after
        a reservation is confirmed.
      </p>
    </div>
  );
};

export default EditInformation;
