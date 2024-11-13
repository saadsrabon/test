import { AuthApi } from '@/store/auth/auth';
import authReducer from '@/store/features/authSlice';
import modalReducer from '@/store/features/modalSlice';
import { RequestApi } from '@/store/services/Request';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import filterReducer from '@/store/features/filterSlice'

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [RequestApi.reducerPath]: RequestApi.reducer,
        auth: authReducer,
        modal: modalReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware, RequestApi.middleware),
});

setupListeners(store.dispatch);
