import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';
import { clearTokens, storeTokens } from '@/lib/auth/token';

const initialState = {
    user: JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('user')) || null,
    accessToken: Cookies.get('accessToken') || null,
    // refreshToken: Cookies.get('refreshToken') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            console.log('action', action);
            state.user = user;
            state.accessToken = accessToken;
            // state.refreshToken = refreshToken;
            storeTokens(accessToken, refreshToken, user);
            // typeof window !== 'undefined' && window.localStorage.setItem('user', JSON.stringify(user)); // Persist user data
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;

            // clear everything in the cookies 
            Object.keys(Cookies.get()).forEach((cookie) => {
                Cookies.remove(cookie);
            });
            
            // state.refreshToken = null;
            clearTokens();
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            // typeof window !== 'undefined' && window.localStorage.setItem('accessToken', action.payload);
        },
    },
});

export const { setUser, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
