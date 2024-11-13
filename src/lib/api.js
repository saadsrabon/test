import axios from 'axios';
import Cookies from 'js-cookie';
import { logout, setAccessToken } from '../slices/authSlice';
import { store } from '../store';
import { clearTokens, storeTokens } from './auth/token';

const api = axios.create({
  baseURL: 'https://api.elplanes.com/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await axios.post(
          'https://api.elplanes.com/api/v1/auth/refresh-token',
          { token: refreshToken }
        );

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data.data;
          storeTokens(accessToken, refreshToken);
          store.dispatch(setAccessToken(accessToken));

          axios.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          return axios(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
