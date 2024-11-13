
import { closeModal, switchToLogin } from "@/store/features/modalSlice";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../StepInputs/TextInput";
import { LuEye } from "react-icons/lu";
import { useChangePassMutation, useSendOtpMutation, useVerifyOtpMutation } from "@/store/auth/auth";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import OTPInput from "react-otp-input";

const ChangePasswordModal = ({ isOpen, isSwitching }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState('otp')
    const [email, setEmail] = useState(null)
    const [otp, setOtp] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { toast } = useToast();


    const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [changePass, { isLoading: changePassLoading }] = useChangePassMutation();

    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);

    const handleOtp = (event, index) => {
        const newValues = [...inputValues];
        newValues[index] = event.target?.value;
        setInputValues(newValues);
    };


    const handleSendOTP = async (data) => {

        const { error } = await sendOtp(data);
        console.log(data)
        error ?
            toast({
                variant: "destructive",
                title: error?.data?.message,
            }) :
            (setEmail(data.email),
                setState('verifyOtp'),
                toast({
                    title: "OTP Sent to your email.",
                }));
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        // if (!inputValues[3]) return

        // const otp = parseInt(inputValues.join(''));

        const value = {
            email: email,
            otp: otp
        }

        const { error } = await verifyOtp(value)

        error ?
            toast({
                variant: "destructive",
                title: error?.data?.message,
            }) :
            (setState('changePass'),
                toast({
                    title: "OTP verified! Enter new password.",
                }));

    }

    const handleChangePass = async (data) => {
        const value = {
            ...data,
            email: email
        };

        const { error } = await changePass(value);

        if (error) {
            toast({
                variant: "destructive",
                title: error?.data?.message,
            });
        } else {
            toast({
                title: "Password changed successfully",
            });
            dispatch(closeModal())
            // Ensure the toast has some time to display before switching modals
            setTimeout(() => {
                dispatch(switchToLogin());
            }, 500); // Adjust this duration as needed
        }
    };

    return (

        <div
            className={`fixed z-[100] text-black flex items-center justify-center ${isOpen ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
            onClick={() => dispatch(closeModal())}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute w-full drop-shadow-2xl sm:w-[500px] ${isOpen ? 'opacity-1 translate-y-0 duration-1000' : '-translate-y-20 opacity-0 duration-200'}`}
            >
                <div className={`transition-all ${isSwitching ? 'opacity-0 -translate-y-20' : 'opacity-1 translate-y-0 bg-white rounded-3xl duration-300'}`}>

                    {
                        state === 'otp' ?
                            <form
                                onSubmit={handleSubmit(handleSendOTP)}
                                className="px-5 pt-3 pb-5 bg-white lg:pb-10 lg:pt-5 lg:px-10 rounded-3xl"
                            >
                                <div className="flex justify-between">
                                    <IoCloseOutline
                                        onClick={() => dispatch(closeModal())}
                                        className="text-2xl cursor-pointer"
                                    />
                                    <h1 className="text-lg font-semibold">Send OTP</h1>
                                    <span></span>
                                </div>
                                <div className="w-full my-5">
                                    <hr />
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-lg font-semibold text-start">Enter your email</h1>
                                    <div className="flex items-center justify-center gap-6 rounded-lg">
                                        <TextInput
                                            register={register}
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className={cn("w-1/3 mx-auto block py-2.5 rounded-lg mt-6 bg-primary text-white", { 'pointer-events-none': otpLoading })}>{otpLoading ? <LoaderCircle className='mx-auto animate-spin' /> : 'Send OTP'}</button>
                            </form>
                            : state === 'verifyOtp' ?
                                <form
                                    onSubmit={handleVerifyOTP}
                                    className="px-5 pt-3 pb-5 bg-white lg:pb-10 lg:pt-5 lg:px-10 rounded-3xl"
                                >
                                    <div className="flex justify-between">
                                        <IoCloseOutline
                                            onClick={() => dispatch(closeModal())}
                                            className="text-2xl cursor-pointer"
                                        />
                                        <h1 className="text-lg font-semibold">Forgot password</h1>
                                        <span></span>
                                    </div>
                                    <div className="w-full my-5">
                                        <hr />
                                    </div>
                                    <div className="space-y-4">
                                        <h1 className="text-lg font-semibold text-start">We have sent 6 digit code to your email. Please enter that number here</h1>
                                        <p className="text-sm font-medium">
                                            Check your email we’ve sent you the OTP code. Enter the code to
                                            change your password.
                                        </p>
                                        <OTPInput
                containerStyle="flex justify-center items-center gap-2"
                inputStyle="h-[50px] w-[50px] px-4 text-2xl font-semibold text-slate-700 focus:outline-primary rounded-lg border text-black border-primary/40"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>.</span>}
                renderInput={(props) => <input {...props} />}
                skipDefaultStyles={true}
                
              />
                                    </div>
                                    <button type="submit" className={cn("w-1/3 mx-auto block py-2.5 rounded-lg mt-6 bg-primary text-white", { 'pointer-events-none': isLoading })}>{isLoading ? <LoaderCircle className='mx-auto animate-spin' /> : 'Submit'}</button>
                                </form>

                                : state === 'changePass' &&

                                <form onSubmit={handleSubmit(handleChangePass)} className="px-5 pt-3 pb-5 lg:pb-10 lg:pt-5 lg:px-10">
                                    <div className="flex justify-between">
                                        <div className="cursor-pointer">
                                            <IoCloseOutline
                                                onClick={() => dispatch(closeModal())}
                                                className="text-2xl "
                                            />
                                        </div>
                                        <h1 className="text-lg font-semibold ">Change password</h1>
                                        <span></span>
                                    </div>
                                    <div className="w-full my-5">
                                        <hr />
                                    </div>
                                    <div className="space-y-4">
                                        <h1 className="text-lg font-semibold text-start">
                                            Enter new password
                                        </h1>

                                        <div className="relative flex items-center justify-between">
                                            <TextInput
                                                register={register}
                                                name="password"
                                                placeholder="Enter your password"
                                            />

                                            <div className="absolute right-4 text-slate-400">
                                                <LuEye className="text-xl" />
                                            </div>
                                        </div>
                                        <div className="relative flex items-center justify-between">
                                            <TextInput
                                                register={register}
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                            />
                                            <div className="absolute right-4 text-slate-400">
                                                <LuEye className="text-xl" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* button type will be submit for handling form submission*/}
                                    <button
                                        type="submit"
                                        className={cn("w-full relative py-2.5  rounded-lg mt-6 bg-primary  text-white", { 'pointer-events-none': changePassLoading })}
                                    >
                                        {changePassLoading ? <LoaderCircle className='mx-auto animate-spin' /> : 'Change Password'}
                                    </button>
                                </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordModal;
