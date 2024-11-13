import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/features/modalSlice';
import ChangePassModal from './ChangePassModal';
import RegisterForm from '@/components/forms/RegisterForm';
import LoginForm from '@/components/forms/LoginForm';
import OtpModal from './FilterModal/OtpModal';

const AuthModal = () => {
    const { isOpen, isRegister, isLogin, isOTP } = useSelector((state) => state.modal);

    const [isSwitching, setIsSwitching] = useState(false);

    const [email, setEmail] = useState('')

    const [formType, setFormType] = useState(isLogin ? 'login' : 'register');

    const dispatch = useDispatch();


    const handleSwitch = (type) => {
        setIsSwitching(true);
        setTimeout(() => {
            setFormType(type);
            setIsSwitching(false);
        }, 150); // duration of the animation
    };


    useEffect(() => {
        if (isLogin) {
            setFormType('login');
        } else if (isRegister) {
            setFormType('register');
        } else if (isOTP) {
            setFormType('otp');
        } else {
            setFormType('pass');
        }
    }, [isLogin, isRegister, isOTP]);
  
    return (
        <div
            className={`fixed z-[100] text-black flex items-center justify-center ${isOpen ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
            onClick={() => dispatch(closeModal())}
        >
            <div
                onClick={(e_) => e_.stopPropagation()}
                className={`absolute w-full drop-shadow-2xl sm:w-[500px] ${isOpen ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-200'} `}
            >
                <div className={`transition-all ${isSwitching ? 'opacity-0 -translate-y-20' : 'opacity-1 translate-y-0 bg-white rounded-3xl duration-300'}`}>
                    {isOpen &&
                        (formType === 'login' ?
                            (
                                <LoginForm isSwitching={isSwitching} handleSwitch={handleSwitch} setFormType={setFormType}  setEmail={setEmail}/>
                            ) : formType === 'register' ? (
                                <RegisterForm isSwitching={isSwitching} handleSwitch={handleSwitch} setFormType={setFormType} setEmail={setEmail} />
                            ) : formType === 'otp' ? (
                                <OtpModal email={email} setFormType={setFormType} isOpen isSwitching={isSwitching} handleSwitch={handleSwitch} />
                            ) :
                                <ChangePassModal isOpen />
                        )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;