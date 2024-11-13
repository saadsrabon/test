import { GoArrowLeft } from 'react-icons/go';

const PostNewActivityTItle = ({ num, setStep, children }) => {
  const handleBack = () => {
    if (num > 1) {
      setStep(num - 2);
      console.log(num - 1);
    }
  };
  return (
    <div>
      <div className="flex items-start justify-between gap-3 ">
        <div className={`${num == 1 && 'invisible'}`}>
          <button
            onClick={handleBack}
            type="submit"
            className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-primary w-max"
          >
            <span>
              <GoArrowLeft className="text-[24px]" />
            </span>
            Back
          </button>
        </div>
        {
          children ?
            { ...children }
            :
            <p className="text-primary font-semibold text-lg md:text-xl lg:text-2xl min-w-[150px]">
              Step {num} / 5
            </p>
        }
      </div>
      <div>
        <h2 className="pt-5 text-xl font-semibold md:text-2xl lg:text-3xl">
          Post a new activity
        </h2>
        <p className={`${num != 1 && 'hidden'} text-gray-500  text-sm mt-2`}>
          Hi . You are just a few steps for creating your activity. We will
          provide examples and make it as easier as possible for you. The
          process should take only about 10 minutes.
        </p>
      </div>
    </div>
  );
};

export default PostNewActivityTItle;
