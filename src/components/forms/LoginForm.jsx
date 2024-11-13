import { handleFormData } from '@/lib/handleFormData';
import { cn } from '@/lib/utils';
import { useLoginMutation, useSendOtpMutation } from '@/store/auth/auth';
import { setUser } from '@/store/features/authSlice';
import { closeModal } from '@/store/features/modalSlice';
import Cookies from 'js-cookie';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import TextInput from '../shared/StepInputs/TextInput';
import { useToast } from '../ui/use-toast';

const LoginForm = ({ isSwitching, handleSwitch, setFormType, setEmail }) => {
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();

  const { toast } = useToast();

  const onLoginSubmit = async (data) => {
    const value = handleFormData(data);
    console.log('value', value);
    const { data: loginData, error } = await login(value);
    Cookies.set('name', JSON.stringify(loginData?.data?.user));
    Cookies.set('userId', JSON.stringify(loginData?.data?.user._id));
    Cookies.set('role', loginData?.data?.user.role);
    console.log('error stat', error);
    if (error) {
      if (error.status == 403) {
        setEmail(data.email);
        const payload = {
          email: data.email,
        };
        console.log('payload', payload);
        const { error: otpFailed } = await sendOtp(payload);
        setFormType('otp');
        handleSwitch('otp');
      }
      toast({
        variant: 'destructive',
        title: error?.data?.message,
      });
    } else {
      // localStorage.setItem('isLoggedIn', true);

      dispatch(closeModal());

      const { user, accessToken, refreshToken } = loginData.data;

      dispatch(setUser({ user, accessToken, refreshToken }));
      // Cookies.set('name', JSON.stringify(user))

      // storeTokens(accessToken, refreshToken);
      toast({
        title: 'Logged In Successfully!',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className={cn('px-5 pt-3 pb-5 lg:pb-10 lg:pt-5 lg:px-10', {
        invisible: isSwitching,
      })}
    >
      <div className="flex justify-start gap-x-36">
        <div className="cursor-pointer">
          <IoCloseOutline
            onClick={() => dispatch(closeModal())}
            className="text-2xl"
          />
        </div>
        <h1 className="text-lg font-semibold ">Sign In</h1>
      </div>
      <div className="w-full my-5">
        <hr />
      </div>
      <div className="space-y-5">
        <h1 className="text-lg font-semibold text-start">
          Welcome to Sparktivity
        </h1>

        <div>
          <TextInput
            register={register}
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="relative flex items-center justify-between">
          <TextInput
            register={register}
            name="password"
            type={`${passwordShow ? 'password' : 'text'}`}
            placeholder="Enter a password"
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
        <button
          onClick={() => setFormType('pass')}
          type="button"
          className="px-1 my-3 text-xs text-start text-secondary"
        >
          Forgot Password?
        </button>
      </div>
      <button
        type="submit"
        className="w-full relative py-2.5  rounded-lg mt-6 bg-primary  text-white"
      >
        {isLoading ? (
          <LoaderCircle className="mx-auto animate-spin" />
        ) : (
          'Sign In'
        )}
      </button>
      <div className="mt-5 text-sm">
        Don&apos;t have an account?{' '}
        <button
          className="text-sm text-primary"
          type="button"
          onClick={() => handleSwitch('register')}
        >
          Register here
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
