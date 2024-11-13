import Cookies from 'js-cookie';

export const storeTokens = (accessToken, refreshToken, user) => {
    // Store access token in localStorage
    // window.localStorage.setItem('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict', path: '/' });
    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict', path: '/' });
    window.localStorage.setItem('user', JSON.stringify(user));
};

export const getAccessToken = () => {
    return Cookies.get('accessToken') || null;
};

export const getLocalData = (key) => {
    const localData = typeof window !== 'undefined' && window.localStorage.getItem(key);
    return localData ? JSON.parse(localData) : null;
};

export const setLocalData = (key, data) => typeof window !== 'undefined' && window.localStorage.setItem(key, JSON.stringify(data));

export const removeLocalData = (key) => {
    window.localStorage.removeItem(key);
};

export const getUser = () => {
    const user = typeof window !== 'undefined' && window.localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const clearTokens = () => {
    // window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
};