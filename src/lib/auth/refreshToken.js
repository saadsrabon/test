import Cookies from 'js-cookie';

export const refreshAccessToken = async () => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
        // Handle the case where there is no refresh token (e.g., redirect to login)
        return null;
    }

    const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (data.success) {
        const { accessToken } = data.data;
        window.localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } else {
        // Handle refresh token failure (e.g., redirect to login)
        return null;
    }
};

export const fetchWithAuthAndRefresh = async (url, options = {}) => {
    let response = await fetchWithAuth(url, options);

    if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            response = await fetchWithAuth(url, options);
        } else {
            // Handle the case where refreshing the token failed (e.g., redirect to login)
        }
    }

    return response;
};
