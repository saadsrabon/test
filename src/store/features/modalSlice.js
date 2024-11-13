import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    isRegister: false,
    isLogin: false,
    isOTP: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.isOpen = false;
            state.isRegister = false;
            state.isLogin = false;
            state.isOTP = false;
        },
        switchToRegister: (state) => {
            state.isOpen = true
            state.isRegister = true;
            state.isLogin = false;
            state.isOTP = false;
        },
        switchToLogin: (state) => {
            state.isOpen = true;
            state.isRegister = false;
            state.isLogin = true;
            state.isOTP = false;
        },
        switchToOTP: (state) => {
            state.isOpen = true;
            state.isRegister = false;
            state.isLogin = false;
            state.isOTP = true;
        },
    },
});

export const { closeModal, switchToLogin, switchToRegister, switchToOTP, } = modalSlice.actions;
export default modalSlice.reducer;
