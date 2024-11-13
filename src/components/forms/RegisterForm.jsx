import { handleFormData } from '@/lib/handleFormData';
import { cn } from '@/lib/utils';
import { useSendOtpMutation, useSignUpMutation } from '@/store/auth/auth';
import { closeModal } from '@/store/features/modalSlice';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { LuCalendar, LuEye, LuEyeOff } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import TextInput from '../shared/StepInputs/TextInput';
import { useToast } from '../ui/use-toast';

const RegisterForm = ({ isSwitching, handleSwitch, setEmail }) => {
  // const RegisterForm = ({ register, handleSubmit, onRegisterSubmit, isSwitching }) => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('individual');
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const [passwordShow, setPasswordShow] = useState(true);
  const userTypesData = ['individual', 'organization'];
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();
  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();

  const { toast } = useToast();

  const onRegisterSubmit = async (data) => {
    const value = handleFormData({ ...data, type: userType });
    setEmail(data.email);
    console.log(value, 'email--', data.email);
    const { data: signUpData, error } = await signUp(value);

    if (error) {
      toast({
        variant: 'destructive',
        title: error?.data?.message,
      });
    } else {
      const payload = { email: data.email }
      const { error: otpFailed } = await sendOtp(payload);

      otpFailed
        ? toast({
          variant: 'destructive',
          title: otpFailed?.data?.message,
        })
        : (handleSwitch('otp'),
          toast({
            title:
              'Account created successfully, Please verify the otp sent to your email',
          }));

      // dispatch(switchToLogin())
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onRegisterSubmit)}
      className={cn(
        'px-5 pt-3 pb-5 lg:pb-10 lg:pt-5 lg:px-10 max-h-[80vh] overflow-auto',
        {
          invisible: isSwitching,
        }
      )}
    >
      <div className="flex justify-start gap-x-36">
        <div className="cursor-pointer">
          <IoCloseOutline
            onClick={() => dispatch(closeModal())}
            className="text-2xl"
          />
        </div>
        <h1 className="text-lg font-semibold ">Sign up</h1>
      </div>
      <div className="w-full my-5">
        <hr />
      </div>
      <div className="space-y-5">
        <h1 className="text-lg font-semibold text-start">
          Welcome to Elplanes.com
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className={cn('w-full', { 'w-1/2': userType !== 'organization' })}>
            <TextInput
              register={register}
              name="first_name"
              placeholder="First name"
              required
            />
          </div>
          {userType !== 'organization' && <div>
            <TextInput
              register={register}
              name="last_name"
              type="text"
              placeholder="Last name"
              required
            />
          </div>}
        </div>
        <div>
          <TextInput
            register={register}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="relative flex items-center justify-between">
          <TextInput
            register={register}
            name="dob"
            type="date"
            placeholder={userType !== 'organization' ? "Date of birth" : 'Founding date'}
            // onFocus={(e) => (e.target.type = "date")}
            // onBlur={(e) => {
            //   e.target.type = "text";
            // }}
            required
            className=""
          />

          <div className="absolute pl-2 bg-white pointer-events-none right-2 text-slate-400">
            <LuCalendar className="text-lg" />
          </div>
        </div>
        <div className="relative flex items-center justify-between">
          <TextInput
            register={register}
            name="password"
            type={`${passwordShow ? 'password' : 'text'}`}
            placeholder="Password"
            required
          />
          <div
            onClick={() => {
              setPasswordShow(!passwordShow);
            }}
            className="absolute right-2 text-slate-400 cursor-pointer"
          >
            {
              passwordShow ? <LuEye className="text-xl" /> : <LuEyeOff className="text-xl" />
            }
            
            
          </div>
        </div>

        {/* <div className="relative flex items-center justify-between">
          <TextInput
            register={register}
            name="confirmPassword"
            type={`${confirmPasswordShow ? 'password' : 'text'}`}
            placeholder="Confirm password"
            required
          />
          <div
            onClick={() => {
              setConfirmPasswordShow(!confirmPasswordShow);
            }}
            className="absolute right-2 text-slate-400"
          >
            <LuEye className="text-xl" />
          </div>
        </div> */}
        {/* type of user */}
        {/* <div className="flex ">
          {userTypesData.map((user, index) => (
            <button
              key={index}
              onClick={() => setUserType(user)}
              className={`px-2 py-0.5 w-full  h-[40px] border-[0.01px] border-primary font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${user === userType ? 'py-0.5 bg-primary text-white text-default' : ''}`}
            >
              <span className="text-center md:hidden">
                {user === userType && user}
              </span>{' '}
              <span className="hidden text-center md:block">{user}</span>
            </button>
          ))}
        </div> */}
        <select
          className={`w-full ${userType == 'organization' && 'hidden'} h-10 px-2 text-sm font-medium bg-white border border-gray-300 rounded-lg text-secondary focus:outline-none `}
          {...register('gender', {
            required: 'select one option',
          })}
        >
          <option value="" disabled selected>
            Select your Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="LGBTQ+">LGBTQ+</option>
        </select>
        <select
          className={`w-full ${userType == 'organization' && 'hidden'} h-10 px-2 text-sm font-medium bg-white border border-gray-300 rounded-lg text-secondary focus:outline-none `}
          {...register('sexuality', {
            required: 'select one option',
          })}
        >
          <option value="" disabled selected>
            Select your Sexuality
          </option>
          <option value="straight">Straight</option>
          <option value="gay">Gay</option>
          <option value="lesbian">Lesbian</option>
          <option value="bisexual">Bisexual</option>
          <option value="prefer not to tell">Prefer not to tell</option>
        </select>

      </div>
      <button
        type="submit"
        className="w-full relative py-2.5  rounded-lg mt-6 bg-primary  text-white"
      >
        {signUpLoading ? (
          <LoaderCircle className="mx-auto animate-spin" />
        ) : (
          'Signup'
        )}
      </button>
      <div className="mt-5 text-sm">
        Already have an account?{' '}
        <button
          className=" text-primary"
          type="button"
          onClick={() => handleSwitch('login')}
        >
          Login here
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

