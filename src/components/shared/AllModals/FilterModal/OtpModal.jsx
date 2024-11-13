
import { closeModal, switchToLogin } from "@/store/features/modalSlice";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useVerifyOtpMutation } from "@/store/auth/auth";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const OtpModal = ({ isOpen, isSwitching, email, setFormType }) => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { toast } = useToast();


    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);

    const handleOtp = (event, index) => {
        const newValues = [...inputValues];
        newValues[index] = event.target?.value;
        setInputValues(newValues);
    };


    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        if (!inputValues[3]) return

        const otp = parseInt(inputValues.join(''));

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
            (setFormType('login'),
                toast({
                    title: "OTP verified! Please log in.",
                }));

    }


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


                    <form
                        onSubmit={handleVerifyOTP}
                        className="px-5 pt-3 pb-5 bg-white lg:pb-10 lg:pt-5 lg:px-10 rounded-3xl"
                    >
                        <div className="flex justify-between">
                            <IoCloseOutline
                                onClick={() => dispatch(closeModal())}
                                className="text-2xl cursor-pointer"
                            />
                            <h1 className="text-lg font-semibold">OTP</h1>
                            <span></span>
                        </div>
                        <div className="w-full my-5">
                            <hr />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-lg font-semibold text-start">We have sent 6 digit code to your email. Please enter that number here</h1>
                            <p className="text-sm font-medium">
                                Check your email we’ve sent you the OTP code. Enter the code here.
                            </p>
                            <div className="flex items-center justify-center gap-2 rounded-lg">
                                {inputValues.map((value, index) => (
                                    <input
                                        maxLength={1}
                                        key={index}
                                        value={value}
                                        onChange={(event) => handleOtp(event, index)}
                                        className={`border text-center ${index === 3 ? '' : 'border-r-0'} size-12 rounded-lg text-3xl`}
                                    />
                                ))}
                            </div>
                        </div>
                        <button type="submit" className={cn("w-1/3 mx-auto block py-2.5 rounded-lg mt-6 bg-primary text-white", { 'pointer-events-none': isLoading })}>{isLoading ? <LoaderCircle className='mx-auto animate-spin' /> : 'Submit'}</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default OtpModal;