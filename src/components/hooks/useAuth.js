'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getAccessToken } from '@/lib/auth/token';
import { refreshAccessToken } from '@/lib/auth/refreshToken';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const accessToken = getAccessToken();
                const refreshToken = Cookies.get('refreshToken');

                if (accessToken) {
                    setIsAuthenticated(true);
                } else if (refreshToken) {
                    const newAccessToken = await refreshAccessToken();

                    if (newAccessToken) {
                        setIsAuthenticated(true);
                    } else {
                        router.push('/');
                        toast({
                            title: 'Please Sign in',
                        })
                    }
                } else {
                    router.push('/');
                    toast({
                        title: 'Please Sign in',
                    })
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                router.push('/');
                toast({
                    title: 'Please Sign in',
                })
            }
        };

        checkAuth();
    }, [router, toast]);

    return isAuthenticated;
};

export default useAuth;
